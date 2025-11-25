import numpy as np
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg import openapi
from finance.models import UserExpenseModel, TokenExpenseModel
from shared.clean.split import split
from shared.models import AudioModel
from log.models import UserTTSErrorLogModel, TokenTTSErrorLogModel
from shared.views import CustomPagination
from tts.models import UserTTSModel, TTSModelModel, TTSEmotionModel, TTSAudioFormatModel, TokenTTSModel
from tts.serializers import UserTTSSerializer, UserTTSListSerializer, TokenTTSSerializer, TokenTTSListSerializer
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


class UserTTSAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="TTS generate...",
        request_body=UserTTSSerializer,
        tags=["TTS"]
    )
    def post(self, request):
        text = None
        try:
            serializer = UserTTSSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            text = serializer.validated_data["text"]
            mdl = serializer.validated_data["mdl"]
            format = serializer.validated_data["format"]

            balance = request.user.balance
            rate = request.user.tts_rate
            sub = request.user.active_sub
            credit_usage, cash_usage  = tts_transaction(balance, sub, rate, text, mdl)

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

                sub.credit_expense += credit_usage
                rate.credit_usage += credit_usage
                balance.cash -= cash_usage

                UserExpenseModel.objects.create(operation="tts", operation_id=tts_instance.id, credit=credit_usage,
                                            cash=cash_usage, user=request.user)

                tts = UserTTSListSerializer(tts_instance)

                balance.save()
                sub.save()
                rate.save()

                return Response(data=tts.data, status=status.HTTP_200_OK)
        except CustomException as e:
            return Response(data={"message": str(e)}, status=e.status)
        except Exception as e:
            UserTTSErrorLogModel.objects.create(message=str(e), text=text, user=self.request.user)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TokenTTSAPIView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description="TTS generate...",
        request_body=TokenTTSSerializer,
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=True,
            )
        ],
        tags=["TTS"]
    )
    def post(self, request):
        text = None
        try:
            serializer = TokenTTSSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            text = serializer.validated_data["text"]
            mdl = serializer.validated_data["mdl"]
            format = serializer.validated_data["format"]

            balance = request.user.balance
            sub = request.user.active_sub
            rate = request.token.tts_rate
            credit_usage, cash_usage  = tts_transaction(balance, sub, rate, text, mdl)

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

                tts_instance = serializer.save(audio=audio_instance, token=request.token)

                sub.credit_expense += credit_usage
                rate.credit_usage += credit_usage
                balance.cash -= cash_usage

                TokenExpenseModel.objects.create(operation="tts", operation_id=tts_instance.id, credit=credit_usage,
                                            cash=cash_usage, token=request.token)

                tts = TokenTTSListSerializer(tts_instance)

                balance.save()
                sub.save()
                rate.save()

                return Response(data=tts.data, status=status.HTTP_200_OK)
        except CustomException as e:
            return Response(data={"message": str(e)}, status=e.status)
        except Exception as e:
            TokenTTSErrorLogModel.objects.create(message=str(e), text=text, token=self.request.token)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserTTSListAPIView(APIView):
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

        queryset = UserTTSModel.objects.filter(user=request.user, is_deleted=False).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = UserTTSListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)


class TokenTTSListAPIView(APIView):
    token_required = True

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
        openapi.Parameter(
            name="token",
            in_=openapi.IN_QUERY,
            description="Service API token",
            type=openapi.TYPE_STRING,
            required=True,
        )
    ],
        tags=["TTS"]
    )
    def get(self, request):
        ordering = request.query_params.get('ordering', '-created_at')

        queryset = TokenTTSModel.objects.filter(token=request.token, is_deleted=False).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = TokenTTSListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)


class UserTTSSearchAPIView(APIView):
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
        items = UserTTSModel.objects.filter(text__icontains=q, user=request.user, is_deleted=False).order_by('-created_at')
        serializer = UserTTSListSerializer(items, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class TokenTTSSearchAPIView(APIView):
    token_required = True

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'q', openapi.IN_QUERY,
                description="Search by name",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=True,
            )
        ],
        tags=["TTS"]
    )
    def get(self, request):
        q = request.GET['q'].strip()
        items = TokenTTSModel.objects.filter(text__icontains=q, token=request.token, is_deleted=False).order_by('-created_at')
        serializer = TokenTTSListSerializer(items, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class UserTTSItemAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="Delete session...",
        tags=["TTS"]
    )
    def delete(self, request, tts_id):
        try:
            tts = UserTTSModel.objects.get(user=request.user, id=tts_id, is_deleted=False)
            tts.is_deleted = True
            tts.save()

            return Response(data={'message': 'Data successfully deleted.'}, status=status.HTTP_200_OK)
        except UserTTSModel.DoesNotExist:
            return Response(data={"message": "Data not found."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TokenTTSItemAPIView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description="Delete session...",
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=True,
            )
        ],
        tags=["TTS"]
    )
    def delete(self, request, tts_id):
        try:
            tts = TokenTTSModel.objects.get(token=request.token, id=tts_id, is_deleted=False)
            tts.is_deleted = True
            tts.save()

            return Response(data={'message': 'Data successfully deleted.'}, status=status.HTTP_200_OK)
        except TokenTTSModel.DoesNotExist:
            return Response(data={"message": "Data not found."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)