from django.core.validators import MinValueValidator
from django.db import models
from xazna.models import BaseModel


class BaseRateModel(BaseModel):
    credit_limit = models.DecimalField(max_digits=16, decimal_places=4,
                                       validators=[MinValueValidator(0)], default=0)
    credit_time = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True


class PlanLLMRateModel(BaseRateModel):
    plan = models.OneToOneField("plan.PlanModel", on_delete=models.CASCADE, related_name="llm_rate")
    session_limit = models.SmallIntegerField(default=0)
    context_limit = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = "Plan LLM"
        verbose_name_plural = "Plan LLM"
        db_table = "plan_llm_rate"


class PlanTTSRateModel(BaseRateModel):
    plan = models.OneToOneField("plan.PlanModel", on_delete=models.CASCADE, related_name="tts_rate")

    class Meta:
        verbose_name = "Plan TTS"
        verbose_name_plural = "Plan TTS"
        db_table = "plan_tts_rate"


class PlanSTTRateModel(BaseRateModel):
    plan = models.OneToOneField("plan.PlanModel", on_delete=models.CASCADE, related_name="stt_rate")

    class Meta:
        verbose_name = "Plan STT"
        verbose_name_plural = "Plan STT"
        db_table = "plan_stt_rate"


class SubLLMRateModel(BaseRateModel):
    sub = models.OneToOneField("sub.SubModel", on_delete=models.CASCADE, related_name="llm_rate")
    session_limit = models.SmallIntegerField(default=0)
    context_limit = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = "Sub LLM"
        verbose_name_plural = "Sub LLM"
        db_table = "sub_llm_rate"


class SubTTSRateModel(BaseRateModel):
    sub = models.OneToOneField("sub.SubModel", on_delete=models.CASCADE, related_name="tts_rate")

    class Meta:
        verbose_name = "Sub TTS"
        verbose_name_plural = "Sub TTS"
        db_table = "sub_tts_rate"


class SubSTTRateModel(BaseRateModel):
    sub = models.OneToOneField("sub.SubModel", on_delete=models.CASCADE, related_name="stt_rate")

    class Meta:
        verbose_name = "Sub STT"
        verbose_name_plural = "Sub STT"
        db_table = "sub_stt_rate"


class UserLLMRateModel(BaseRateModel):
    user = models.OneToOneField("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="llm_rate")
    credit_usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    credit_reset = models.DateTimeField(null=True, blank=True)
    session_limit = models.SmallIntegerField(default=0)
    session_usage = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = "User LLM"
        verbose_name_plural = "User LLM"
        db_table = "user_llm_rate"


class UserLLMContextRateModel(BaseModel):
    session = models.OneToOneField("llm.UserLLMSessionModel", on_delete=models.CASCADE, related_name="user_context_rate")
    context_limit = models.SmallIntegerField(default=0)
    context_usage = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = "User LLM context"
        verbose_name_plural = "User LLM context"
        db_table = "user_llm_context_rate"


class UserTTSRateModel(BaseRateModel):
    user = models.OneToOneField("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="tts_rate")
    credit_usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    credit_reset = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "User TTS"
        verbose_name_plural = "User TTS"
        db_table = "user_tts_rate"


class UserSTTRateModel(BaseRateModel):
    user = models.OneToOneField("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="stt_rate")
    credit_usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    credit_reset = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "User STT"
        verbose_name_plural = "User STT"
        db_table = "user_stt_rate"


class TokenLLMRateModel(BaseRateModel):
    token = models.OneToOneField("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="llm_rate")
    credit_usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    credit_reset = models.DateTimeField(null=True, blank=True)
    session_limit = models.SmallIntegerField(default=0)
    session_usage = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = "Token LLM"
        verbose_name_plural = "Token LLM"
        db_table = "token_llm_rate"

class TokenLLMContextRateModel(BaseModel):
    session = models.OneToOneField("llm.TokenLLMSessionModel", on_delete=models.CASCADE, related_name="token_context_rate")
    context_limit = models.SmallIntegerField(default=0)
    context_usage = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = "Token LLM context"
        verbose_name_plural = "Token LLM context"
        db_table = "token_llm_context_rate"

class TokenTTSRateModel(BaseRateModel):
    token = models.OneToOneField("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="tts_rate")
    credit_usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)],
                                       default=0)
    credit_reset = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Token TTS"
        verbose_name_plural = "Token TTS"
        db_table = "token_tts_rate"


class TokenSTTRateModel(BaseRateModel):
    token = models.OneToOneField("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="stt_rate")
    credit_usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)],
                                       default=0)
    credit_reset = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Token STT"
        verbose_name_plural = "Token STT"
        db_table = "token_stt_rate"
