import secrets
from django.contrib import admin
from django.utils.html import format_html
from service.models import ServiceTokenModel, ServiceTokenPermissionModel

@admin.register(ServiceTokenModel)
class ServiceTokenAdmin(admin.ModelAdmin):
    list_display = ("last_symbols", "user", "permission__tts", "permission__stt", "permission__llm", "is_active", "last_used_at", "created_at")
    ordering = ("-created_at",)
    readonly_fields = ("key", "last_symbols", "created_at")

    def save_model(self, request, obj, form, change):
        if not change:
            raw_token = secrets.token_urlsafe(32)
            obj.key = raw_token
            obj.last_symbols = raw_token[-4:]

        super().save_model(request, obj, form, change)


@admin.register(ServiceTokenPermissionModel)
class ServiceTokenPermissionAdmin(admin.ModelAdmin):
    list_display = ("tts", "stt", "llm")


