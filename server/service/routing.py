from django.urls import path
from llm import consumers

service_ws_urlpatterns = [
    path("llm/<uuid:session_id>", consumers.LLMConsumer.as_asgi(), name="service_llm_message")
]


