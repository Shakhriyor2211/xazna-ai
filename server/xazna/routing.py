from django.urls import path
from llm.routing import llm_ws_urlpatterns
from channels.routing import URLRouter

ws_base_patterns = [
    path("llm/", URLRouter(llm_ws_urlpatterns))
]


ws_urlpatterns = [
    path("ws/v1/", URLRouter(ws_base_patterns))
]