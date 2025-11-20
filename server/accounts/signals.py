from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import CustomUserModel, PictureModel
from finance.models import BalanceModel
from plan.models import PlanModel
from sub.models import SubModel
from rate.models import UserRateModel, UserSTTRateModel, UserTTSRateModel, UserLLMRateModel, UserSTTCreditRateModel, \
    UserTTSCreditRateModel, UserLLMCreditRateModel

@receiver(post_save, sender=CustomUserModel)
def create_user(sender, instance, created, **kwargs):
    if created:
        BalanceModel.objects.create(user=instance)

        if not hasattr(instance, "picture") or instance.picture is None:
            PictureModel.objects.create(user=instance)

        plan = PlanModel.objects.filter(title="Free").first()

        SubModel.objects.create(user=instance, title=plan.title, credit=plan.monthly.credit,
                                price=plan.monthly.price, discount=plan.monthly.discount,
                                llm_session=plan.llm_session, llm_context=plan.llm_context)

        rate = UserRateModel.objects.create(user=instance)
        stt_rate = UserSTTRateModel.objects.create(rate=rate)
        tts_rate = UserTTSRateModel.objects.create(rate=rate)
        llm_rate = UserLLMRateModel.objects.create(rate=rate)

        UserSTTCreditRateModel.objects.create(
            stt=stt_rate,
            limit=plan.rate.stt.credit.limit,
            time=plan.rate.stt.credit.time
        )

        UserTTSCreditRateModel.objects.create(
            tts=tts_rate,
            limit=plan.rate.tts.credit.limit,
            time=plan.rate.tts.credit.time
        )

        UserLLMCreditRateModel.objects.create(
            llm=llm_rate,
            limit=plan.rate.llm.credit.limit,
            time=plan.rate.llm.credit.time
        )
