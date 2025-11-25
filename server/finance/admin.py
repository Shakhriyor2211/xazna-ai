from django.contrib import admin
from finance.models import BalanceModel, TransactionModel, UserExpenseModel, TokenExpenseModel


@admin.register(UserExpenseModel)
class UserExpenseAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "operation",
        "cash",
        "credit",
        "user",
        "created_at"
    )

@admin.register(TokenExpenseModel)
class TokenExpenseAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "operation",
        "cash",
        "credit",
        "token",
        "created_at"
    )

@admin.register(TransactionModel)
class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "amount",
        "currency",
        "provider",
        "method",
        "status",
        "user",
        "created_at"
    )


@admin.register(BalanceModel)
class BalanceAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "cash",
        "user",
        "created_at"
    )



