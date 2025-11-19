import uuid
from django.db import models
from xazna.models import BaseModel


class ServiceTokenModel(BaseModel):
    name = models.CharField(max_length=100)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="token")
    key = models.TextField(unique=True)
    last_symbols = models.CharField(max_length=4, unique=True)
    is_active = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    last_used_at = models.DateTimeField(null=True, blank=True)


    def __str__(self):
        return self.last_symbols

    class Meta:
        verbose_name = "Token"
        verbose_name_plural = "Tokens"
        db_table = "service_token"
        

class ServiceTokenPermissionModel(BaseModel):
    token = models.OneToOneField("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="permission")
    tts = models.BooleanField(default=False)
    stt = models.BooleanField(default=False)
    llm = models.BooleanField(default=False)

    def __str__(self):
        return f"""{self.id}"""

    class Meta:
        verbose_name = "Permission"
        verbose_name_plural = "Permissions"
        db_table = "service_token_permission"




class ServiceLLMSessionModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    token = models.ForeignKey("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="session")
    context = models.PositiveIntegerField(default=0)
    context_expense = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Session"
        verbose_name_plural = "Sessions"
        db_table = "service_llm_session"
        ordering = ["-created_at"]


class ServiceLLMMessageModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    session = models.ForeignKey("service.ServiceLLMSessionModel", null=True, blank=True, on_delete=models.SET_NULL, related_name="messages")
    role = models.CharField(max_length=20, choices=[("user", "user"), ("assistant", "assistant")])
    content = models.TextField(default="")
    mdl = models.CharField(max_length=50)

    def __str__(self):
        return self.content

    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
        db_table = "service_llm_message"



class ServiceTTSModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    text = models.CharField()
    token = models.ForeignKey("service.ServiceTokenModel", null=True, blank=True, on_delete=models.SET_NULL, related_name="tts")
    audio = models.OneToOneField("shared.AudioModel", null=True, blank=True, on_delete=models.SET_NULL,  related_name="service_tts")
    emotion = models.CharField(max_length=50)
    mdl = models.CharField(max_length=50)
    format = models.CharField(max_length=50)

    class Meta:
        verbose_name = "TTS"
        verbose_name_plural = "TTS"
        db_table = 'service_tts_data'


class ServiceSTTModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    text = models.CharField(null=True, blank=True)
    token = models.ForeignKey("service.ServiceTokenModel", null=True, blank=True, on_delete=models.SET_NULL, related_name="stt")
    audio = models.OneToOneField("shared.AudioModel", null=True, blank=True, on_delete=models.SET_NULL, related_name="service_stt")
    mdl = models.CharField(max_length=50)

    class Meta:
        verbose_name = "STT"
        verbose_name_plural = "STT"
        db_table = 'service_stt_data'
