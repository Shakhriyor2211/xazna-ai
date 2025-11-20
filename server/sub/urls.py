from django.urls import path
from sub.views import SubChangeAPIView, SubListAPIView, SubCheckAPIView, \
    SubRestartAPIView, SubManageAPIView

urlpatterns = [
    path("manage", SubManageAPIView.as_view(), name="subscription_manage"),
    path("change", SubChangeAPIView.as_view(), name="subscription_change"),
    path("restart", SubRestartAPIView.as_view(), name="subscription_restart"),
    path("list", SubListAPIView.as_view(), name="subscription_list"),
    path("check", SubCheckAPIView.as_view(), name="subscription_check"),
]
