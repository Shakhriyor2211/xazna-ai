from django.contrib import admin
from rate.models import PlanLLMRateModel, PlanTTSRateModel, PlanSTTRateModel, UserLLMRateModel, UserTTSRateModel, \
    UserSTTRateModel, TokenLLMRateModel, TokenTTSRateModel, TokenSTTRateModel, UserLLMContextRateModel, \
    TokenLLMContextRateModel, SubLLMRateModel, SubTTSRateModel, SubSTTRateModel


@admin.register(PlanLLMRateModel)
class PlanLLMRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_time",
        "plan__title",
        "created_at"
    )

@admin.register(PlanTTSRateModel)
class PlanTTSRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_time",
        "plan__title",
        "created_at"
    )

@admin.register(PlanSTTRateModel)
class PlanSTTRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_time",
        "plan__title",
        "created_at"
    )

@admin.register(SubLLMRateModel)
class SubLLMRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_time",
        "sub__title",
        "created_at"
    )

@admin.register(SubTTSRateModel)
class SubTTSRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_time",
        "sub__title",
        "created_at"
    )

@admin.register(SubSTTRateModel)
class SubSTTRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_time",
        "sub__title",
        "created_at"
    )




@admin.register(UserLLMRateModel)
class UserLLMRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_usage",
        "credit_time",
        "credit_reset",
        "user__email",
        "created_at"
    )

@admin.register(UserLLMContextRateModel)
class UserLLMContextRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "context_limit",
        "context_usage",
        "session__title",
        "created_at"
    )


@admin.register(UserTTSRateModel)
class UserTTSRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_usage",
        "credit_time",
        "credit_reset",
        "user__email",
        "created_at"
    )

@admin.register(UserSTTRateModel)
class UserSTTRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_usage",
        "credit_time",
        "credit_reset",
        "user__email",
        "created_at"
    )



@admin.register(TokenLLMRateModel)
class TokenLLMRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_usage",
        "credit_time",
        "credit_reset",
        "token__last_symbols",
        "created_at"
    )

@admin.register(TokenTTSRateModel)
class TokenTTSRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_usage",
        "credit_time",
        "credit_reset",
        "created_at"
    )

@admin.register(TokenSTTRateModel)
class TokenSTTRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit_limit",
        "credit_usage",
        "credit_time",
        "credit_reset",
        "token__last_symbols",
        "created_at"
    )

@admin.register(TokenLLMContextRateModel)
class TokenLLMContextRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "context_limit",
        "context_usage",
        "session__title",
        "created_at"
    )