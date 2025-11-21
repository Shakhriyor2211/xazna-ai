from datetime import timedelta
from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from log.models import UserLLMErrorLogModel
from rate.models import UserLLMContextRateModel
from shared.utils import generate_title
from llm.models import LLMSessionModel, LLMMessageModel, LLMModelModel
from llm.serializers import LLMSessionSerializer, LLMMessageSerializer
from drf_yasg.utils import swagger_auto_schema
from django.utils import timezone


class LLMSessionListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="LLM session list..",
        tags=["LLM"]
    )
    def get(self, request):
        sessions = LLMSessionModel.objects.filter(user=request.user).order_by("-created_at")
        serializer = LLMSessionSerializer(sessions, many=True)
        return Response(serializer.data)


class LLMMessageListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="LLM list..",
        tags=["LLM"]
    )
    def get(self, request, session_id):
        session = LLMSessionModel.objects.filter(id=session_id, user=request.user).first()
        messages = session.messages.order_by("created_at")
        serializer = LLMMessageSerializer(messages, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class LLMSessionAPIView(APIView):
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

            session = LLMSessionModel.objects.create(user=request.user, title=generate_title(cnt), is_streaming=True)
            UserLLMContextRateModel.objects.create(session=session, context_limit=sub.llm_rate.context_limit)

            LLMMessageModel.objects.create(content=cnt, role="user", mdl=mdl, session=session)

            rate.session_usage += 1
            rate.save()

            return Response(data={"slug": session.id}, status=status.HTTP_201_CREATED)

        except Exception as e:
            UserLLMErrorLogModel.objects.create(message=str(e), content=cnt, user=self.request.user)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LLMSessionItemAPIView(APIView):
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

            session = LLMSessionModel.objects.filter(user=request.user, id=session_id).first()

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
            session = LLMSessionModel.objects.filter(user=request.user, id=session_id).first()

            if session is None:
                return Response(data={"message": "Session not found."}, status=status.HTTP_404_NOT_FOUND)

            session.delete()

            rate = request.user.llm_rate
            rate.session_usage -= 1
            rate.save()

            return Response(data={"message": "Session successfully deleted."}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
