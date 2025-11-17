from django.contrib import admin
from .models import LLMSessionModel, LLMMessageModel, LLMModelModel, UserLLMErrorLogModel, ServiceLLMErrorLogModel


@admin.register(LLMModelModel)
class LLMModelAdmin(admin.ModelAdmin):
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


@admin.register(LLMMessageModel)
class LLMMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "session", "role", "short_content", "mdl", "created_at")
    list_filter = ("role", "created_at")
    search_fields = ("content", "session__title", "session__user__email")

    def short_content(self, obj):
        return (obj.content[:50] + "...") if obj.content and len(obj.content) > 50 else obj.content
    short_content.short_description = "Content"



@admin.register(LLMSessionModel)
class LLMSessionAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "title", "context", "context_expense", "created_at", "updated_at")
    list_filter = ("created_at",)
    search_fields = ("title", "user__email", "user__username")



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

@admin.register(ServiceLLMErrorLogModel)
class ServiceLLMErrorLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "short_message",
        "short_content",
        "service",
        "created_at"
    )

    def short_message(self, obj):
        return (obj.message[:50] + "...") if obj.message is not None and obj.message and len(obj.message) > 50 else obj.message
    short_message.short_description = "Message"

    def short_content(self, obj):
        return (obj.content[:50] + "...") if obj.content is not None and obj.content and len(obj.content) > 50 else obj.content
    short_content.short_description = "Content"


