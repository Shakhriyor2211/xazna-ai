import secrets
from django.contrib import admin
from django.utils.html import format_html

from service.models import ServiceTokenModel, ServiceTokenPermissionModel, ServiceTTSModel, ServiceLLMMessageModel, \
    ServiceLLMSessionModel, ServiceSTTModel


@admin.register(ServiceTokenModel)
class ServiceTokenAdmin(admin.ModelAdmin):
    list_display = ("last_symbols", "user", "permission__tts", "permission__stt", "permission__llm", "is_active", "last_used_at", "created_at")
    ordering = ("-created_at",)

    readonly_fields = ("key", "last_symbols", "created_at")

    def save_model(self, request, obj, form, change):
        if not change:
            raw_token = secrets.token_urlsafe(32)
            # obj.key = encrypt_token(raw_token)
            obj.key = raw_token
            obj.last_symbols = raw_token[-4:]

        super().save_model(request, obj, form, change)


@admin.register(ServiceTokenPermissionModel)
class ServiceTokenPermissionAdmin(admin.ModelAdmin):
    list_display = ("tts", "stt", "llm")


@admin.register(ServiceLLMMessageModel)
class ServiceLLMMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "session", "role", "short_content", "mdl", "created_at")
    list_filter = ("role", "created_at")
    search_fields = ("content", "session__title",)

    def short_content(self, obj):
        return (obj.content[:50] + "...") if obj.content and len(obj.content) > 50 else obj.content
    short_content.short_description = "Content"



@admin.register(ServiceLLMSessionModel)
class ServiceLLMSessionAdmin(admin.ModelAdmin):
    list_display = ("id", "token", "context", "context_expense", "created_at", "updated_at")
    list_filter = ("created_at",)


@admin.register(ServiceSTTModel)
class ServiceSTTAdmin(admin.ModelAdmin):
    list_display = ("short_text", "audio_link", "token", "created_at")
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


@admin.register(ServiceTTSModel)
class TTSAdmin(admin.ModelAdmin):
    list_display = (
        "short_text",
        "audio_link",
        "token",
        "created_at"
    )
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
