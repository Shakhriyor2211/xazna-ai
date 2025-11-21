from django.contrib import admin
from sub.models import SubModel

@admin.register(SubModel)
class SubAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "credit",
        "credit_expense",
        "status",
        "auto_renew",
        "user",
        "start_date",
        "end_date"
    )

