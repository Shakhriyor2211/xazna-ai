import math
import re
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from finance.models import UserExpenseModel, TokenExpenseModel
from shared.models import AudioModel
from log.models import UserSTTErrorLogModel, TokenSTTErrorLogModel
from shared.utils import text_decode, convert_to_wav, stt_transaction, get_audio_duration
from shared.views import CustomPagination
from stt.models import UserSTTModel, TokenSTTModel
from stt.serializers import UserSTTListSerializer, UserSTTChangeSerializer, STTSerializer, TokenSTTListSerializer, \
    TokenSTTChangeSerializer
from xazna import settings
from django.db import transaction
from openai import OpenAI
from xazna.exceptions import CustomException
from django.utils.translation import gettext_lazy as _

client = OpenAI(base_url=settings.STT_SERVER, api_key=settings.STT_SERVER_API_KEY)


class UserSTTView(APIView):
    parser_classes = [MultiPartParser]
    auth_required = True

    @swagger_auto_schema(operation_description="STT generate...", request_body=STTSerializer, tags=["STT"])
    def post(self, request):
        audio_instance = None
        try:
            serializer = STTSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            mdl = serializer.validated_data["mdl"]
            save = serializer.validated_data["save"]
            print(serializer.validated_data["audio"].size)
            audio_duration = math.ceil(get_audio_duration(serializer.validated_data["audio"]))

            if audio_duration > 120:
                return Response(data={"message": _("Audio duration must not exceed 2 minutes.")}, status=status.HTTP_400_BAD_REQUEST)


            audio_instance = AudioModel.objects.create(user=request.user, file=serializer.validated_data["audio"])

            balance = request.user.balance
            sub = request.user.active_sub
            rate = request.user.stt_rate
            credit_usage, cash_usage = stt_transaction(balance, sub, rate, audio_duration, mdl)

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



                sub.credit_expense += credit_usage
                rate.credit_usage += credit_usage
                balance.cash -= cash_usage

                balance.save()
                sub.save()
                rate.save()

                if save == "disable":
                    return Response(data={"text": text}, status=status.HTTP_200_OK)

                stt_instance = UserSTTModel.objects.create(text=text, user=request.user, mdl=mdl, audio=audio_instance)
                UserExpenseModel.objects.create(operation="stt", operation_id=stt_instance.id, credit=credit_usage,
                                                cash=cash_usage, user=request.user)

                stt = UserSTTListSerializer(stt_instance)

                return Response(data=stt.data, status=status.HTTP_200_OK)
        except CustomException as e:
            return Response(data={"message": str(e)}, status=e.status)
        except Exception as e:
            UserSTTErrorLogModel.objects.create(message=str(e), audio=audio_instance, user=self.request.user)
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TokenSTTView(APIView):
    parser_classes = [MultiPartParser]
    token_required = True

    @swagger_auto_schema(operation_description="STT generate...", request_body=STTSerializer, manual_parameters=[
        openapi.Parameter(
            name="token",
            in_=openapi.IN_QUERY,
            description="Service API token",
            type=openapi.TYPE_STRING,
            required=True,
        )
    ], tags=["STT"])
    def post(self, request):
        audio_instance = None
        try:
            permission = request.token.permission
            if permission.stt == "disable":
                return Response(data={"message": _("Permission denied.")}, status=status.HTTP_403_FORBIDDEN)

            serializer = STTSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            mdl = serializer.validated_data["mdl"]

            audio_instance = AudioModel.objects.create(user=request.user, file=serializer.validated_data["audio"])

            balance = request.user.balance
            sub = request.user.active_sub
            rate = request.token.stt_rate
            credit_usage, cash_usage = stt_transaction(balance, sub, rate, audio_instance.file, mdl)

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

                stt_instance = TokenSTTModel.objects.create(text=text, token=request.token, mdl=mdl,
                                                            audio=audio_instance)

                sub.credit_expense += credit_usage
                rate.credit_usage += credit_usage
                balance.cash -= cash_usage

                TokenExpenseModel.objects.create(operation="stt", operation_id=stt_instance.id, credit=credit_usage,
                                                 cash=cash_usage, token=request.token)

                balance.save()
                sub.save()
                rate.save()

                return Response(data={"transcript": text}, status=status.HTTP_200_OK)
        except CustomException as e:
            return Response(data={"message": str(e)}, status=e.status)
        except Exception as e:
            TokenSTTErrorLogModel.objects.create(message=str(e), audio=audio_instance, token=self.request.token)
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserSTTListView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description="STT list...", manual_parameters=[
        openapi.Parameter(
            "page", openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            "page_size", openapi.IN_QUERY, description="Items per page (max 100)", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            "ordering", openapi.IN_QUERY, description="Comma-separated fields (e.g. `created_at,text`)",
            type=openapi.TYPE_STRING
        ),
    ],
                         tags=["STT"]
                         )
    def get(self, request):
        ordering = request.query_params.get("ordering", "-created_at")

        queryset = UserSTTModel.objects.filter(user=request.user, is_deleted=False).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = UserSTTListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)


