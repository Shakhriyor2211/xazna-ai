from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from xazna.models import BaseModel


class PlanModel(BaseModel):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)
    monthly_credit = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    monthly_price = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    monthly_discount = models.DecimalField(max_digits=4, decimal_places=1,
                                   validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    annual_credit = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    annual_price = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    annual_discount = models.DecimalField(max_digits=4, decimal_places=1,
                                           validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    user = models.ForeignKey(
        "accounts.CustomUserModel",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'''{self.title}'''

    class Meta:
        verbose_name = "List"
        verbose_name_plural = "List"
        ordering = ["pk"]
        db_table = "plan"

