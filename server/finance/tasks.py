from decimal import Decimal
from celery import shared_task
from django.utils import timezone
from django.db import transaction
from finance.models import BalanceModel
from plan.models import PlanModel
from rate.models import SubLLMRateModel, SubTTSRateModel, SubSTTRateModel
from sub.models import SubModel



@shared_task
def check_subs():
    with transaction.atomic():
        subs = SubModel.objects.filter(status="active", end_date__lt=timezone.now())

        for sub in subs:
            sub.status = "expired"
            sub.save()

            local_now = timezone.localtime(timezone.now())
            midnight = local_now.replace(hour=0, minute=0, second=0, microsecond=0)
            balance = BalanceModel.objects.get(user=sub.user)

            plan = PlanModel.objects.get(title=sub.title)

            if sub.period == "monthly":
                credit = plan.monthly_credit
                discount = plan.monthly_discount
                price = plan.monthly_price * (Decimal(100 - discount) / Decimal(100))

            else:
                credit = plan.annual_credit
                discount = plan.annual_discount
                price = plan.annual_price * (Decimal(100 - discount) / Decimal(100))

            if sub.auto_renew and balance.cash >= price:
                sub = SubModel.objects.create(user=sub.user, title=plan.title, credit=credit,
                                              period=sub.period, start_date=midnight, price=price,
                                              discount=discount, auto_renew=sub.auto_renew)
                balance.cash -= sub.price
                balance.save()


            else:
                plan = PlanModel.objects.get(title="Free")
                sub = SubModel.objects.create(user=sub.user, title="Free", credit=plan.monthly_credit,
                                              period="monthly", start_date=midnight, price=plan.monthly_price,
                                              discount=plan.monthly_discount)

            SubLLMRateModel.objects.create(sub=sub, credit_limit=plan.llm_rate.credit_limit,
                                           credit_time=plan.llm_rate.credit_time,
                                           session_limit=plan.llm_rate.session_limit,
                                           context_limit=plan.llm_rate.context_limit)
            SubTTSRateModel.objects.create(sub=sub, credit_limit=plan.tts_rate.credit_limit,
                                           credit_time=plan.tts_rate.credit_time)
            SubSTTRateModel.objects.create(sub=sub, credit_limit=plan.stt_rate.credit_limit,
                                           credit_time=plan.stt_rate.credit_time)

