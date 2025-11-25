from xazna.models import BaseModel
from django.db import models

class UserLLMErrorLogModel(BaseModel):
    message = models.TextField()
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="llm_log")
    content = models.TextField(blank=True, null=True)



    class Meta:
        verbose_name = "User llm"
        verbose_name_plural = "User llm"
        db_table = "user_llm_log"


class UserTTSErrorLogModel(BaseModel):
    message = models.TextField()
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="tts_log")
    text = models.TextField(blank=True, null=True)



    class Meta:
        verbose_name = "User tts"
        verbose_name_plural = "User tts"
        db_table = "user_tts_log"


class UserSTTErrorLogModel(BaseModel):
    message = models.TextField()
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="stt_log")
    audio = models.OneToOneField("shared.AudioModel", blank=True, null=True, on_delete=models.SET_NULL)


    class Meta:
        verbose_name = "User stt"
        verbose_name_plural = "User stt"
        db_table = "user_stt_log"



class TokenLLMErrorLogModel(BaseModel):
    message = models.TextField()
    token = models.ForeignKey("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="llm_log")
    content = models.TextField(blank=True, null=True)


    class Meta:
        verbose_name = "Token llm"
        verbose_name_plural = "Token llm"
        db_table = "token_llm_log"


class TokenTTSErrorLogModel(BaseModel):
    message = models.TextField()
    token = models.ForeignKey("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="tts_log")
    text = models.TextField(blank=True, null=True)


    class Meta:
        verbose_name = "Token tts"
        verbose_name_plural = "Token tts"
        db_table = "token_tts_log"


class TokenSTTErrorLogModel(BaseModel):
    message = models.TextField()
    token = models.ForeignKey("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="stt_log")
    audio = models.OneToOneField("shared.AudioModel", blank=True, null=True, on_delete=models.SET_NULL)


    class Meta:
        verbose_name = "Token stt"
        verbose_name_plural = "Token stt"
        db_table = "token_stt_log"

