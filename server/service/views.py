import tritonclient.grpc as triton_grpc
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from service.models import ServiceTokenModel
from service.serializers import ServiceTokenSerializer
from xazna import settings
from openai import OpenAI

tts_client = triton_grpc.InferenceServerClient(url=settings.TTS_TRITON_SERVER, verbose=False)
stt_client = OpenAI(base_url=settings.STT_SERVER, api_key=settings.STT_SERVER_API_KEY)



class ServiceTokenAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Token...', tags=["Service"])
    def get(self, request, token_id):
        token = ServiceTokenModel.objects.filter(user=request.user, id=token_id).first()
        if token is None:
            return Response(data={"message": "Token not found."}, status=status.HTTP_404_NOT_FOUND)


        return Response(data={"token": token.key}, status=status.HTTP_200_OK)


class ServiceTokenListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Token list...', tags=["Service"])
    def get(self, request):
        tokens = ServiceTokenModel.objects.filter(user=request.user).order_by("-created_at")
        serializer = ServiceTokenSerializer(tokens, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
