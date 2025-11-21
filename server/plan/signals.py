from django.db.models.signals import post_migrate
from django.dispatch import receiver
from plan.models import PlanModel
from rate.models import PlanSTTRateModel, PlanTTSRateModel, PlanLLMRateModel


@receiver(post_migrate)
def create_default_plan(sender, **kwargs):
    if sender.name != "plan":
        return

    plan, created = PlanModel.objects.get_or_create(title="Free")

    if created:
        PlanSTTRateModel.objects.create(plan=plan)
        PlanTTSRateModel.objects.create(plan=plan)
        PlanLLMRateModel.objects.create(plan=plan)

