import secrets
import tritonclient.grpc as triton_grpc
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from service.models import ServiceTokenModel, ServiceTokenPermissionModel

from service.serializers import ServiceTokenListSerializer, ServiceTokenSerializer
from shared.views import CustomPagination
from xazna import settings
from openai import OpenAI

tts_client = triton_grpc.InferenceServerClient(url=settings.TTS_TRITON_SERVER, verbose=False)
stt_client = OpenAI(base_url=settings.STT_SERVER, api_key=settings.STT_SERVER_API_KEY)


class ServiceTokenView(APIView):
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


class ServiceTokenItemView(APIView):
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

    @swagger_auto_schema(operation_description="Delete session...", tags=["Service"])
    def delete(self, request, token_id):
        try:
            token = ServiceTokenModel.objects.get(user=request.user, id=token_id)
            token.delete()

            return Response(data={'message': 'Data successfully deleted.'}, status=status.HTTP_200_OK)
        except ServiceTokenModel.DoesNotExist:
            return Response(data={"message": "Data not found."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ServiceTokenListView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Token list...', tags=["Service"])
    def get(self, request):
        ordering = request.query_params.get('ordering', '-created_at')
        queryset = ServiceTokenModel.objects.filter(user=request.user).order_by(ordering)
        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)
        serializer = ServiceTokenListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)
