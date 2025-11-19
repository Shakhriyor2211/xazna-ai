from django.urls import path

from service.views import ServiceLLMSessionAPIView, ServiceSTTAPIView, ServiceTTSAPIView

urlpatterns = [
    path("session", ServiceLLMSessionAPIView.as_view(), name="service_llm_session"),
    path("stt", ServiceSTTAPIView.as_view(), name="service_stt"),
    path("tts", ServiceTTSAPIView.as_view(), name="service_tts")
]
