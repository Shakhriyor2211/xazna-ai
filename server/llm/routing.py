from django.urls import path
from llm import consumers

llm_ws_urlpatterns = [
    path("message/<uuid:session_id>", consumers.LLMConsumer.as_asgi(), name="llm_message")
]


