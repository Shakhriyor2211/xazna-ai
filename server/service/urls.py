from django.urls import path

from service.views import ServiceTokenItemView, ServiceTokenListView, ServiceTokenView, ServiceTokenKeyView, \
    ServiceTokenManageView

urlpatterns = [
    path("token/generate", ServiceTokenView.as_view(), name="service_token_generate"),
    path("token/item/<int:token_id>", ServiceTokenItemView.as_view(), name="service_token_item"),
    path("token/list", ServiceTokenListView.as_view(), name="service_token_list"),
    path("token/key/<int:token_id>", ServiceTokenKeyView.as_view(), name="service_token_key"),
    path("token/manage/<int:token_id>", ServiceTokenManageView.as_view(), name="service_token_key"),
]
