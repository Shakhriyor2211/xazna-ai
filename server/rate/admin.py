from django.contrib import admin
from rate.models import UserRateModel, UserLLMRateModel, UserTTSRateModel, UserLLMCreditRateModel, \
    UserTTSCreditRateModel, UserSTTCreditRateModel, UserSTTRateModel, PlanRateModel, PlanLLMRateModel, PlanTTSRateModel, \
    PlanSTTRateModel, PlanLLMCreditRateModel, PlanTTSCreditRateModel, PlanSTTCreditRateModel, TokenRateModel, \
    TokenLLMRateModel, TokenTTSRateModel, TokenSTTRateModel, TokenLLMCreditRateModel, TokenTTSCreditRateModel, \
    TokenSTTCreditRateModel


@admin.register(PlanRateModel)
class PlanRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "plan__title",
        "created_at"
    )


@admin.register(PlanLLMRateModel)
class PlanLLMRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit__limit",
        "credit__time",
        "created_at"
    )

@admin.register(PlanTTSRateModel)
class PlanTTSRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit__limit",
        "credit__time",
        "created_at"
    )

@admin.register(PlanSTTRateModel)
class PlanSTTRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit__limit",
        "credit__time",
        "created_at"
    )



@admin.register(PlanLLMCreditRateModel)
class PlanLLMCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "limit",
        "time",
        "created_at"
    )

@admin.register(PlanTTSCreditRateModel)
class PlanTTSCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "limit",
        "time",
        "created_at"
    )

@admin.register(PlanSTTCreditRateModel)
class PlanSTTCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "limit",
        "time",
        "created_at"
    )


@admin.register(UserRateModel)
class UserRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user__email",
        "created_at"
    )


@admin.register(UserLLMRateModel)
class UserLLMRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit__limit",
        "credit__usage",
        "credit__time",
        "credit__reset",
        "created_at"
    )

@admin.register(UserTTSRateModel)
class UserTTSRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit__limit",
        "credit__usage",
        "credit__time",
        "credit__reset",
        "created_at"
    )

@admin.register(UserSTTRateModel)
class UserSTTRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit__limit",
        "credit__usage",
        "credit__time",
        "credit__reset",
        "created_at"
    )



@admin.register(UserLLMCreditRateModel)
class UserLLMCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "limit",
        "usage",
        "time",
        "reset",
        "created_at"
    )

@admin.register(UserTTSCreditRateModel)
class UserTTSCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "limit",
        "usage",
        "time",
        "reset",
        "created_at"
    )

@admin.register(UserSTTCreditRateModel)
class UserSTTCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "limit",
        "usage",
        "time",
        "reset",
        "created_at"
    )


@admin.register(TokenRateModel)
class TokenRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "token__last_symbols",
        "created_at"
    )


@admin.register(TokenLLMRateModel)
class TokenLLMRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit__limit",
        "credit__usage",
        "credit__time",
        "credit__reset",
        "created_at"
    )

@admin.register(TokenTTSRateModel)
class TokenTTSRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit__limit",
        "credit__usage",
        "credit__time",
        "credit__reset",
        "created_at"
    )

@admin.register(TokenSTTRateModel)
class TokenSTTRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "credit__limit",
        "credit__usage",
        "credit__time",
        "credit__reset",
        "created_at"
    )



@admin.register(TokenLLMCreditRateModel)
class TokenLLMCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "limit",
        "usage",
        "time",
        "reset",
        "created_at"
    )

@admin.register(TokenTTSCreditRateModel)
class TokenTTSCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "limit",
        "usage",
        "time",
        "reset",
        "created_at"
    )

@admin.register(TokenSTTCreditRateModel)
class TokenSTTCreditRateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "limit",
        "usage",
        "time",
        "reset",
        "created_at"
    )







