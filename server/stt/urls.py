from django.urls import path
from django.urls.conf import include

from stt.views import UserSTTAPIView, UserSTTListAPIView, UserSTTItemAPIView, UserSTTSearchAPIView, TokenSTTAPIView, \
    TokenSTTListAPIView, TokenSTTItemAPIView, TokenSTTSearchAPIView

user_patterns = [
    path("generate", UserSTTAPIView.as_view(), name="user_stt_generate"),
    path("list", UserSTTListAPIView.as_view(), name="user_stt_list"),
    path("item/<uuid:stt_id>", UserSTTItemAPIView.as_view(), name="user_stt_item"),
    path("search", UserSTTSearchAPIView.as_view(), name="user_stt_search"),
]

token_patterns = [
    path("generate", TokenSTTAPIView.as_view(), name="token_stt_generate"),
    path("list", TokenSTTListAPIView.as_view(), name="token_stt_list"),
    path("item/<uuid:stt_id>", TokenSTTItemAPIView.as_view(), name="token_stt_item"),
    path("search", TokenSTTSearchAPIView.as_view(), name="token_stt_search"),
]

urlpatterns = [
    path("user/", include(user_patterns)),
    path("token/", include(token_patterns))
]