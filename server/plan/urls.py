from django.urls import path
from plan.views import PlanListView

urlpatterns = [
    path("list", PlanListView.as_view(), name="plan_list")
]