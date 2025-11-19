from datetime import timedelta
from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from log.models import UserLLMErrorLogModel
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

            subscription = request.user.balance.subscription
            expense = LLMSessionModel.objects.filter(user=request.user).count()

            if expense == subscription.llm_session:
                return Response(data={"message": "Session limit reached."}, status=status.HTTP_403_FORBIDDEN)

            plan = LLMModelModel.objects.get(title=mdl)
            balance = request.user.balance
            subscription = balance.subscription
            credit_rate = subscription.rate.llm.credit

            if credit_rate.reset is None or credit_rate.reset < timezone.now():
                credit_rate.reset = timezone.now() + timedelta(minutes=credit_rate.time)
                credit_rate.usage = 0

            credit_avail = subscription.credit - subscription.credit_expense
            credit_active = min(credit_avail, credit_rate.limit - credit_rate.usage)
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

            session = LLMSessionModel.objects.create(user=request.user, title=generate_title(cnt), is_streaming=True,
                                                     context=subscription.llm_context)

            LLMMessageModel.objects.create(content=cnt, role="user", mdl=mdl, session=session)

            subscription.llm_session_expense += 1
            subscription.save()

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

            subscription = request.user.balance.subscription
            subscription.llm_session_expense -= 1
            subscription.save()

            return Response(data={"message": "Session successfully deleted."}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
