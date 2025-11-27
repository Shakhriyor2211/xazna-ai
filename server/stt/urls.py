from django.urls import path
from django.urls.conf import include

from stt.views import UserSTTView, UserSTTListView, UserSTTItemView, UserSTTSearchView, TokenSTTView, \
    TokenSTTListView, TokenSTTItemView, TokenSTTSearchView

user_patterns = [
    path("generate", UserSTTView.as_view(), name="user_stt_generate"),
    path("list", UserSTTListView.as_view(), name="user_stt_list"),
    path("item/<uuid:stt_id>", UserSTTItemView.as_view(), name="user_stt_item"),
    path("search", UserSTTSearchView.as_view(), name="user_stt_search"),
]

token_patterns = [
    path("generate", TokenSTTView.as_view(), name="token_stt_generate"),
    path("list", TokenSTTListView.as_view(), name="token_stt_list"),
    path("item/<uuid:stt_id>", TokenSTTItemView.as_view(), name="token_stt_item"),
    path("search", TokenSTTSearchView.as_view(), name="token_stt_search"),
]

urlpatterns = [
    path("user/", include(user_patterns)),
    path("token/", include(token_patterns))
]