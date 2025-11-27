from django.urls import path
from sub.views import SubChangeView, SubListView, SubCheckView, \
    SubRestartView, SubManageView

urlpatterns = [
    path("manage", SubManageView.as_view(), name="subscription_manage"),
    path("change", SubChangeView.as_view(), name="subscription_change"),
    path("restart", SubRestartView.as_view(), name="subscription_restart"),
    path("list", SubListView.as_view(), name="subscription_list"),
    path("check", SubCheckView.as_view(), name="subscription_check"),
]
