import secrets
import tritonclient.grpc as triton_grpc
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from service.models import ServiceTokenModel, ServiceTokenPermissionModel

from service.serializers import ServiceTokenListSerializer, ServiceTokenSerializer
from xazna import settings
from openai import OpenAI

tts_client = triton_grpc.InferenceServerClient(url=settings.TTS_TRITON_SERVER, verbose=False)
stt_client = OpenAI(base_url=settings.STT_SERVER, api_key=settings.STT_SERVER_API_KEY)


class ServiceTokenAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Token generate...', request_body=ServiceTokenSerializer,
                         tags=["Service"])
    def post(self, request):
        try:
            serializer = ServiceTokenSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            raw_token = secrets.token_urlsafe(32)
            token = ServiceTokenModel.objects.create(user=request.user, name=serializer.validated_data["name"],
                                                     key=raw_token, last_symbols=raw_token[-4:])
            ServiceTokenPermissionModel.objects.create(token=token, llm=serializer.validated_data["llm"],
                                                       tts=serializer.validated_data["tts"],
                                                       stt=serializer.validated_data["stt"],
                                                       history=serializer.validated_data["history"],
                                                       monitoring=serializer.validated_data["monitoring"])

            return Response(data={"key": token.key, "last_symbols": token.last_symbols}, status=status.HTTP_200_OK)
        except ServiceTokenModel.DoesNotExist:
            return Response(data={"message": "Token not found."}, status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            return Response(data={"message": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ServiceTokenItemAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Token item...', tags=["Service"])
    def get(self, request, token_id):
        try:
            token = ServiceTokenModel.objects.get(user=request.user, id=token_id)

            return Response(data={"key": token.key}, status=status.HTTP_200_OK)
        except ServiceTokenModel.DoesNotExist:
            return Response(data={"message": "Token not found."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ServiceTokenListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Token list...', tags=["Service"])
    def get(self, request):
        tokens = ServiceTokenModel.objects.filter(user=request.user).order_by("-created_at")
        serializer = ServiceTokenListSerializer(tokens, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
