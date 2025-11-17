from django.urls import path
from llm.views import LLMSessionListAPIView, LLMSessionAPIView, LLMSessionItemAPIView, LLMMessageListAPIView

urlpatterns = [
    path("session/list", LLMSessionListAPIView.as_view(), name="llm_session_list"),
    path("session/<uuid:session_id>", LLMSessionItemAPIView.as_view(),  name="llm_session_item"),
    path("session/message/<uuid:session_id>", LLMMessageListAPIView.as_view(),  name="llm_message_list"),
    path("session/generate", LLMSessionAPIView.as_view(),  name="llm_session_generate")
]