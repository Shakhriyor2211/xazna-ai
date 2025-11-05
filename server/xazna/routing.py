from django.urls import path
from chat.routing import chat_ws_urlpatterns
from channels.routing import URLRouter

ws_urlpatterns = [
    path("ws/", URLRouter(chat_ws_urlpatterns))
]