from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from xazna.models import BaseModel, CreditPlanRateBaseModel, CreditPlanRateBaseModel


class PlanModel(BaseModel):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)
    llm_session = models.PositiveIntegerField(default=0)
    llm_context = models.PositiveIntegerField(default=0)
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


class PlanMonthlyModel(BaseModel):
    plan = models.OneToOneField("PlanModel", on_delete=models.CASCADE, related_name="monthly")
    credit = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    price = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    discount = models.DecimalField(max_digits=4, decimal_places=1,
                                          validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    class Meta:
        verbose_name = "Monthly fund"
        verbose_name_plural = "Monthly funds"
        db_table = "plan_monthly"

class PlanAnnualModel(BaseModel):
    plan = models.OneToOneField("PlanModel", on_delete=models.CASCADE, related_name="annual")
    credit = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    price = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    discount = models.DecimalField(max_digits=4, decimal_places=1,
                                          validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)


    class Meta:
        verbose_name = "Annual fund"
        verbose_name_plural = "Annual funds"
        db_table = "plan_annual"



