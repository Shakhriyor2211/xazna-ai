import uuid
from django.core.validators import MinValueValidator
from django.db import models
from xazna.models import BaseModel


class BillingModel(BaseModel):
    invoice = models.CharField(max_length=20, unique=True)
    transaction_id = models.CharField(blank=True, null=True, unique=True)
    amount = models.DecimalField(max_digits=14, decimal_places=2, validators=[MinValueValidator(0)], default=0)
    currency = models.CharField(choices=[("uzs", "uzs"), ("usd", "usd")], default="uzs")
    status = models.CharField(
        choices=[("pending", "pending"), ("completed", "completed"), ("failed", "failed")],
        default="pending")
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)

    def __str__(self):
        return f'''{self.id}'''

    class Meta:
        verbose_name = "List"
        verbose_name_plural = "List"
        ordering = ["-created_at"]
        db_table = "billing"

