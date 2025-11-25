import uuid
from django.core.validators import MinValueValidator
from django.db import models
from shared.models import AudioModel
from xazna.models import BaseModel


class UserTTSModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    text = models.CharField()
    user = models.ForeignKey("accounts.CustomUserModel", null=True, blank=True, on_delete=models.SET_NULL)
    audio = models.OneToOneField("shared.AudioModel", null=True, blank=True, on_delete=models.SET_NULL)
    emotion = models.CharField(max_length=50)
    mdl = models.CharField(max_length=50)
    format = models.CharField(max_length=50)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name = "User list"
        verbose_name_plural = "User list"
        db_table = "user_tts"


class TokenTTSModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    text = models.CharField()
    token = models.ForeignKey("service.ServiceTokenModel", null=True, blank=True, on_delete=models.SET_NULL)
    audio = models.OneToOneField("shared.AudioModel", null=True, blank=True, on_delete=models.SET_NULL)
    emotion = models.CharField(max_length=50)
    mdl = models.CharField(max_length=50)
    format = models.CharField(max_length=50)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Token list"
        verbose_name_plural = "Token list"
        db_table = "token_tts"


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



