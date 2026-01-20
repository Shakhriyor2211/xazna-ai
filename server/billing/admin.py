from django.contrib import admin
from billing.models import BillingModel


@admin.register(BillingModel)
class BillingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "amount",
        "currency",
        "invoice",
        "transaction_id",
        "status",
        "user",
        "created_at"
    )
