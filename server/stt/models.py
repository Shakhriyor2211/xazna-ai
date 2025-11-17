import uuid
from django.core.validators import MinValueValidator
from django.db import models
from shared.models import AudioModel
from xazna.models import BaseModel


class STTModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    text = models.CharField(null=True, blank=True)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)
    audio = models.OneToOneField("shared.AudioModel", null=True, blank=True, on_delete=models.SET_NULL)
    mdl = models.CharField(max_length=50)


    class Meta:
        verbose_name = "Data"
        verbose_name_plural = "Data"
        db_table = 'stt_data'


class STTModelModel(BaseModel):
    title = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)
    credit = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)
    cash = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)], default=0)

    class Meta:
        verbose_name = "Model"
        verbose_name_plural = "Models"
        db_table = 'stt_model'


class UserSTTErrorLogModel(BaseModel):
    message = models.TextField()
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="stt_log")
    audio = models.OneToOneField("shared.AudioModel", blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.message

    class Meta:
        verbose_name = "User error log"
        verbose_name_plural = "User error logs"
        db_table = "user_stt_log"



class ServiceSTTErrorLogModel(BaseModel):
    message = models.TextField()
    service = models.ForeignKey("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="stt_log")
    audio = models.OneToOneField("shared.AudioModel", blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.message

    class Meta:
        verbose_name = "Service error log"
        verbose_name_plural = "Service error logs"
        db_table = "service_stt_log"

