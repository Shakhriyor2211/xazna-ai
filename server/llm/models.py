import uuid
from django.core.validators import MinValueValidator
from django.db import models
from xazna.models import BaseModel


class LLMSessionModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    is_streaming = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Session"
        verbose_name_plural = "Sessions"
        db_table = "llm_session"
        ordering = ["-created_at"]


class LLMMessageModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    session = models.ForeignKey("LLMSessionModel", on_delete=models.CASCADE, related_name="messages")
    role = models.CharField(max_length=20, choices=[("user", "user"), ("assistant", "assistant")])
    content = models.TextField(default="")
    mdl = models.CharField(max_length=50)

    def __str__(self):
        return self.content

    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
        db_table = "llm_message"



class LLMModelModel(BaseModel):
    title = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)
    credit = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    cash = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)

    class Meta:
        verbose_name = "Model"
        verbose_name_plural = "Models"
        db_table = "llm_model"
        

