import uuid
from django.core.validators import MinValueValidator
from django.db import models
from xazna.models import BaseModel


class BalanceModel(BaseModel):
    user = models.OneToOneField("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="balance")
    cash = models.DecimalField(max_digits=16, decimal_places=4, default=0)
    chargeable = models.BooleanField(default=False)

    def __str__(self):
        return f'''{self.id}'''

    class Meta:
        verbose_name = "Balance"
        verbose_name_plural = "Balances"
        db_table = "balance"


class UserExpenseModel(BaseModel):
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
    is_deleted = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["operation", "operation_id"],
                name="unique_user_expense_operation"
            )
        ]
        verbose_name = "User Expense"
        verbose_name_plural = "User Expenses"
        ordering = ["-created_at"]
        db_table = "user_expense"


class TokenExpenseModel(BaseModel):
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
    token = models.ForeignKey("service.ServiceTokenModel", on_delete=models.CASCADE)
    consumer = models.CharField(choices=[("service", "service"), ("user", "user")], default="user")
    is_deleted = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["operation", "operation_id"],
                name="unique_token_expense_operation"
            )
        ]
        verbose_name = "Token Expense"
        verbose_name_plural = "Token Expenses"
        ordering = ["-created_at"]
        db_table = "token_expense"
