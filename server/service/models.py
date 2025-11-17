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
    token = models.OneToOneField("service.ServiceTokenModel", on_delete=models.CASCADE)
    tts = models.BooleanField(default=False)
    stt = models.BooleanField(default=False)
    llm = models.BooleanField(default=False)

    def __str__(self):
        return self.token

    class Meta:
        verbose_name = "Token permission"
        verbose_name_plural = "Token permissions"
        db_table = "service_token_permission"