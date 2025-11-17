from django.contrib import admin
from subscription.models import SubscriptionModel, SubRateModel, SubSTTRateModel, SubTTSRateModel, SubLLMRateModel, \
    SubSTTCreditRateModel, SubTTSCreditRateModel, SubLLMCreditRateModel


@admin.register(SubscriptionModel)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "credit",
        "credit_expense",
        "llm_session",
        "llm_context",
        "status",
        "auto_renew",
        "user",
        "rate__tts__credit__limit",
        "rate__tts__credit__usage",
        "rate__stt__credit__limit",
        "rate__stt__credit__usage",
        "rate__llm__credit__limit",
        "rate__llm__credit__usage",
        "start_date",
        "end_date"
    )



    @admin.register(SubRateModel)
    class SubRateAdmin(admin.ModelAdmin):
        list_display = (
            "id",
            "subscription",
        )

    @admin.register(SubSTTRateModel)
    class STTRateAdmin(admin.ModelAdmin):
        list_display = (
            "id",
            "rate",
        )

    @admin.register(SubTTSRateModel)
    class TTSRateAdmin(admin.ModelAdmin):
        list_display = (
            "id",
            "rate",
        )

    @admin.register(SubLLMRateModel)
    class LLMRateAdmin(admin.ModelAdmin):
        list_display = (
            "id",
            "rate__subscription"
        )

    @admin.register(SubSTTCreditRateModel)
    class STTCreditRateAdmin(admin.ModelAdmin):
        list_display = (
            "id",
            "stt",
            "limit",
            "usage",
            "time",
        )

    @admin.register(SubTTSCreditRateModel)
    class TTSCreditRateAdmin(admin.ModelAdmin):
        list_display = (
            "id",
            "tts",
            "limit",
            "usage",
            "time",
        )

    @admin.register(SubLLMCreditRateModel)
    class LLMCreditRateAdmin(admin.ModelAdmin):
        list_display = (
            "id",
            "llm",
            "limit",
            "usage",
            "time",
        )



