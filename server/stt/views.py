import math
import re
from datetime import timedelta
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from finance.models import ExpenseModel
from shared.models import AudioModel
from stt.models import UserSTTErrorLogModel
from shared.utils import get_audio_duration, text_decode, convert_to_wav, stt_transaction
from shared.views import CustomPagination
from stt.models import STTModel, STTModelModel
from stt.serializers import STTListSerializer, STTChangeSerializer, STTSerializer
from xazna import settings
from django.utils import timezone
from django.db import transaction
from openai import OpenAI

from xazna.exceptions import CustomException

client = OpenAI(base_url=settings.STT_SERVER, api_key=settings.STT_SERVER_API_KEY)


class STTAPIView(APIView):
    parser_classes = [MultiPartParser]
    auth_required = True

    @swagger_auto_schema(operation_description='STT generate...', request_body=STTSerializer, tags=["STT"])
    def post(self, request):
        audio_instance = None
        try:
            serializer = STTSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            mdl = serializer.validated_data["mdl"]

            audio_instance = AudioModel.objects.create(user=request.user, file=serializer.validated_data["file"])
            balance = request.user.balance
            subscription = balance.subscription
            credit_rate = subscription.rate.stt.credit
            credit_usage, cash_usage = stt_transaction(balance, subscription, credit_rate, audio_instance.file, mdl)

            with transaction.atomic():
                audio = convert_to_wav(audio_instance.file)

                m = client.models.list().data[0].id

                transcript = client.audio.transcriptions.create(
                    model=m,
                    file=audio,
                    language="en",
                    stream=True,
                    response_format="text"
                )

                text = ""

                for event in transcript:
                    chunk = event.choices[0]["delta"]["content"]
                    text += chunk

                text = re.sub(r"(Ğ|ğ|Õ|õ|Ş|ş|Ç|ç)", text_decode, text)

                stt_instance = STTModel.objects.create(text=text, user=request.user, mdl=mdl, audio=audio_instance)

                subscription.credit_expense += credit_usage
                credit_rate.usage += credit_usage
                balance.cash -= cash_usage

                ExpenseModel.objects.create(operation="stt", operation_id=stt_instance.id, credit=credit_usage,
                                            cash=cash_usage, user=request.user)

                stt = STTListSerializer(stt_instance)

                balance.save()
                subscription.save()
                credit_rate.save()

                return Response(data=stt.data, status=status.HTTP_200_OK)
        except CustomException as e:
            return Response(data={"message": str(e)}, status=e.status)
        except Exception as e:
            UserSTTErrorLogModel.objects.create(message=str(e), audio=audio_instance, user=self.request.user)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class STTListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='STT list...', manual_parameters=[
        openapi.Parameter(
            'page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            'page_size', openapi.IN_QUERY, description="Items per page (max 100)", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            'ordering', openapi.IN_QUERY, description="Comma-separated fields (e.g. `created_at,text`)",
            type=openapi.TYPE_STRING
        ),
    ],
                         tags=["STT"]
                         )
    def get(self, request):
        ordering = request.query_params.get('ordering', '-created_at')

        queryset = STTModel.objects.filter(user=request.user).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = STTListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)


class STTChangeAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="STT change...",
        request_body=STTChangeSerializer,
        tags=["STT"]
    )
    def put(self, request, stt_id):
        stt_instance = STTModel.objects.get(id=stt_id, user=request.user)

        serializer = STTChangeSerializer(
            instance=stt_instance,
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(data={"message": "Data successfully changed."}, status=status.HTTP_200_OK)


class STTDeleteAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'items': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(type=openapi.TYPE_STRING),
                    description="List of STTModel IDs to delete"
                )
            },
        ),
        tags=["STT"]
    )
    def post(self, request):
        try:
            items = request.data.get('items')
            for item in items:
                STTModel.objects.get(id=item, user=request.user).delete()

            return Response(data={'message': 'Items are successfully deleted.'}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class STTSearchAPIView(APIView):
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
        tags=["STT"]
    )
    def get(self, request):
        q = request.GET['q'].strip()
        items = STTModel.objects.filter(audio__name__icontains=q, user=request.user).order_by('-created_at')
        serializer = STTListSerializer(items, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)
