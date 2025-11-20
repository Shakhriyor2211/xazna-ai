from django.db.models.signals import post_migrate
from django.dispatch import receiver
from plan.models import PlanModel, PlanMonthlyModel, PlanAnnualModel
from rate.models import PlanRateModel, PlanSTTRateModel, PlanTTSRateModel, PlanLLMRateModel, PlanSTTCreditRateModel, \
    PlanTTSCreditRateModel, PlanLLMCreditRateModel


@receiver(post_migrate)
def create_default_plan(sender, **kwargs):
    if sender.name != "plan":
        return

    plan, created = PlanModel.objects.get_or_create(title="Free")

    if created:
        PlanMonthlyModel.objects.create(plan=plan)
        PlanAnnualModel.objects.create(plan=plan)

        rate = PlanRateModel.objects.create(plan=plan)
        stt_rate = PlanSTTRateModel.objects.create(rate=rate)
        tts_rate = PlanTTSRateModel.objects.create(rate=rate)
        llm_rate = PlanLLMRateModel.objects.create(rate=rate)

        PlanSTTCreditRateModel.objects.create(stt=stt_rate)
        PlanTTSCreditRateModel.objects.create(tts=tts_rate)
        PlanLLMCreditRateModel.objects.create(llm=llm_rate)
