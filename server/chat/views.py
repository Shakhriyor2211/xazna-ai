from datetime import timedelta

from drf_yasg import openapi
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from shared.utils import generate_title
from .models import ChatSessionModel, ChatMessageModel, ChatModelModel
from .serializers import ChatSessionSerializer, ChatMessageSerializer
from drf_yasg.utils import swagger_auto_schema
from django.utils import timezone

class ChatSessionListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="Chat session list..",
        tags=["Chat"]
    )
    def get(self, request):
        sessions = ChatSessionModel.objects.filter(user=request.user).order_by("-created_at")
        serializer = ChatSessionSerializer(sessions, many=True)
        return Response(serializer.data)


class ChatMessageListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="Chat list..",
        tags=["Chat"]
    )
    def get(self, request, session_id):
        session = ChatSessionModel.objects.filter(id=session_id, user=request.user).first()
        messages = session.messages.order_by("created_at")
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class ChatSessionAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(
        operation_description="Create a new chat session",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "content": openapi.Schema(type=openapi.TYPE_STRING, description="Content"),
                "mdl": openapi.Schema(type=openapi.TYPE_STRING, description="Model"),
            },
            required=["message"],
        ),
        tags=["Chat"]
    )
    def post(self, request):
        try:
            subscription = request.user.balance.subscription

            if subscription.chat_session_expense == subscription.chat_session:
                return Response(data={"message": "Session limit reached."}, status=status.HTTP_403_FORBIDDEN)

            cnt = request.data.get("content")
            mdl = request.data.get("model")

            if not cnt:
                return Response({"message": "Content is required."}, status=status.HTTP_400_BAD_REQUEST)

            if not mdl:
                return Response({"message": "Model is required."}, status=status.HTTP_400_BAD_REQUEST)

            plan = ChatModelModel.objects.get(title=mdl)
            balance = request.user.balance
            subscription = balance.subscription
            credit_rate = subscription.rate.chat.credit

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


            session = ChatSessionModel.objects.create(user=request.user, title=generate_title(cnt), is_streaming=True, context=subscription.chat_context)

            ChatMessageModel.objects.create(content=cnt, role="user", mdl=mdl, session=session)

            subscription.chat_session_expense += 1
            subscription.save()

            return Response(data={"slug": session.id}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ChatSessionItemAPIView(APIView):
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
        tags=["Chat"]
    )

    def put(self, request, session_id):
        try:
            title = request.data.get("title")

            if title is None:
                return Response(data={"message": "Title is required."}, status=status.HTTP_400_BAD_REQUEST)

            session = ChatSessionModel.objects.filter(user=request.user, id=session_id).first()

            if session is None:
                return Response(data={"message": "Session not found."}, status=status.HTTP_404_NOT_FOUND)

            session.title = generate_title(title)
            session.save()

            return Response(data={"title": session.title}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @swagger_auto_schema(
        operation_description="Delete session...",
        tags=["Chat"]
    )
    def delete(self, request, session_id):
        try:
            session = ChatSessionModel.objects.filter(user=request.user, id=session_id).first()

            if session is None:
                return Response(data={"message": "Session not found."}, status=status.HTTP_404_NOT_FOUND)

            session.delete()

            subscription = request.user.balance.subscription
            subscription.chat_session_expense -= 1
            subscription.save()

            return Response(data={"message": "Session successfully deleted."}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
