import re
import numpy as np
import tritonclient.grpc as triton_grpc
from rest_framework.parsers import MultiPartParser
from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from log.models import ServiceLLMErrorLogModel, ServiceTTSErrorLogModel, ServiceSTTErrorLogModel
from llm.models import LLMSessionModel
from drf_yasg.utils import swagger_auto_schema
from shared.models import AudioModel
from shared.utils import tts_transaction, generate_audio, stt_transaction, convert_to_wav, text_decode
from stt.models import STTModel
from stt.serializers import STTSerializer, STTListSerializer
from tts.serializers import TTSSerializer, TTSListSerializer
from xazna import settings
from django.db import transaction
from shared.clean.split import split
from xazna.exceptions import CustomException
from openai import OpenAI

tts_client = triton_grpc.InferenceServerClient(url=settings.TTS_TRITON_SERVER, verbose=False)
stt_client = OpenAI(base_url=settings.STT_SERVER, api_key=settings.STT_SERVER_API_KEY)


class ServiceLLMSessionAPIView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description="Create a new LLM session",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["message"],
        ),
        tags=["Service"]
    )
    def post(self, request):
        try:
            subscription = request.user.balance.subscription

            session = LLMSessionModel.objects.create(user=request.user, context=subscription.llm_context)
            return Response(data={"slug": session.id}, status=status.HTTP_201_CREATED)

        except Exception as e:
            ServiceLLMErrorLogModel.objects.create(message=str(e), token=self.request.token)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ServiceTTSAPIView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description="TTS generate...",
        request_body=TTSSerializer,
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=False,
            )
        ],
        tags=["Service"]
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
            credit_usage, cash_usage = tts_transaction(balance, subscription, credit_rate, text, mdl)

            with transaction.atomic():
                audio_chunks = []
                for chunk in split(text):
                    input_data = np.array([[chunk.encode('utf-8')]], dtype=object)
                    inputs = [triton_grpc.InferInput("target_text", [1, 1], "BYTES")]
                    inputs[0].set_data_from_numpy(input_data)

                    outputs = [triton_grpc.InferRequestedOutput("waveform")]
                    res = tts_client.infer(model_name="f5_tts", inputs=inputs, outputs=outputs)

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

                tts = TTSListSerializer(tts_instance)

                balance.save()
                subscription.save()
                credit_rate.save()

                return Response(data=tts.data, status=status.HTTP_200_OK)
        except CustomException as e:
            return Response(data={"message": str(e)}, status=e.status)
        except Exception as e:
            ServiceTTSErrorLogModel.objects.create(message=str(e), text=text, token=self.request.token)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ServiceSTTAPIView(APIView):
    parser_classes = [MultiPartParser]
    token_required = True

    @swagger_auto_schema(operation_description='STT generate...', request_body=STTSerializer, manual_parameters=[
        openapi.Parameter(
            name="token",
            in_=openapi.IN_QUERY,
            description="Service API token",
            type=openapi.TYPE_STRING,
            required=False,
        )
    ], tags=["Service"])
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

                m = stt_client.models.list().data[0].id

                transcript = stt_client.audio.transcriptions.create(
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

                stt = STTListSerializer(stt_instance)

                balance.save()
                subscription.save()
                credit_rate.save()

                return Response(data=stt.data, status=status.HTTP_200_OK)
        except CustomException as e:
            return Response(data={"message": str(e)}, status=e.status)
        except Exception as e:
            ServiceSTTErrorLogModel.objects.create(message=str(e), audio=audio_instance, token=self.request.token)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
