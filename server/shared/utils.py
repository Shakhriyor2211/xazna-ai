import math
import re
from io import BytesIO
import secrets
from datetime import timedelta
from django.utils import timezone
import httpx
from django.core.files import File
from pydub import AudioSegment

from llm.models import LLMModelModel
from stt.models import STTModelModel
from tts.models import TTSModelModel
from xazna import settings
from cryptography.fernet import Fernet
from django.conf import settings

from xazna.exceptions import CustomException


async def send_post_request(payload, url, request_type="json"):
    async with httpx.AsyncClient(timeout=None) as client:
        if request_type == "json":
            response = await client.post(url, json=payload, timeout=None)
            return response

        else:
            files = {"file": (payload.name, payload, payload.content_type)}
            response = await client.post(url, files=files)
            return response


def generate_audio(chunks, fmt):
    audio_segment = AudioSegment(chunks.tobytes(), frame_rate=24000, sample_width=2, channels=1)
    buffer = BytesIO()
    audio_segment.export(buffer, format=fmt)
    buffer.seek(0)
    return File(buffer, name=f"""audio.{fmt}""")


def get_audio_duration(file):
    audio = AudioSegment.from_file(file)
    return len(audio) / 1000


def text_decode(match):
    letters = {
        "Ğ": "G'",
        "ğ": "g'",
        "Õ": "O'",
        "õ": "o'",
        "Ş": "Sh",
        "ş": "sh",
        "Ç": "Ch",
        "ç": "ch"
    }

    return letters[match.group()]



def generate_email_otp(old_code):
    new_code = "".join(secrets.choice("0123456789") for _ in range(6))
    while old_code == new_code:
        new_code = "".join(secrets.choice("0123456789") for _ in range(6))
    return new_code, timezone.now() + timedelta(minutes=settings.EMAIL_EXPIRE_TIME)


def generate_title(message):
    title = ""

    words = re.split(r"\s+|(?=[.,;?!])|(?<=[.,;])", message)

    for i, word in enumerate(words):
        if i > 0 and len(word) + len(title) > 20:
            break

        if i > 0 and not word in [".", ",", ";", "?", "!"]:
            title += " "

        title += word

    return title


def convert_to_wav(audio_file):
    audio_file.seek(0)
    audio_bytes = audio_file.read()

    audio_io = BytesIO(audio_bytes)

    audio = AudioSegment.from_file(audio_io)

    wav_io = BytesIO()
    audio.set_frame_rate(44100).set_channels(1).set_sample_width(2).export(
        wav_io, format="wav"
    )

    wav_io.seek(0)
    return wav_io



fernet = Fernet(settings.FERNET_SECRET_KEY)

def encrypt_token(raw_token: str) -> str:
    return fernet.encrypt(raw_token.encode()).decode()

def decrypt_token(encrypted_token: str) -> str:
    return fernet.decrypt(encrypted_token.encode()).decode()


def tts_transaction(balance, subscription, credit_rate, text, mdl):
    plan = TTSModelModel.objects.get(title=mdl)

    if credit_rate.reset is None or credit_rate.reset < timezone.now():
        credit_rate.reset = timezone.now() + timedelta(minutes=credit_rate.time)
        credit_rate.usage = 0

    credit_avail = subscription.credit - subscription.credit_expense
    credit_active = min(credit_avail, credit_rate.limit - credit_rate.usage)
    char_length = len(text)
    credit_usage = char_length * plan.credit
    cash_usage = 0

    if balance.chargeable and char_length > credit_active / plan.credit:
        remainder = char_length - int(credit_active / plan.credit)
        credit_usage = (char_length - remainder) * plan.credit
        cash_usage = remainder * plan.cash

        if cash_usage > balance.cash:
            raise CustomException("Not enough founds.", 403)

    else:
        if char_length > credit_avail / plan.credit:
            raise CustomException("Not enough credits.", 403)

        if char_length > credit_active / plan.credit:
            raise CustomException("Request limit exceeded.", 403)


    return credit_usage, cash_usage



def stt_transaction(balance, subscription, credit_rate, audio, mdl):
    plan = STTModelModel.objects.get(title=mdl)

    if credit_rate.reset is None or credit_rate.reset < timezone.now():
        credit_rate.reset = timezone.now() + timedelta(minutes=credit_rate.time)
        credit_rate.usage = 0

    credit_avail = subscription.credit - subscription.credit_expense
    credit_active = min(credit_avail, credit_rate.limit - credit_rate.usage)
    audio_duration = math.ceil(get_audio_duration(audio))
    credit_usage = audio_duration * plan.credit
    cash_usage = 0

    if balance.chargeable and audio_duration > credit_active / plan.credit:
        remainder = audio_duration - int(credit_active / plan.credit)
        credit_usage = (audio_duration - remainder) * plan.credit
        cash_usage = remainder * plan.cash

        if cash_usage > balance.cash:
            raise CustomException("Not enough founds.", 403)

    else:
        if audio_duration > credit_avail / plan.credit:
            raise CustomException("Not enough credits.", 403)

        if audio_duration > credit_active / plan.credit:
            raise CustomException("Request limit exceeded.", 403)


    return credit_usage, cash_usage


def llm_transaction(balance, subscription, session, credit_rate, content, mdl):
    plan = LLMModelModel.objects.get(title=mdl)

    if credit_rate.reset is None or credit_rate.reset < timezone.now():
        credit_rate.reset = timezone.now() + timedelta(minutes=credit_rate.time)
        credit_rate.usage = 0

    credit_avail = subscription.credit - subscription.credit_expense
    credit_active = min(credit_avail, credit_rate.limit - credit_rate.usage)
    char_length = len(content)
    credit_usage = char_length * plan.credit
    cash_usage = 0

    if session.context_expense + char_length > session.context:
        raise CustomException("Message limit reached, open new session.", 403)

    session.context_expense += char_length

    if balance.chargeable and char_length > credit_active / plan.credit:
        remainder = char_length - int(credit_active / plan.credit)
        credit_usage = (char_length - remainder) * plan.credit
        cash_usage = remainder * plan.cash

        if cash_usage > balance.cash:
            raise CustomException("Not enough founds.", 403)
    else:
        if char_length > credit_avail / plan.credit:
            raise CustomException("Not enough credits.", 403)

        if char_length > credit_active / plan.credit:
            raise CustomException("Request limit exceeded.", 403)

    return credit_usage, cash_usage
