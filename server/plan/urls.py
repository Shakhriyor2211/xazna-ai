from django.urls import path
from plan.views import PlanListView, PlanInfoView

urlpatterns = [
    path("list", PlanListView.as_view(), name="plan_list"),
    path("info", PlanInfoView.as_view(), name="plan_info")
]