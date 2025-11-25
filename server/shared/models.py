import os
import uuid
from django.db import models
from xazna.models import BaseModel


class AudioModel(BaseModel):
    id = models.UUIDField(
        max_length=36,
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    user = models.ForeignKey("accounts.CustomUserModel", null=True, blank=True, on_delete=models.SET_NULL)
    file = models.FileField(upload_to="audio/")
    name = models.CharField()

    def save(self, *args, **kwargs):
        ext = os.path.splitext(self.file.name)[1]
        if not self.name:
            self.name = self.file.name

        self.file.name = f"{uuid.uuid4()}{ext}"

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Audio"
        verbose_name_plural = "Audios"
        db_table = "audio"



