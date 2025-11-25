import uuid
from django.core.validators import MinValueValidator
from django.db import models
from xazna.models import BaseModel


class UserLLMSessionModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    user = models.ForeignKey("accounts.CustomUserModel", null=True, blank=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=255)
    is_streaming = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "User session"
        verbose_name_plural = "User sessions"
        db_table = "user_llm_session"
        ordering = ["-created_at"]

class TokenLLMSessionModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    token = models.ForeignKey("service.ServiceTokenModel", null=True, blank=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=255)
    is_streaming = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Token session"
        verbose_name_plural = "Token sessions"
        db_table = "token_llm_session"
        ordering = ["-created_at"]


class UserLLMMessageModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    session = models.ForeignKey("UserLLMSessionModel", null=True, blank=True, on_delete=models.SET_NULL, related_name="messages")
    role = models.CharField(max_length=20, choices=[("user", "user"), ("assistant", "assistant")])
    content = models.TextField(default="")
    mdl = models.CharField(max_length=50)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.content

    class Meta:
        verbose_name = "User message"
        verbose_name_plural = "User messages"
        db_table = "user_llm_message"


class TokenLLMMessageModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    session = models.ForeignKey("TokenLLMSessionModel", null=True, blank=True, on_delete=models.SET_NULL, related_name="messages")
    role = models.CharField(max_length=20, choices=[("user", "user"), ("assistant", "assistant")])
    content = models.TextField(default="")
    mdl = models.CharField(max_length=50)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.content

    class Meta:
        verbose_name = "Token message"
        verbose_name_plural = "Token messages"
        db_table = "token_llm_message"


class LLMModelModel(BaseModel):
    title = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)
    credit = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    cash = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)

    class Meta:
        verbose_name = "Model"
        verbose_name_plural = "Models"
        db_table = "llm_model"
        

