from django.contrib import admin
from django.utils.html import format_html

from log.models import UserLLMErrorLogModel, ServiceLLMErrorLogModel, ServiceSTTErrorLogModel, UserSTTErrorLogModel, \
    ServiceTTSErrorLogModel, UserTTSErrorLogModel


@admin.register(UserLLMErrorLogModel)
class UserLLMErrorLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "short_message",
        "short_content",
        "user",
        "created_at"
    )

    def short_message(self, obj):
        return (obj.message[:50] + "...") if obj.message is not None and obj.message and len(obj.message) > 50 else obj.message
    short_message.short_description = "Message"

    def short_content(self, obj):
        return (obj.content[:50] + "...") if obj.content is not None and obj.content and len(obj.content) > 50 else obj.content
    short_content.short_description = "Content"



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


@admin.register(UserTTSErrorLogModel)
class UserTTSErrorLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "short_message",
        "short_text",
        "user",
        "created_at"
    )

    def short_message(self, obj):
        return (obj.message[:50] + "...") if obj.message is not None and obj.message and len(obj.message) > 50 else obj.message
    short_message.short_description = "Message"

    def short_text(self, obj):
        return (obj.text[:50] + "...") if obj.text is not None and obj.text and len(obj.text) > 50 else obj.text
    short_text.short_description = "Text"

@admin.register(ServiceLLMErrorLogModel)
class ServiceLLMErrorLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "short_message",
        "short_content",
        "token",
        "created_at"
    )

    def short_message(self, obj):
        return (obj.message[:50] + "...") if obj.message is not None and obj.message and len(obj.message) > 50 else obj.message
    short_message.short_description = "Message"

    def short_content(self, obj):
        return (obj.content[:50] + "...") if obj.content is not None and obj.content and len(obj.content) > 50 else obj.content
    short_content.short_description = "Content"


@admin.register(ServiceSTTErrorLogModel)
class ServiceSTTLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "short_message",
        "audio_link",
        "token",
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



@admin.register(ServiceTTSErrorLogModel)
class ServiceTTSErrorLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "short_message",
        "short_text",
        "token",
        "created_at"
    )

    def short_message(self, obj):
        return (obj.message[:50] + "...") if obj.message is not None and obj.message and len(obj.message) > 50 else obj.message
    short_message.short_description = "Message"

    def short_text(self, obj):
        return (obj.text[:50] + "...") if obj.text is not None and obj.text and len(obj.text) > 50 else obj.text
    short_text.short_description = "Text"





