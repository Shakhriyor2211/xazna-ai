from django.urls import path
from django.urls.conf import include
from llm.views import UserLLMSessionListView, UserLLMSessionView, UserLLMSessionItemView, \
    UserLLMMessageListView, TokenLLMSessionListView, TokenLLMSessionItemView, TokenLLMMessageListView, \
    TokenLLMSessionView

user_patterns = [
    path("session/list", UserLLMSessionListView.as_view(), name="user_session_list"),
    path("session/item/<uuid:session_id>", UserLLMSessionItemView.as_view(), name="user_session_item"),
    path("session/message/<uuid:session_id>", UserLLMMessageListView.as_view(), name="user_message_list"),
    path("session/generate", UserLLMSessionView.as_view(), name="user_session_generate"),
]

token_patterns = [
    path("session/list", TokenLLMSessionListView.as_view(), name="token_session_list"),
    path("session/item/<uuid:session_id>", TokenLLMSessionItemView.as_view(), name="token_session_item"),
    path("session/message/<uuid:session_id>", TokenLLMMessageListView.as_view(), name="token_message_list"),
    path("session/generate", TokenLLMSessionView.as_view(), name="token_session_generate")
]


urlpatterns = [
    path("user/", include(user_patterns)),
    path("token/", include(token_patterns))
]