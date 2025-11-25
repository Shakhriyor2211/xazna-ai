from django.urls import path
from django.urls.conf import include
from llm.views import UserLLMSessionListAPIView, UserLLMSessionAPIView, UserLLMSessionItemAPIView, \
    UserLLMMessageListAPIView, TokenLLMSessionListAPIView, TokenLLMSessionItemAPIView, TokenLLMMessageListAPIView, \
    TokenLLMSessionAPIView

user_patterns = [
    path("session/list", UserLLMSessionListAPIView.as_view(), name="user_session_list"),
    path("session/item/<uuid:session_id>", UserLLMSessionItemAPIView.as_view(), name="user_session_item"),
    path("session/message/<uuid:session_id>", UserLLMMessageListAPIView.as_view(), name="user_message_list"),
    path("session/generate", UserLLMSessionAPIView.as_view(), name="user_session_generate"),
]

token_patterns = [
    path("session/list", TokenLLMSessionListAPIView.as_view(), name="token_session_list"),
    path("session/item/<uuid:session_id>", TokenLLMSessionItemAPIView.as_view(), name="token_session_item"),
    path("session/message/<uuid:session_id>", TokenLLMMessageListAPIView.as_view(), name="token_message_list"),
    path("session/generate", TokenLLMSessionAPIView.as_view(), name="token_session_generate")
]


urlpatterns = [
    path("user/", include(user_patterns)),
    path("token/", include(token_patterns))
]