from django.urls import path
from llm.consumers import UserLLMConsumer, TokenLLMConsumer

llm_ws_urlpatterns = [
    path("user/message/<uuid:session_id>", UserLLMConsumer.as_asgi(), name="user_llm_message"),
    path("token/message/<uuid:session_id>", TokenLLMConsumer.as_asgi(), name="token_llm_message")
]


