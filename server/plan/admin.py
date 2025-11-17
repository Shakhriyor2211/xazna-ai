from django.contrib import admin
from plan.models import PlanModel, PlanMonthlyModel, PlanAnnualModel, PlanSTTRateModel, PlanTTSRateModel, PlanLLMRateModel, \
    PlanSTTCreditRateModel, PlanTTSCreditRateModel, PlanLLMCreditRateModel, PlanRateModel


@admin.register(PlanModel)
class PlanAdmin(admin.ModelAdmin):
    exclude = ("user",)
    list_display = (
        "id",
        "title",
        "llm_session",
        "llm_context",
        "monthly__credit",
        "annual__credit",
        "user",
        "created_at"
    )


    def save_model(self, request, obj, form, change):
        obj.user = request.user
        super().save_model(request, obj, form, change)


@admin.register(PlanMonthlyModel)
class PlanMonthlyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "plan",
        "credit",
        "price",
        "discount"
    )

@admin.register(PlanAnnualModel)
class PlanAnnualAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "plan",
        "credit",
        "price",
        "discount"
    )


@admin.register(PlanRateModel)
class PlanRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "plan",
    )


@admin.register(PlanSTTRateModel)
class STTRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "rate",
    )


@admin.register(PlanTTSRateModel)
class TTSRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "rate",
    )

@admin.register(PlanLLMRateModel)
class LLMRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "rate__plan",
    )

@admin.register(PlanSTTCreditRateModel)
class STTCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "stt",
        "limit",
        "time",
    )


@admin.register(PlanTTSCreditRateModel)
class TTSCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "tts",
        "limit",
        "time",
    )


@admin.register(PlanLLMCreditRateModel)
class LLMCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "llm",
        "limit",
        "time",
    )








