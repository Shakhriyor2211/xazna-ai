from django.contrib import admin
from .models import LLMSessionModel, LLMMessageModel, LLMModelModel


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



