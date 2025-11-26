from django.urls import path

from service.views import ServiceTokenItemAPIView, ServiceTokenListAPIView, ServiceTokenAPIView

urlpatterns = [
    path("token/generate", ServiceTokenAPIView.as_view(), name="service_token_generate"),
    path("token/item/<int:token_id>", ServiceTokenItemAPIView.as_view(), name="service_token_item"),
    path("token/list", ServiceTokenListAPIView.as_view(), name="service_token_list"),
]
