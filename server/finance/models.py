import uuid
from django.core.validators import MinValueValidator
from django.db import models
from xazna.models import BaseModel


class BalanceModel(BaseModel):
    user = models.OneToOneField("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="balance")
    cash = models.DecimalField(max_digits=16, decimal_places=4, default=0)
    chargeable = models.BooleanField(default=False)
    subscription = models.OneToOneField("subscription.SubscriptionModel", on_delete=models.SET_NULL, null=True, blank=True,
                                        related_name="subscription")

    def __str__(self):
        return f'''{self.id}'''

    class Meta:
        verbose_name = "Balance"
        verbose_name_plural = "Balances"
        db_table = "balance"


class TransactionModel(BaseModel):
    amount = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    currency = models.CharField(choices=[("uzs", "uzs"), ("usd", "usd")], default="uzs")
    status = models.CharField(
        choices=[("pending", "pending"), ("completed", "completed"), ("failed", "failed"), ("canceled", "canceled")],
        default="pending")
    provider = models.CharField(choices=[("xazna", "xazna"), ("click", "click"), ("payme", "payme")],
                                default="xazna")
    method = models.CharField(
        choices=[("uzcard", "uzcard"), ("humo", "humo"), ("visa", "visa"), ("mastercard", "mastercard"),
                 ("unionpay", "unionpay")],
        default="uzcard")
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)

    def __str__(self):
        return f'''{self.id}'''

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
        ordering = ["-created_at"]
        db_table = "transaction"


class ExpenseModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    operation = models.CharField(choices=[("tts", "tts"), ("stt", "stt"), ("llm", "llm")])
    operation_id = models.UUIDField(
        max_length=36,
        default=uuid.uuid4,
        editable=False,
    )
    credit = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    cash = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)

    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)
    consumer = models.CharField(choices=[("service", "service"), ("user", "user")], default="user")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["operation", "operation_id"],
                name="unique_operation_and_id"
            )
        ]
        verbose_name = "Expense"
        verbose_name_plural = "Expenses"
        ordering = ["-created_at"]
        db_table = "expense"


