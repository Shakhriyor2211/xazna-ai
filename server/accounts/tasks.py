from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from accounts.models import EmailConfirmOtpModel, PasswordResetTokenModel
from xazna import settings
from django.utils import translation
from django.utils.translation import gettext_lazy as _


@shared_task
def send_email_confirmation(email_id, locale):
    translation.activate(locale)
    email_otp = EmailConfirmOtpModel.objects.get(id=email_id)
    subject = _("Confirmation code")
    from_email = f"""no-reply <{settings.EMAIL_HOST_USER}>"""
    to = [email_otp.user.email]


    html_content = render_to_string("email/confirmation.html", {"code": email_otp.code})

    msg = EmailMultiAlternatives(subject=subject, from_email=from_email,to=to)
    msg.attach_alternative(html_content, "text/html")
    msg.send()
    email_otp.status = "sent"
    email_otp.save()



@shared_task
def send_email_reset_password(token_id, target, locale):
    translation.activate(locale)
    t = PasswordResetTokenModel.objects.get(id=token_id)
    subject = _("Reset password")
    from_email = f"""no-reply <{settings.EMAIL_HOST_USER}>"""
    to = [t.user.email]

    html_content = render_to_string("password/reset.html", {"target": f"""{target.rstrip("/")}/{t.slug}"""})

    msg = EmailMultiAlternatives(subject=subject, from_email=from_email, to=to)
    msg.attach_alternative(html_content, "text/html")
    msg.send()
    t.status = "sent"
    t.save()


