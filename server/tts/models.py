import uuid
from django.core.validators import MinValueValidator
from django.db import models
from shared.models import AudioModel
from xazna.models import BaseModel


class TTSModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    text = models.CharField()
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)
    audio = models.OneToOneField(AudioModel, null=True, blank=True, on_delete=models.SET_NULL)
    emotion = models.CharField(max_length=50)
    mdl = models.CharField(max_length=50)
    format = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Data"
        verbose_name_plural = "Data"
        db_table = "tts_data"


class TTSEmotionModel(BaseModel):
    title = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Emotions"
        verbose_name_plural = "Emotions"
        db_table = "tts_emotion"



class TTSAudioFormatModel(BaseModel):
    title = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Audio formats"
        verbose_name_plural = "Audio formats"
        db_table = "tts_audio_format"


class TTSModelModel(BaseModel):
    title = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE)
    credit = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)])
    cash = models.DecimalField(max_digits=16, decimal_places=4, validators=[MinValueValidator(0)])

    class Meta:
        verbose_name = "Model"
        verbose_name_plural = "Models"
        db_table = "tts_model"



class UserTTSErrorLogModel(BaseModel):
    message = models.TextField()
    user = models.ForeignKey("accounts.CustomUserModel", on_delete=models.CASCADE, related_name="tts_log")
    text = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.message

    class Meta:
        verbose_name = "User error log"
        verbose_name_plural = "User error logs"
        db_table = "user_tts_log"


class ServiceTTSErrorLogModel(BaseModel):
    message = models.TextField()
    service = models.ForeignKey("service.ServiceTokenModel", on_delete=models.CASCADE, related_name="tts_log")
    text = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.message

    class Meta:
        verbose_name = "Service error log"
        verbose_name_plural = "Service error logs"
        db_table = "service_tts_log"

