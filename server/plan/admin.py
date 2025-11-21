from django.contrib import admin
from plan.models import PlanModel

@admin.register(PlanModel)
class PlanAdmin(admin.ModelAdmin):
    exclude = ("user",)
    list_display = (
        "id",
        "title",
        "monthly_credit",
        "annual_credit",
        "user",
        "created_at"
    )


    def save_model(self, request, obj, form, change):
        obj.user = request.user
        super().save_model(request, obj, form, change)



