from django.utils import timezone
from dateutil.relativedelta import relativedelta
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from xazna.models import BaseModel, CreditSubRateBaseModel


class SubscriptionModel(BaseModel):
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
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.end_date:
            local_now = timezone.localtime(timezone.now())
            midnight = local_now.replace(hour=23, minute=59, second=59, microsecond=59)

            if self.period == "annual":
                self.end_date = midnight + relativedelta(years=1)
            else:
                self.end_date = midnight + relativedelta(months=1)

        super().save(*args, **kwargs)


    def create_relations(self, plan, overrides=None):
        overrides = overrides or {}

        sub_rate = SubRateModel.objects.create(subscription=self)
        stt_rate = SubSTTRateModel.objects.create(rate=sub_rate)
        tts_rate = SubTTSRateModel.objects.create(rate=sub_rate)
        llm_rate = SubLLMRateModel.objects.create(rate=sub_rate)

        SubSTTCreditRateModel.objects.create(
            stt=stt_rate,
            limit=overrides.get("stt_credit_limit", getattr(plan.rate.stt.credit, "limit", 0)),
            time=overrides.get("stt_credit_time", getattr(plan.rate.stt.credit, "time", 0)),
        )

        SubTTSCreditRateModel.objects.create(
            tts=tts_rate,
            limit=overrides.get("tts_credit_limit", getattr(plan.rate.tts.credit, "limit", 0)),
            time=overrides.get("tts_credit_time", getattr(plan.rate.tts.credit, "time", 0)),
        )

        SubLLMCreditRateModel.objects.create(
            llm=llm_rate,
            limit=overrides.get("llm_credit_limit", getattr(plan.rate.llm.credit, "limit", 0)),
            time=overrides.get("llm_credit_time", getattr(plan.rate.llm.credit, "time", 0)),
        )

        return {
            "sub_rate": sub_rate,
            "stt_rate": stt_rate,
            "tts_rate": tts_rate,
            "llm_rate": llm_rate,
        }

    def __str__(self):
        return f'''{self.id}'''

    class Meta:
        verbose_name = "Data"
        verbose_name_plural = "Data"
        db_table = "sub"


class SubRateModel(BaseModel):
    subscription = models.OneToOneField("SubscriptionModel", on_delete=models.CASCADE, related_name="rate")

    class Meta:
        verbose_name = "Rate"
        verbose_name_plural = "Rates"
        db_table = "sub_rate"

    def __str__(self):
        return self.subscription.title



class SubSTTRateModel(BaseModel):
    rate = models.OneToOneField("SubRateModel", on_delete=models.CASCADE, related_name="stt")

    class Meta:
        verbose_name = "STT rate"
        verbose_name_plural = "STT rates"
        db_table = "sub_stt_rate"

    def __str__(self):
        return self.rate.subscription.title


class SubTTSRateModel(BaseModel):
    rate = models.OneToOneField("SubRateModel", on_delete=models.CASCADE, related_name="tts")

    class Meta:
        verbose_name = "TTS rate"
        verbose_name_plural = "TTS rates"
        db_table = "sub_tts_rate"

    def __str__(self):
        return self.rate.subscription.title


class SubLLMRateModel(BaseModel):
    rate = models.OneToOneField("SubRateModel", on_delete=models.CASCADE, related_name="llm")

    class Meta:
        verbose_name = "LLM rate"
        verbose_name_plural = "LLM rates"
        db_table = "sub_llm_rate"

    def __str__(self):
        return self.rate.subscription.title

class SubSTTCreditRateModel(CreditSubRateBaseModel):
    stt = models.OneToOneField("SubSTTRateModel", on_delete=models.CASCADE, related_name="credit")

    class Meta:
        verbose_name = "Stt credit rate"
        verbose_name_plural = "STT credit rates"
        db_table = "sub_stt_credit_rate"




class SubTTSCreditRateModel(CreditSubRateBaseModel):
    tts = models.OneToOneField("SubTTSRateModel", on_delete=models.CASCADE, related_name="credit")

    class Meta:
        verbose_name = "TTS credit rate"
        verbose_name_plural = "TTS credit rates"
        db_table = "sub_tts_credit_rate"


class SubLLMCreditRateModel(CreditSubRateBaseModel):
    llm = models.OneToOneField("SubLLMRateModel", on_delete=models.CASCADE, related_name="credit")

    class Meta:
        verbose_name = "LLM credit rate"
        verbose_name_plural = "LLM credit rates"
        db_table = "sub_llm_credit_rate"



