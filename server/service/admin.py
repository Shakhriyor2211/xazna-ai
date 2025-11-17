import secrets
from django.contrib import admin
from service.models import ServiceTokenModel
from shared.utils import encrypt_token


@admin.register(ServiceTokenModel)
class ServiceTokenAdmin(admin.ModelAdmin):
    list_display = ("last_symbols", "user", "created_at", "is_active", "last_used_at")
    ordering = ("-created_at",)

    readonly_fields = ("key", "last_symbols", "created_at")

    def save_model(self, request, obj, form, change):
        if not change:
            raw_token = secrets.token_urlsafe(32)
            obj.key = encrypt_token(raw_token)
            obj.last_symbols = raw_token[-4:]

            self.message_user(request, f"""Token generated: {obj.last_symbols}""")

        super().save_model(request, obj, form, change)
