from django.core.validators import MinValueValidator
from django.db import models
from xazna.models import BaseModel


class PlanRateModel(BaseModel):
    plan = models.OneToOneField("plan.PlanModel", on_delete=models.CASCADE, related_name="rate")

    class Meta:
        verbose_name = "Plan"
        verbose_name_plural = "Plan"
        db_table = "plan_rate"



class PlanSTTRateModel(BaseModel):
    rate = models.OneToOneField("PlanRateModel", on_delete=models.CASCADE, related_name="stt")

    class Meta:
        verbose_name = "Plan STT"
        verbose_name_plural = "Plan STT"
        db_table = "plan_stt_rate"



class PlanTTSRateModel(BaseModel):
    rate = models.OneToOneField("PlanRateModel", on_delete=models.CASCADE, related_name="tts")

    class Meta:
        verbose_name = "Plan TTS"
        verbose_name_plural = "Plan TTS"
        db_table = "plan_tts_rate"



class PlanLLMRateModel(BaseModel):
    rate = models.OneToOneField("PlanRateModel", on_delete=models.CASCADE, related_name="llm")

    class Meta:
        verbose_name = "Plan LLM"
        verbose_name_plural = "Plan LLM"
        db_table = "plan_llm_rate"


class PlanSTTCreditRateModel(BaseModel):
    stt = models.OneToOneField("PlanSTTRateModel", on_delete=models.CASCADE, related_name="credit")
    limit = models.DecimalField(max_digits=16, decimal_places=4,
                                validators=[MinValueValidator(0)], default=0)
    time = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Plan STT credit"
        verbose_name_plural = "Plan STT credits"
        db_table = "plan_stt_credit_rate"



class PlanTTSCreditRateModel(BaseModel):
    tts = models.OneToOneField("PlanTTSRateModel", on_delete=models.CASCADE, related_name="credit")
    limit = models.DecimalField(max_digits=16, decimal_places=4,
                                validators=[MinValueValidator(0)], default=0)
    time = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Plan TTS credit"
        verbose_name_plural = "Plan TTS credits"
        db_table = "plan_tts_credit_rate"


class PlanLLMCreditRateModel(BaseModel):
    llm = models.OneToOneField("PlanLLMRateModel", on_delete=models.CASCADE, related_name="credit")
    limit = models.DecimalField(max_digits=16, decimal_places=4,
                                validators=[MinValueValidator(0)], default=0)
    time = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Plan LLM credit"
        verbose_name_plural = "Plan LLM credits"
        db_table = "plan_llm_credit_rate"




class UserRateModel(BaseModel):
    user = models.OneToOneField("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="rate")

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "User"
        db_table = "user_rate"


class UserSTTRateModel(BaseModel):
    rate = models.OneToOneField("UserRateModel", on_delete=models.CASCADE, related_name="stt")

    class Meta:
        verbose_name = "User STT"
        verbose_name_plural = "User STT"
        db_table = "user_stt_rate"



class UserTTSRateModel(BaseModel):
    rate = models.OneToOneField("UserRateModel", on_delete=models.CASCADE, related_name="tts")

    class Meta:
        verbose_name = "User TTS"
        verbose_name_plural = "User TTS"
        db_table = "user_tts_rate"



class UserLLMRateModel(BaseModel):
    rate = models.OneToOneField("UserRateModel", on_delete=models.CASCADE, related_name="llm")

    class Meta:
        verbose_name = "User LLM"
        verbose_name_plural = "User LLM"
        db_table = "user_llm_rate"



class UserSTTCreditRateModel(BaseModel):
    stt = models.OneToOneField("UserSTTRateModel", on_delete=models.CASCADE, related_name="credit")
    limit = models.DecimalField(max_digits=16, decimal_places=4,
                                validators=[MinValueValidator(0)], default=0)
    time = models.PositiveIntegerField(default=0)
    usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    reset = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "User STT credit"
        verbose_name_plural = "User STT credits"
        db_table = "user_stt_credit_rate"


class UserTTSCreditRateModel(BaseModel):
    tts = models.OneToOneField("UserTTSRateModel", on_delete=models.CASCADE, related_name="credit")
    limit = models.DecimalField(max_digits=16, decimal_places=4,
                                validators=[MinValueValidator(0)], default=0)
    time = models.PositiveIntegerField(default=0)
    usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    reset = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "User TTS credit"
        verbose_name_plural = "User TTS credits"
        db_table = "user_tts_credit_rate"


class UserLLMCreditRateModel(BaseModel):
    llm = models.OneToOneField("UserLLMRateModel", on_delete=models.CASCADE, related_name="credit")
    limit = models.DecimalField(max_digits=16, decimal_places=4,
                                validators=[MinValueValidator(0)], default=0)
    time = models.PositiveIntegerField(default=0)
    usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    reset = models.DateTimeField(null=True, blank=True)


    class Meta:
        verbose_name = "User LLM credit"
        verbose_name_plural = "User LLM credits"
        db_table = "user_llm_credit_rate"



class TokenRateModel(BaseModel):
    token = models.OneToOneField("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="rate")

    class Meta:
        verbose_name = "Token"
        verbose_name_plural = "Token"
        db_table = "token_rate"


class TokenSTTRateModel(BaseModel):
    rate = models.OneToOneField("TokenRateModel", on_delete=models.CASCADE, related_name="stt")

    class Meta:
        verbose_name = "Token STT"
        verbose_name_plural = "Token STT"
        db_table = "token_stt_rate"


class TokenTTSRateModel(BaseModel):
    rate = models.OneToOneField("TokenRateModel", on_delete=models.CASCADE, related_name="tts")

    class Meta:
        verbose_name = "Token TTS"
        verbose_name_plural = "Token TTS"
        db_table = "token_tts_rate"


class TokenLLMRateModel(BaseModel):
    rate = models.OneToOneField("TokenRateModel", on_delete=models.CASCADE, related_name="llm")

    class Meta:
        verbose_name = "Token LLM"
        verbose_name_plural = "Token LLM"
        db_table = "token_llm_rate"



class TokenSTTCreditRateModel(BaseModel):
    stt = models.OneToOneField("TokenSTTRateModel", on_delete=models.CASCADE, related_name="credit")
    limit = models.DecimalField(max_digits=16, decimal_places=4,
                                validators=[MinValueValidator(0)], default=0)
    time = models.PositiveIntegerField(default=0)
    usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    reset = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Token Stt credit"
        verbose_name_plural = "Token STT credits"
        db_table = "token_stt_credit_rate"


class TokenTTSCreditRateModel(BaseModel):
    tts = models.OneToOneField("TokenTTSRateModel", on_delete=models.CASCADE, related_name="credit")
    limit = models.DecimalField(max_digits=16, decimal_places=4,
                                validators=[MinValueValidator(0)], default=0)
    time = models.PositiveIntegerField(default=0)
    usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    reset = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Token TTS credit"
        verbose_name_plural = "Token TTS credits"
        db_table = "token_tts_credit_rate"


class TokenLLMCreditRateModel(BaseModel):
    llm = models.OneToOneField("TokenLLMRateModel", on_delete=models.CASCADE, related_name="credit")
    limit = models.DecimalField(max_digits=16, decimal_places=4,
                                validators=[MinValueValidator(0)], default=0)
    time = models.PositiveIntegerField(default=0)
    usage = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    reset = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "Token LLM credits"
        verbose_name_plural = "Token LLM credits"
        db_table = "token_llm_credit_rate"
