from django.db.models.signals import post_save
from django.dispatch import receiver

from rate.models import TokenLLMRateModel, TokenTTSRateModel, TokenSTTRateModel
from service.models import ServiceTokenPermissionModel, ServiceTokenModel
from sub.models import SubModel


@receiver(post_save, sender=ServiceTokenModel)
def create_token(sender, instance, created, **kwargs):
    if created:
        ServiceTokenPermissionModel.objects.create(token=instance)

        sub = SubModel.objects.filter(user=instance.user, status="active").first()


        TokenLLMRateModel.objects.create(token=instance, credit_limit=sub.llm_rate.credit_limit,
                                        credit_time=sub.llm_rate.credit_time,
                                        session_limit=sub.llm_rate.session_limit)
        TokenTTSRateModel.objects.create(token=instance, credit_limit=sub.tts_rate.credit_limit,
                                        credit_time=sub.tts_rate.credit_time)
        TokenSTTRateModel.objects.create(token=instance, credit_limit=sub.stt_rate.credit_limit,
                                        credit_time=sub.stt_rate.credit_time)
