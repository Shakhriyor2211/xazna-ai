import asyncio
import json
import time
from time import sleep
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from openai import OpenAI
from chat.models import ChatSessionModel, ChatMessageModel, ChatModelModel
from chat.serializers import ChatMessageSerializer
from xazna import settings
from xazna.consumers import BaseWebsocketConsumer
from django.db import transaction
from django.utils import timezone
from xazna.exceptions import ChatException
from datetime import timedelta
from finance.models import ExpenseModel

openai_api_key = "EMPTY"
openai_api_base = settings.LLM_SERVER
client = OpenAI(api_key=openai_api_key, base_url=openai_api_base)


class ChatConsumer(BaseWebsocketConsumer):
    auth_required = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.stream_task = None
        self.balance = None
        self.subscription = None
        self.credit_rate = None
        self.credit_usage = 0
        self.cash_usage = 0
        self.session = None
        self.user_message = None
        self.assistant_message = None
        self.contents = []

    async def on_connect(self):
        self.session = await database_sync_to_async(ChatSessionModel.objects.get)(
            id=self.scope["url_route"]["kwargs"]["session_id"],
            user=self.user
        )
        self.contents = await database_sync_to_async(lambda: ChatMessageSerializer(
            self.session.messages
            .exclude(role="system")
            .order_by("created_at")
            .values("role", "content", "mdl"),
            many=True
        ).data)()

        self.stream_task = None

        if self.session.is_streaming and len(self.contents) == 1:
            self.user_message = await database_sync_to_async(
                lambda: self.session.messages
                .exclude(role="system")
                .order_by("created_at")
                .first())()
            self.assistant_message = await self._create_message(role="assistant", content="", mdl=self.user_message.mdl)

            try:
                await self._process_transaction()

            except ChatException as e:
               await self.send(json.dumps({
                   "status": e.status,
                   "type": "error",
                   "message": e.message
               }))
               self.contents.append({"role": "assistant", "content": ""})
               self.assistant_message.error = str(e)
               await database_sync_to_async(self.assistant_message.save)()
            except Exception as e:
               await self.send(json.dumps({
                   "status": 500,
                   "type": "error",
                   "message": "Internal server error"
               }))
               self.contents.append({"role": "assistant", "content": ""})
               self.assistant_message.error = str(e)
               await database_sync_to_async(self.assistant_message.save)()
            finally:
               self.session.is_streaming = False
               await database_sync_to_async(self.session.save)()


    async def on_receive(self, request):
        data = json.loads(request)
        action = data.get("action")

        if action == "cancel":
            if self.stream_task is not None and not self.stream_task.done():
                self.stream_task.cancel()
                if self.assistant_message.content:
                    self.contents.append({"role": "assistant", "content": self.assistant_message.content})
                    await sync_to_async(self.balance.save)()
                    await sync_to_async(self.subscription.save)()
                    await sync_to_async(self.credit_rate.save)()
                    await sync_to_async(ExpenseModel.objects.create)(operation="chat", credit=self.credit_usage,
                                                                     cash=self.cash_usage,
                                                                     chat=self.user_message, user=self.user)
            return

        try:
            cnt = data.get("content", None)
            mdl = data.get("model", None)

            if self.session is None:
                raise ChatException("Session not found.", 404)

            if not cnt:
                raise ChatException("Content is required.", 400)

            if not cnt:
                raise ChatException("Model is required.", 400)

            self.user_message = await self._create_message(role="user", content=cnt, mdl=mdl)
            self.contents.append({"role": "user", "content": cnt})
            self.assistant_message = await self._create_message(role="assistant", content="", mdl=mdl)

            await self._process_transaction()


        except ChatException as e:
            await self.send(json.dumps({
                "status": e.status,
                "type": "error",
                "message": e.message
            }))
            self.contents.append({"role": "assistant", "content": ""})
            self.assistant_message.error = str(e)
            await database_sync_to_async(self.assistant_message.save)()
        except Exception as e:
            await self.send(json.dumps({
                "status": 500,
                "type": "error",
                "message": "Internal server error"
            }))
            self.contents.append({"role": "assistant", "content": ""})
            self.assistant_message.error = str(e)
            await database_sync_to_async(self.assistant_message.save)()

        finally:
            self.session.is_streaming = False
            await database_sync_to_async(self.session.save)()

    async def _process_transaction(self):

        self.balance = await sync_to_async(lambda: self.user.balance)()
        self.subscription = await sync_to_async(lambda: self.balance.subscription)()
        self.credit_rate = await sync_to_async(lambda: self.subscription.rate.chat.credit)()

        char_length = len(self.user_message.content)

        self.session.context_expense += char_length
        self.credit_usage = 0
        self.cash_usage = 0

        plan = await database_sync_to_async(ChatModelModel.objects.get)(title=self.user_message.mdl)

        if self.credit_rate.reset is None or self.credit_rate.reset < timezone.now():
            self.credit_rate.reset = timezone.now() + timedelta(minutes=self.credit_rate.time)
            self.credit_rate.usage = 0

        credit_avail = self.subscription.credit - self.subscription.credit_expense
        credit_active = min(credit_avail, self.credit_rate.limit - self.credit_rate.usage)
        self.credit_usage = char_length * plan.credit
        self.cash_usage = 0

        if self.session.context_expense + char_length > self.session.context:
            raise ChatException("Message limit reached, open new session.", 403)

        if self.balance.chargeable and char_length > credit_active / plan.credit:
            remainder = char_length - int(credit_active / plan.credit)
            self.credit_usage = (char_length - remainder) * plan.credit
            self.cash_usage = remainder * plan.cash

            if self.cash_usage > self.balance.cash:
                raise ChatException("Not enough founds.", 403)

            self.balance.cash -= self.cash_usage

        else:
            if char_length > credit_avail / plan.credit:
                raise ChatException("Not enough credits.", 403)

            if char_length > credit_active / plan.credit:
                raise ChatException("Request limit exceeded.", 403)

        self.subscription.credit_expense += self.credit_usage
        self.credit_rate.usage += self.credit_usage

        self.session.is_streaming = True

        await sync_to_async(self.session.save)()

        self.stream_task = asyncio.create_task(self._stream_llm())




    async def _stream_llm(self):
        min_interval = 0.005
        last_sent_time = 0
        conversation = [
            {"role": "user",
             "content": "Senga o'zbek tilida murojaat qilishadi. Sen faqat o'zbek tilida gaplashishing kerak."},
            {"role": "assistant", "content": "Albatta! Faqat o'zbek tilida javob qaytaraman."},
            *self.contents
        ]

        model = client.models.list().data[0].id

        stream = client.chat.completions.create(
            model=model,
            messages=conversation,
            stream=True,
            temperature=0.7,
        )

        await self.send(json.dumps({"status": 201}))

        for chunk in stream:
            delta = chunk.choices[0].delta

            if delta.content:
                self.assistant_message.content += delta.content
                await sync_to_async(self.assistant_message.save)()

                for ch in delta.content:
                    now = time.monotonic()
                    elapsed = now - last_sent_time
                    if elapsed < min_interval:
                        await asyncio.sleep(min_interval - elapsed)

                    await self.send(json.dumps({
                        "status": 206,
                        "type": "stream",
                        "token": ch
                    }))
                    last_sent_time = time.monotonic()


        await self.send(json.dumps({"status": 200}))

        self.contents.append({"role": "assistant", "content": self.assistant_message.content})
        await sync_to_async(self.balance.save)()
        await sync_to_async(self.subscription.save)()
        await sync_to_async(self.credit_rate.save)()
        await sync_to_async(ExpenseModel.objects.create)(operation="chat", credit=self.credit_usage, cash=self.cash_usage,
                                                         chat=self.user_message, user=self.user)

    async def _create_message(self, role, content=None, mdl="Base", error=None):
        instance = await sync_to_async(ChatMessageModel.objects.create)(
            session=self.session,
            role=role,
            content=content,
            mdl=mdl,
            error=error
        )


        return instance

    async def disconnect(self, close_code):
        print(f"""Disconnected: {close_code}""")
        if self.stream_task is not None and self.stream_task and not self.stream_task.done():
            if self.assistant_message.content != "":
                await sync_to_async(self.balance.save)()
                await sync_to_async(self.subscription.save)()
                await sync_to_async(self.credit_rate.save)()
                await sync_to_async(ExpenseModel.objects.create)(operation="chat", credit=self.credit_usage, cash=self.cash_usage,
                                                                 chat=self.user_message, user=self.user)
            self.stream_task.cancel()
