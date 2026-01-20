from django.urls import path
from billing.views import TopUpView, BillingListView, BillingInfoView, BillingPayView, BillingCheckView

urlpatterns = [
    path("top-up", TopUpView.as_view(), name="balance_top_up"),
    path("info", BillingInfoView.as_view(), name="billing_info"),
    path("pay", BillingPayView.as_view(), name="billing_pay"),
    path("check", BillingCheckView.as_view(), name="billing_check"),
    path("list", BillingListView.as_view(), name="billing_list"),

]