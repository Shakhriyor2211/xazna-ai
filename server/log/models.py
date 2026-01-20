from xazna.models import BaseModel
from django.db import models


class BillingErrorLogModel(BaseModel):
    message = models.TextField()
    code = models.SmallIntegerField(default=0)
    method = models.CharField(choices=[("info", "info"), ("pay", "pay"), ("check", "check")])
    invoice = models.CharField(max_length=20, null=True, blank=True)
    transaction_id = models.CharField(blank=True, null=True)

    class Meta:
        verbose_name = "Billing"
        verbose_name_plural = "Billings"
        db_table = "billing_log"


class UserLLMErrorLogModel(BaseModel):
    message = models.TextField()
    content = models.TextField(blank=True, null=True)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="llm_log")



    class Meta:
        verbose_name = "User llm"
        verbose_name_plural = "User llm"
        db_table = "user_llm_log"


class UserTTSErrorLogModel(BaseModel):
    message = models.TextField()
    text = models.TextField(blank=True, null=True)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="tts_log")



    class Meta:
        verbose_name = "User tts"
        verbose_name_plural = "User tts"
        db_table = "user_tts_log"


class UserSTTErrorLogModel(BaseModel):
    message = models.TextField()
    audio = models.OneToOneField("shared.AudioModel", blank=True, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="stt_log")


    class Meta:
        verbose_name = "User stt"
        verbose_name_plural = "User stt"
        db_table = "user_stt_log"



class TokenLLMErrorLogModel(BaseModel):
    message = models.TextField()
    content = models.TextField(blank=True, null=True)
    token = models.ForeignKey("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="llm_log")


    class Meta:
        verbose_name = "Token llm"
        verbose_name_plural = "Token llm"
        db_table = "token_llm_log"


class TokenTTSErrorLogModel(BaseModel):
    message = models.TextField()
    text = models.TextField(blank=True, null=True)
    token = models.ForeignKey("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="tts_log")


    class Meta:
        verbose_name = "Token tts"
        verbose_name_plural = "Token tts"
        db_table = "token_tts_log"


class TokenSTTErrorLogModel(BaseModel):
    message = models.TextField()
    audio = models.OneToOneField("shared.AudioModel", blank=True, null=True, on_delete=models.SET_NULL)
    token = models.ForeignKey("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="stt_log")


    class Meta:
        verbose_name = "Token stt"
        verbose_name_plural = "Token stt"
        db_table = "token_stt_log"




