from django.urls import path
from django.urls.conf import include

from tts.views import UserTTSAPIView, UserTTSListAPIView, UserTTSSearchAPIView, TTSSettingsAPIView, UserTTSItemAPIView, \
    TokenTTSAPIView, TokenTTSListAPIView, TokenTTSSearchAPIView, TokenTTSItemAPIView

user_patterns = [
    path("generate", UserTTSAPIView.as_view(), name="user_tts_generate"),
    path("list", UserTTSListAPIView.as_view(), name="user_tts_list"),
    path("search", UserTTSSearchAPIView.as_view(), name="user_tts_search"),
    path("item/<uuid:tts_id>", UserTTSItemAPIView.as_view(), name="user_tts_item"),
]

token_patterns = [
    path("generate", TokenTTSAPIView.as_view(), name="token_tts_generate"),
    path("list", TokenTTSListAPIView.as_view(), name="token_tts_list"),
    path("search", TokenTTSSearchAPIView.as_view(), name="token_tts_search"),
    path("item/<uuid:tts_id>", TokenTTSItemAPIView.as_view(), name="user_tts_item"),
]


urlpatterns = [
    path("settings", TTSSettingsAPIView.as_view(), name="user_tts_settings"),
    path("user/", include(user_patterns)),
    path("token/", include(token_patterns))
]