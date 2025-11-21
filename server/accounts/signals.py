from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import CustomUserModel, PictureModel
from finance.models import BalanceModel
from plan.models import PlanModel
from sub.models import SubModel
from rate.models import UserSTTRateModel, UserTTSRateModel, UserLLMRateModel, SubLLMRateModel, SubTTSRateModel, \
    SubSTTRateModel


@receiver(post_save, sender=CustomUserModel)
def create_user(sender, instance, created, **kwargs):
    if created:
        BalanceModel.objects.create(user=instance)

        if not hasattr(instance, "picture") or instance.picture is None:
            PictureModel.objects.create(user=instance)

        plan = PlanModel.objects.filter(title="Free").first()

        sub = SubModel.objects.create(user=instance, title=plan.title, credit=plan.monthly_credit,
                                      price=plan.monthly_price, discount=plan.monthly_discount)

        SubLLMRateModel.objects.create(sub=sub, credit_limit=plan.llm_rate.credit_limit,
                                        credit_time=plan.llm_rate.credit_time,
                                        session_limit=plan.llm_rate.session_limit,
                                        context_limit=plan.llm_rate.context_limit)
        SubTTSRateModel.objects.create(sub=sub, credit_limit=plan.tts_rate.credit_limit,
                                       credit_time=plan.tts_rate.credit_time)
        SubSTTRateModel.objects.create(sub=sub, credit_limit=plan.stt_rate.credit_limit,
                                       credit_time=plan.stt_rate.credit_time)

        UserLLMRateModel.objects.create(user=instance, credit_limit=plan.llm_rate.credit_limit,
                                        credit_time=plan.llm_rate.credit_time,
                                        session_limit=plan.llm_rate.session_limit)
        UserTTSRateModel.objects.create(user=instance, credit_limit=plan.tts_rate.credit_limit,
                                        credit_time=plan.tts_rate.credit_time)
        UserSTTRateModel.objects.create(user=instance, credit_limit=plan.stt_rate.credit_limit,
                                        credit_time=plan.stt_rate.credit_time)
