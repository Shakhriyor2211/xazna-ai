from django.contrib import admin
from plan.models import PlanModel, PlanMonthlyModel, PlanAnnualModel

@admin.register(PlanModel)
class PlanAdmin(admin.ModelAdmin):
    exclude = ("user",)
    list_display = (
        "id",
        "title",
        "llm_session",
        "llm_context",
        "monthly__credit",
        "annual__credit",
        "user",
        "created_at"
    )


    def save_model(self, request, obj, form, change):
        obj.user = request.user
        super().save_model(request, obj, form, change)



@admin.register(PlanMonthlyModel)
class PlanMonthlyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "plan",
        "credit",
        "price",
        "discount"
    )

@admin.register(PlanAnnualModel)
class PlanAnnualAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "plan",
        "credit",
        "price",
        "discount"
    )


