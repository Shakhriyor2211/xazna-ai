from django.contrib import admin
from django.utils.html import format_html

from stt.models import STTModel, STTModelModel, ServiceSTTErrorLogModel, UserSTTErrorLogModel


@admin.register(STTModel)
class STTAdmin(admin.ModelAdmin):
    list_display = ("short_text", "audio_link", "user", "created_at")
    ordering = ("-created_at",)

    def short_text(self, obj):
        return (obj.text[:50] + "...") if obj.text and len(obj.text) > 50 else obj.text
    short_text.short_description = "Text"

    def audio_link(self, obj):
        if obj.audio and obj.audio.file:
            return  format_html(
                f"""<a href="{obj.audio.file.url}" target="_blank">{obj.audio.id}</a>"""
            )
        return "-"
    audio_link.short_description = "Audio"


@admin.register(STTModelModel)
class STTModelAdmin(admin.ModelAdmin):
    exclude = ("user",)

    list_display = (
        "title",
        "user",
        "credit",
        "cash",
        "created_at",
    )
    ordering = ("-created_at",)

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        super().save_model(request, obj, form, change)




@admin.register(UserSTTErrorLogModel)
class UserSTTErrorLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "short_message",
        "audio_link",
        "user",
        "created_at"
    )

    def audio_link(self, obj):
        if obj.audio and obj.audio.file:
            return  format_html(
                f"""<a href="{obj.audio.file.url}" target="_blank">{obj.audio.id}</a>"""
            )
        return "-"
    audio_link.short_description = "Audio"

    def short_message(self, obj):
        return (obj.message[:50] + "...") if obj.message is not None and obj.message and len(obj.message) > 50 else obj.message
    short_message.short_description = "Message"


@admin.register(ServiceSTTErrorLogModel)
class ServiceSTTLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "short_message",
        "audio_link",
        "service",
        "created_at"
    )

    def audio_link(self, obj):
        if obj.audio and obj.audio.file:
            return  format_html(
                f"""<a href="{obj.audio.file.url}" target="_blank">{obj.audio.id}</a>"""
            )
        return "-"
    audio_link.short_description = "Audio"

    def short_message(self, obj):
        return (obj.message[:50] + "...") if obj.message is not None and obj.message and len(obj.message) > 50 else obj.message
    short_message.short_description = "Message"




