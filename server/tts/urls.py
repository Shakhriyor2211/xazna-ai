from django.urls import path
from django.urls.conf import include

from tts.views import UserTTSView, UserTTSListView, UserTTSSearchView, TTSSettingsView, UserTTSItemView, \
    TokenTTSView, TokenTTSListView, TokenTTSSearchView, TokenTTSItemView

user_patterns = [
    path("generate", UserTTSView.as_view(), name="user_tts_generate"),
    path("list", UserTTSListView.as_view(), name="user_tts_list"),
    path("search", UserTTSSearchView.as_view(), name="user_tts_search"),
    path("item/<uuid:tts_id>", UserTTSItemView.as_view(), name="user_tts_item"),
]

token_patterns = [
    path("generate", TokenTTSView.as_view(), name="token_tts_generate"),
    path("list", TokenTTSListView.as_view(), name="token_tts_list"),
    path("search", TokenTTSSearchView.as_view(), name="token_tts_search"),
    path("item/<uuid:tts_id>", TokenTTSItemView.as_view(), name="user_tts_item"),
]


urlpatterns = [
    path("settings", TTSSettingsView.as_view(), name="user_tts_settings"),
    path("user/", include(user_patterns)),
    path("token/", include(token_patterns))
]