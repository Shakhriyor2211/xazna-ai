from django.utils import timezone
from dateutil.relativedelta import relativedelta
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from xazna.models import BaseModel, CreditSubRateBaseModel


class SubModel(BaseModel):
    title = models.CharField(max_length=50)
    discount = models.DecimalField(max_digits=3, decimal_places=1,
                                   validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    credit = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    credit_expense = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    llm_session = models.PositiveIntegerField(default=0)
    llm_session_expense = models.PositiveIntegerField(default=0)
    llm_context = models.PositiveIntegerField(default=0)
    auto_renew = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    status = models.CharField(
        choices=[("active", "active"), ("expired", "expired"), ("canceled", "canceled")],
        default="active")
    period = models.CharField(choices=[("monthly", "monthly"), ("annual", "annual")], default="monthly")
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="sub")

    def save(self, *args, **kwargs):
        if not self.end_date:
            local_now = timezone.localtime(timezone.now())
            midnight = local_now.replace(hour=23, minute=59, second=59, microsecond=59)

            if self.period == "annual":
                self.end_date = midnight + relativedelta(years=1)
            else:
                self.end_date = midnight + relativedelta(months=1)

        super().save(*args, **kwargs)


    class Meta:
        verbose_name = "List"
        verbose_name_plural = "List"
        db_table = "sub"




