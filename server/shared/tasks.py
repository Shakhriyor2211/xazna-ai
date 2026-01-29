from decimal import Decimal
from celery import shared_task
from django.db import transaction
from django.utils import timezone
from datetime import timedelta
from accounts.models import PasswordResetTokenModel
from finance.models import BalanceModel
from plan.models import PlanModel
from rate.models import SubLLMRateModel, SubTTSRateModel, SubSTTRateModel
from sub.models import SubModel
from django.core.management import call_command
import logging

from xazna import settings

logger = logging.getLogger(__name__)

@shared_task
def backup_database():
    try:
        logger.info("Starting automated database backup...")
        call_command('dbbackup', '--clean', '--noinput')
        logger.info("Database backup completed successfully")
        return "Database backup completed"
    except Exception as e:
        logger.error(f"Database backup failed: {e}")
        raise

@shared_task
def backup_media():
    try:
        logger.info("Starting automated media backup...")
        call_command('mediabackup', '--clean', '--noinput')
        logger.info("Media backup completed successfully")
        return "Media backup completed"
    except Exception as e:
        logger.error(f"Media backup failed: {e}")
        raise

@shared_task
def backup_all():
    try:
        logger.info("Starting full backup (database + media)...")
        call_command('dbbackup', '--clean', '--noinput')
        call_command('mediabackup', '--clean', '--noinput')
        logger.info("Full backup completed successfully")
        return "Full backup completed"
    except Exception as e:
        logger.error(f"Full backup failed: {e}")
        raise



@shared_task
def check_subs():
    with transaction.atomic():
        subs = SubModel.objects.filter(status="active", end_date__lt=timezone.now())

        for old_sub in subs:
            old_sub.status = "expired"
            old_sub.save()

            local_now = timezone.localtime(timezone.now())
            midnight = local_now.replace(hour=0, minute=0, second=0, microsecond=0)
            balance = BalanceModel.objects.get(user=old_sub.user)

            plan = PlanModel.objects.get(title=old_sub.title)

            if old_sub.period == "monthly":
                credit = plan.monthly_credit
                discount = plan.monthly_discount
                price = plan.monthly_price * (Decimal(100 - discount) / Decimal(100))

            else:
                credit = plan.annual_credit
                discount = plan.annual_discount
                price = plan.annual_price * (Decimal(100 - discount) / Decimal(100))

            if old_sub.title == "Enterprise" and old_sub.auto_renew and balance.cash >= old_sub.price:
                new_sub = SubModel.objects.create(user=old_sub.user, title=old_sub.title, credit=old_sub.credit,
                                                  period=old_sub.period, start_date=midnight, price=old_sub.price,
                                                  discount=discount, auto_renew=True)
                balance.cash -= old_sub.price
                balance.save()
                SubLLMRateModel.objects.create(sub=new_sub, credit_limit=old_sub.llm_rate.credit_limit,
                                               credit_time=old_sub.llm_rate.credit_time,
                                               session_limit=old_sub.llm_rate.session_limit,
                                               context_limit=old_sub.llm_rate.context_limit)
                SubTTSRateModel.objects.create(sub=new_sub, credit_limit=old_sub.tts_rate.credit_limit,
                                               credit_time=old_sub.tts_rate.credit_time)
                SubSTTRateModel.objects.create(sub=new_sub, credit_limit=old_sub.stt_rate.credit_limit,
                                               credit_time=old_sub.stt_rate.credit_time)

                continue

            elif old_sub.auto_renew and balance.cash >= price:
                new_sub = SubModel.objects.create(user=old_sub.user, title=plan.title, credit=credit,
                                                  period=old_sub.period, start_date=midnight, price=price,
                                                  discount=discount, auto_renew=True)
                balance.cash -= new_sub.price
                balance.save()

            else:
                plan = PlanModel.objects.get(title="Free")
                new_sub = SubModel.objects.create(user=old_sub.user, title="Free", credit=plan.monthly_credit,
                                                  period="monthly", start_date=midnight, price=plan.monthly_price,
                                                  discount=plan.monthly_discount)

            SubLLMRateModel.objects.create(sub=new_sub, credit_limit=plan.llm_rate.credit_limit,
                                           credit_time=plan.llm_rate.credit_time,
                                           session_limit=plan.llm_rate.session_limit,
                                           context_limit=plan.llm_rate.context_limit)
            SubTTSRateModel.objects.create(sub=new_sub, credit_limit=plan.tts_rate.credit_limit,
                                           credit_time=plan.tts_rate.credit_time)
            SubSTTRateModel.objects.create(sub=new_sub, credit_limit=plan.stt_rate.credit_limit,
                                           credit_time=plan.stt_rate.credit_time)



@shared_task
def clean_password_reset_tokens():
    cutoff = timezone.now() - timedelta(minutes=settings.RESET_PASSWORD_EXPIRE_TIME)
    deleted_count, _ = PasswordResetTokenModel.objects.filter(created_at__lt=cutoff).delete()
    logger.info(f"Deleted {deleted_count} expired tokens")

