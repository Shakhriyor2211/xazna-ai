from datetime import timedelta
from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from log.models import UserLLMErrorLogModel, TokenLLMErrorLogModel
from rate.models import UserLLMContextRateModel, TokenLLMContextRateModel
from shared.utils import generate_title
from llm.models import UserLLMSessionModel, UserLLMMessageModel, LLMModelModel, TokenLLMSessionModel, \
    TokenLLMMessageModel
from llm.serializers import UserLLMSessionSerializer, UserLLMMessageSerializer, TokenLLMSessionSerializer
from drf_yasg.utils import swagger_auto_schema
from django.utils import timezone


class UserLLMSessionListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="LLM session list..",
        tags=["LLM"]
    )
    def get(self, request):
        sessions = UserLLMSessionModel.objects.filter(user=request.user).order_by("-created_at")
        serializer = UserLLMSessionSerializer(sessions, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class TokenLLMSessionListAPIView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description="LLM session list..",
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=False,
            )
        ],
        tags=["LLM"]
    )
    def get(self, request):
        sessions = TokenLLMSessionModel.objects.filter(token=request.token).order_by("-created_at")
        serializer = TokenLLMSessionSerializer(sessions, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserLLMMessageListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="LLM list..",
        tags=["LLM"]
    )
    def get(self, request, session_id):
        session = UserLLMSessionModel.objects.filter(id=session_id, user=request.user).first()
        messages = session.messages.order_by("created_at")
        serializer = UserLLMMessageSerializer(messages, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class TokenLLMMessageListAPIView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description="LLM list..",
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=False,
            )
        ],
        tags=["LLM"]
    )
    def get(self, request, session_id):
        session = TokenLLMSessionModel.objects.filter(id=session_id, user=request.user).first()
        messages = session.messages.order_by("created_at")
        serializer = UserLLMMessageSerializer(messages, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserLLMSessionAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="Create a new LLM session",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "content": openapi.Schema(type=openapi.TYPE_STRING, description="Content"),
                "mdl": openapi.Schema(type=openapi.TYPE_STRING, description="Model"),
            },
            required=["message"],
        ),
        tags=["LLM"]
    )
    def post(self, request):
        cnt = None
        try:
            cnt = request.data.get("content")
            mdl = request.data.get("mdl")

            if not cnt:
                return Response({"message": "Content is required."}, status=status.HTTP_400_BAD_REQUEST)

            if not mdl:
                return Response({"message": "Model is required."}, status=status.HTTP_400_BAD_REQUEST)

            rate = request.user.llm_rate

            if rate.session_limit == rate.session_usage:
                return Response(data={"message": "Session limit reached."}, status=status.HTTP_403_FORBIDDEN)

            plan = LLMModelModel.objects.get(title=mdl)
            balance = request.user.balance
            sub = request.user.active_sub

            if rate.credit_reset is None or rate.credit_reset < timezone.now():
                rate.credit_reset = timezone.now() + timedelta(minutes=rate.credit_time)
                rate.credit_usage = 0

            credit_avail = sub.credit - sub.credit_expense
            credit_active = min(credit_avail, rate.credit_limit - rate.credit_usage)
            char_length = len(cnt)

            if balance.chargeable and char_length > credit_active / plan.credit:
                remainder = char_length - int(credit_active / plan.credit)
                cash_usage = remainder * plan.cash

                if cash_usage > balance.cash:
                    return Response(data={"message": "Not enough founds."}, status=status.HTTP_403_FORBIDDEN)

            else:
                if char_length > credit_avail / plan.credit:
                    return Response(data={"message": "Not enough credits."}, status=status.HTTP_403_FORBIDDEN)

                if char_length > credit_active / plan.credit:
                    return Response(data={"message": "Request limit exceeded."}, status=status.HTTP_403_FORBIDDEN)

            session = UserLLMSessionModel.objects.create(user=request.user, title=generate_title(cnt), is_streaming=True)
            UserLLMContextRateModel.objects.create(session=session, context_limit=sub.llm_rate.context_limit)

            UserLLMMessageModel.objects.create(content=cnt, role="user", mdl=mdl, session=session)

            rate.session_usage += 1
            rate.save()

            return Response(data={"slug": session.id}, status=status.HTTP_201_CREATED)

        except Exception as e:
            UserLLMErrorLogModel.objects.create(message=str(e), content=cnt, user=self.request.user)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TokenLLMSessionAPIView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description="Create a new LLM session",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "content": openapi.Schema(type=openapi.TYPE_STRING, description="Content"),
                "mdl": openapi.Schema(type=openapi.TYPE_STRING, description="Model"),
            },
            required=["message"],
        ),
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=False,
            )
        ],
        tags=["LLM"]
    )
    def post(self, request):
        cnt = None
        try:
            cnt = request.data.get("content")
            mdl = request.data.get("mdl")

            if not cnt:
                return Response({"message": "Content is required."}, status=status.HTTP_400_BAD_REQUEST)

            if not mdl:
                return Response({"message": "Model is required."}, status=status.HTTP_400_BAD_REQUEST)

            rate = request.token.llm_rate

            if rate.session_limit == rate.session_usage:
                return Response(data={"message": "Session limit reached."}, status=status.HTTP_403_FORBIDDEN)

            plan = LLMModelModel.objects.get(title=mdl)
            balance = request.user.balance
            sub = request.user.active_sub

            if rate.credit_reset is None or rate.credit_reset < timezone.now():
                rate.credit_reset = timezone.now() + timedelta(minutes=rate.credit_time)
                rate.credit_usage = 0

            credit_avail = sub.credit - sub.credit_expense
            credit_active = min(credit_avail, rate.credit_limit - rate.credit_usage)
            char_length = len(cnt)

            if balance.chargeable and char_length > credit_active / plan.credit:
                remainder = char_length - int(credit_active / plan.credit)
                cash_usage = remainder * plan.cash

                if cash_usage > balance.cash:
                    return Response(data={"message": "Not enough founds."}, status=status.HTTP_403_FORBIDDEN)

            else:
                if char_length > credit_avail / plan.credit:
                    return Response(data={"message": "Not enough credits."}, status=status.HTTP_403_FORBIDDEN)

                if char_length > credit_active / plan.credit:
                    return Response(data={"message": "Request limit exceeded."}, status=status.HTTP_403_FORBIDDEN)

            session = TokenLLMSessionModel.objects.create(token=request.token, title=generate_title(cnt), is_streaming=True)
            TokenLLMContextRateModel.objects.create(session=session, context_limit=sub.llm_rate.context_limit)

            TokenLLMMessageModel.objects.create(content=cnt, role="user", mdl=mdl, session=session)

            rate.session_usage += 1
            rate.save()

            return Response(data={"slug": session.id}, status=status.HTTP_201_CREATED)

        except Exception as e:
            TokenLLMErrorLogModel.objects.create(message=str(e), content=cnt, token=self.request.token)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserLLMSessionItemAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="Change session title...",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "title": openapi.Schema(type=openapi.TYPE_STRING, description="Title"),
            },
            required=["title"],
        ),
        tags=["LLM"]
    )
    def put(self, request, session_id):
        try:
            title = request.data.get("title")

            if title is None:
                return Response(data={"message": "Title is required."}, status=status.HTTP_400_BAD_REQUEST)

            session = UserLLMSessionModel.objects.filter(user=request.user, id=session_id).first()

            if session is None:
                return Response(data={"message": "Session not found."}, status=status.HTTP_404_NOT_FOUND)

            session.title = generate_title(title)
            session.save()

            return Response(data={"title": session.title}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @swagger_auto_schema(
        operation_description="Delete session...",
        tags=["LLM"]
    )
    def delete(self, request, session_id):
        try:
            session = UserLLMSessionModel.objects.filter(user=request.user, id=session_id).first()

            if session is None:
                return Response(data={"message": "Session not found."}, status=status.HTTP_404_NOT_FOUND)

            session.delete()

            rate = request.user.llm_rate
            rate.session_usage -= 1
            rate.save()

            return Response(data={"message": "Session successfully deleted."}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TokenLLMSessionItemAPIView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description="Change session title...",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "title": openapi.Schema(type=openapi.TYPE_STRING, description="Title"),
            },
            required=["title"],
        ),
        tags=["LLM"]
    )
    def put(self, request, session_id):
        try:
            title = request.data.get("title")

            if title is None:
                return Response(data={"message": "Title is required."}, status=status.HTTP_400_BAD_REQUEST)

            session = TokenLLMSessionModel.objects.filter(user=request.user, id=session_id).first()

            if session is None:
                return Response(data={"message": "Session not found."}, status=status.HTTP_404_NOT_FOUND)

            session.title = generate_title(title)
            session.save()

            return Response(data={"title": session.title}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @swagger_auto_schema(
        operation_description="Delete session...",
        tags=["LLM"]
    )
    def delete(self, request, session_id):
        try:
            session = TokenLLMSessionModel.objects.filter(user=request.user, id=session_id).first()

            if session is None:
                return Response(data={"message": "Session not found."}, status=status.HTTP_404_NOT_FOUND)

            session.delete()

            rate = request.user.llm_rate
            rate.session_usage -= 1
            rate.save()

            return Response(data={"message": "Session successfully deleted."}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
