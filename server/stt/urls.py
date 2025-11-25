from django.urls import path
from django.urls.conf import include

from stt.views import STTAPIView, STTListAPIView, STTDeleteAPIView, STTSearchAPIView, STTChangeAPIView


user_patterns = [
    path("generate", STTAPIView.as_view(), name="user_stt_generate"),
    path("list", STTListAPIView.as_view(), name="user_stt_list"),
    path("delete", STTDeleteAPIView.as_view(), name="user_stt_delete"),
    path("change/<stt_id>", STTChangeAPIView.as_view(), name="user_stt_change"),
    path("search", STTSearchAPIView.as_view(), name="user_stt_search"),
]

token_patterns = [
    path("generate", STTAPIView.as_view(), name="token_stt_generate"),
    path("list", STTListAPIView.as_view(), name="token_stt_list"),
    path("delete", STTDeleteAPIView.as_view(), name="token_stt_delete"),
    path("change/<stt_id>", STTChangeAPIView.as_view(), name="token_stt_change"),
    path("search", STTSearchAPIView.as_view(), name="token_stt_search"),
]

urlpatterns = [
    path("user/", include(user_patterns)),
    path("token/", include(token_patterns))
]