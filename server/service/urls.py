from django.urls import path

from service.views import ServiceTokenItemView, ServiceTokenListView, ServiceTokenView

urlpatterns = [
    path("token/generate", ServiceTokenView.as_view(), name="service_token_generate"),
    path("token/item/<int:token_id>", ServiceTokenItemView.as_view(), name="service_token_item"),
    path("token/list", ServiceTokenListView.as_view(), name="service_token_list"),
]
