import numpy as np
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg import openapi
from finance.models import ExpenseModel
from shared.clean.split import split
from shared.models import AudioModel
from log.models import UserTTSErrorLogModel
from shared.views import CustomPagination
from tts.models import TTSModel, TTSModelModel, TTSEmotionModel, TTSAudioFormatModel
from tts.serializers import TTSSerializer, TTSListSerializer
from shared.utils import generate_audio, tts_transaction
from xazna import settings
from django.db import transaction
import tritonclient.grpc as triton_grpc
from xazna.exceptions import CustomException

client = triton_grpc.InferenceServerClient(url=settings.TTS_TRITON_SERVER, verbose=False)


class TTSSettingsAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description="TTS settings...", tags=["TTS"])
    def get(self, request):
        mdls = list(TTSModelModel.objects.values_list("title", flat=True))
        emotions = list(TTSEmotionModel.objects.values_list("title", flat=True))
        audio_formats = list(TTSAudioFormatModel.objects.values_list("title", flat=True))

        return Response(data={
            "mdls": mdls,
            "emotions": emotions,
            "formats": audio_formats
        }, status=status.HTTP_200_OK)


class TTSAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="TTS generate...",
        request_body=TTSSerializer,
        tags=["TTS"]
    )
    def post(self, request):
        text = None
        try:
            serializer = TTSSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            text = serializer.validated_data["text"]
            mdl = serializer.validated_data["mdl"]
            format = serializer.validated_data["format"]

            balance = request.user.balance
            subscription = balance.subscription
            credit_rate = subscription.rate.tts.credit
            credit_usage, cash_usage  = tts_transaction(balance, subscription, credit_rate, text, mdl)

            with transaction.atomic():
                audio_chunks = []
                for chunk in split(text):
                    input_data = np.array([[chunk.encode('utf-8')]], dtype=object)
                    inputs = [triton_grpc.InferInput("target_text", [1, 1], "BYTES")]
                    inputs[0].set_data_from_numpy(input_data)

                    outputs = [triton_grpc.InferRequestedOutput("waveform")]
                    res = client.infer(model_name="f5_tts", inputs=inputs, outputs=outputs)

                    waveform = np.clip(res.as_numpy("waveform")[0], -1.0, 1.0)

                    audio_chunk = (waveform * 32767).astype(np.int16)
                    audio_chunks.append(audio_chunk)

                full_audio_chunks = np.concatenate(audio_chunks, axis=0)
                audio_instance = AudioModel.objects.create(user=request.user,
                                                           file=generate_audio(full_audio_chunks, format))



                tts_instance = serializer.save(audio=audio_instance, user=request.user)

                subscription.credit_expense += credit_usage
                credit_rate.usage += credit_usage
                balance.cash -= cash_usage

                ExpenseModel.objects.create(operation="tts", operation_id=tts_instance.id, credit=credit_usage,
                                            cash=cash_usage, user=request.user)

                tts = TTSListSerializer(tts_instance)

                balance.save()
                subscription.save()
                credit_rate.save()

                return Response(data=tts.data, status=status.HTTP_200_OK)
        except CustomException as e:
            return Response(data={"message": str(e)}, status=e.status)
        except Exception as e:
            UserTTSErrorLogModel.objects.create(message=str(e), text=text, user=self.request.user)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TTSListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='TTS list...', manual_parameters=[
        openapi.Parameter(
            'page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            'page_size', openapi.IN_QUERY, description="Items per page", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            'ordering', openapi.IN_QUERY, description="Comma-separated fields (e.g. `created_at,text`)",
            type=openapi.TYPE_STRING
        ),
    ],
        tags=["TTS"]
    )
    def get(self, request):
        ordering = request.query_params.get('ordering', '-created_at')

        queryset = TTSModel.objects.filter(user=request.user).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = TTSListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)


class TTSSearchAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'q', openapi.IN_QUERY,
                description="Search by name",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        tags=["TTS"]
    )
    def get(self, request):
        q = request.GET['q'].strip()
        items = TTSModel.objects.filter(text__icontains=q, user=request.user).order_by('-created_at')
        serializer = TTSListSerializer(items, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class TTSDeleteAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'items': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(type=openapi.TYPE_STRING),
                    description="List of TTSModel IDs to delete"
                )
            },
        ),
        tags=["TTS"]
    )
    def post(self, request):
        try:
            items = request.data.get('items')
            for item in items:
                TTSModel.objects.get(id=item, user=request.user).delete()

            return Response(data={'message': 'Items are successfully deleted.'}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