class TokenSTTListView(APIView):
    token_required = True

    @swagger_auto_schema(operation_description="STT list...", manual_parameters=[
        openapi.Parameter(
            "page", openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            "page_size", openapi.IN_QUERY, description="Items per page (max 100)", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            "ordering", openapi.IN_QUERY, description="Comma-separated fields (e.g. `created_at,text`)",
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
    tags=["STT"])

    def get(self, request):
        permission = request.token.permission
        if permission.history != "all" and permission.history != "read":
            return Response(data={"message": _("Permission denied.")}, status=status.HTTP_403_FORBIDDEN)

        ordering = request.query_params.get("ordering", "-created_at")

        queryset = TokenSTTModel.objects.filter(token=request.token, is_deleted=False).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = TokenSTTListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)


class UserSTTItemView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="STT change...",
        request_body=UserSTTChangeSerializer,
        tags=["STT"]
    )
    def put(self, request, stt_id):
        try:
            stt_instance = UserSTTModel.objects.get(id=stt_id, user=request.user, is_deleted=False)

            serializer = UserSTTChangeSerializer(
                instance=stt_instance,
                data=request.data,
            )
            serializer.is_valid(raise_exception=True)

            serializer.save()


            return Response(data={"message": _("Data successfully changed.")}, status=status.HTTP_200_OK)
        except TokenSTTModel.DoesNotExist:
            return Response(data={"message": _("Data not found.")}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @swagger_auto_schema(
        operation_description="Delete session...",
        tags=["STT"]
    )
    def delete(self, request, stt_id):
        try:
            stt = UserSTTModel.objects.get(user=request.user, id=stt_id, is_deleted=False)
            stt.is_deleted = True
            stt.save()

            return Response(data={"message": _("Data successfully deleted.")}, status=status.HTTP_200_OK)
        except UserSTTModel.DoesNotExist:
            return Response(data={"message": _("Data not found.")}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class TokenSTTItemView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description="STT change...",
        request_body=TokenSTTChangeSerializer,
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        tags=["STT"]
    )
    def put(self, request, stt_id):
        try:
            permission = request.token.permission
            if permission.history != "all" and permission.history != "write":
                return Response(data={"message": _("Permission denied.")}, status=status.HTTP_403_FORBIDDEN)

            stt_instance = TokenSTTModel.objects.get(id=stt_id, token=request.token, is_deleted=False)

            serializer = TokenSTTChangeSerializer(
                instance=stt_instance,
                data=request.data,
            )
            serializer.is_valid(raise_exception=True)

            serializer.save()

            return Response(data={"message": _("Data successfully changed.")}, status=status.HTTP_200_OK)
        except TokenSTTModel.DoesNotExist:
            return Response(data={"message": _("Data not found.")}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @swagger_auto_schema(
        operation_description="Delete session...",
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        tags=["STT"]
    )
    def delete(self, request, stt_id):
        try:
            permission = request.token.permission
            if permission.history != "all" and permission.history != "write":
                return Response(data={"message": _("Permission denied.")}, status=status.HTTP_403_FORBIDDEN)

            stt = TokenSTTModel.objects.get(token=request.token, id=stt_id, is_deleted=False)
            stt.is_deleted = True
            stt.save()

            return Response(data={"message": _("Data successfully deleted.")}, status=status.HTTP_200_OK)
        except TokenSTTModel.DoesNotExist:
            return Response(data={"message": _("Data not found.")}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserSTTSearchView(APIView):
    auth_required = True

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "q", openapi.IN_QUERY,
                description="Search by name",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        tags=["STT"]
    )
    def get(self, request):
        q = request.GET["q"].strip()
        items = UserSTTModel.objects.filter(audio__name__icontains=q, user=request.user, is_deleted=False).order_by("-created_at")
        serializer = UserSTTListSerializer(items, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class TokenSTTSearchView(APIView):
    token_required = True

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "q", openapi.IN_QUERY,
                description="Search by name",
                type=openapi.TYPE_STRING,
                required=True
            ),
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        tags=["STT"]
    )
    def get(self, request):
        permission = request.token.permission
        if permission.history != "all" and permission.history != "read":
            return Response(data={"message": _("Permission denied.")}, status=status.HTTP_403_FORBIDDEN)

        q = request.GET["q"].strip()
        items = TokenSTTModel.objects.filter(audio__name__icontains=q, token=request.token, is_deleted=False).order_by("-created_at")
        serializer = TokenSTTListSerializer(items, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)