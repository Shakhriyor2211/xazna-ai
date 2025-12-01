import uuid

from django.utils import timezone
from django.db import models
from xazna.models import BaseModel


class ServiceTokenModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    name = models.CharField(max_length=100)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="token")
    key = models.TextField(unique=True)
    last_symbols = models.CharField(max_length=4, unique=True)
    is_active = models.BooleanField(default=True)
    is_blocked = models.BooleanField(default=False)
    last_used_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.last_symbols

    class Meta:
        verbose_name = "Token"
        verbose_name_plural = "Tokens"
        db_table = "service_token"


class ServiceTokenPermissionModel(BaseModel):
    token = models.OneToOneField("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="permission")
    llm = models.CharField(choices=[("enable", "enable"), ("disable", "disable")], default="disable")
    tts = models.CharField(choices=[("enable", "enable"), ("disable", "disable")], default="disable")
    stt = models.CharField(choices=[("enable", "enable"), ("disable", "disable")], default="disable")
    history = models.CharField(choices=[("read", "read"), ("write", "write"), ("all", "all"), ("disable", "disable")], default="disable")
    monitoring = models.CharField(choices=[("read", "read"), ("write", "write"), ("all", "all"), ("disable", "disable")], default="disable")

    def __str__(self):
        return f"""{self.id}"""

    class Meta:
        verbose_name = "Permission"
        verbose_name_plural = "Permissions"
        db_table = "service_token_permission"
