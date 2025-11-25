from django.urls import path

from service.views import  ServiceTokenAPIView, ServiceTokenListAPIView

urlpatterns = [
    path("token/list", ServiceTokenListAPIView.as_view(), name="service_token_list"),
    path("token/<int:token_id>", ServiceTokenAPIView.as_view(), name="service_token_list"),
]
