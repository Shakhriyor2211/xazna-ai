import asyncio
import json
import time
from time import sleep
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from openai import OpenAI
from llm.models import UserLLMSessionModel, UserLLMMessageModel, TokenLLMSessionModel, TokenLLMMessageModel
from llm.serializers import UserLLMMessageSerializer, TokenLLMMessageSerializer
from shared.utils import llm_transaction
from xazna import settings
from xazna.consumers import AuthWebsocketConsumer, TokenWebsocketConsumer
from django.db import transaction
from django.utils import timezone
from xazna.exceptions import CustomException
from datetime import timedelta
from finance.models import UserExpenseModel, TokenExpenseModel
from log.models import UserLLMErrorLogModel, TokenLLMErrorLogModel
from django.utils.translation import gettext_lazy as _


openai_api_key = settings.LLM_SERVER_API_KEY
openai_api_base = settings.LLM_SERVER
client = OpenAI(api_key=openai_api_key, base_url=openai_api_base)


class UserLLMConsumer(AuthWebsocketConsumer):
    auth_required = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.stream_task = None
        self.balance = None
        self.sub = None
        self.rate = None
        self.context_rate = None
        self.credit_usage = 0
        self.cash_usage = 0
        self.session = None
        self.user_message = None
        self.assistant_message = None
        self.contents = []

    async def on_connect(self):
        self.session = await database_sync_to_async(UserLLMSessionModel.objects.get)(
            id=self.scope["url_route"]["kwargs"]["session_id"],
            user=self.user,
            is_deleted=False
        )
        self.contents = await database_sync_to_async(lambda: UserLLMMessageSerializer(
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

            except CustomException as e:
                await self.send(json.dumps({
                    "status": e.status,
                    "type": "error",
                    "message": e.message
                }))
                self.contents.append({"role": "assistant", "content": ""})
            except Exception as e:
                await self.send(json.dumps({
                    "status": 500,
                    "type": "error",
                    "message": _("Internal server error")
                }))
                self.contents.append({"role": "assistant", "content": ""})
                await sync_to_async(UserLLMErrorLogModel.objects.create)(message=str(e),
                                                                         content=self.user_message.content,
                                                                         user=self.user)
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
                    await sync_to_async(self.sub.save)()
                    await sync_to_async(self.rate.save)()
                    await sync_to_async(self.context_rate.save)()
                    await sync_to_async(UserExpenseModel.objects.create)(operation="llm", credit=self.credit_usage,
                                                                         cash=self.cash_usage,
                                                                         operation_id=self.user_message.id,
                                                                         user=self.user)
            return

        try:
            cnt = data.get("content", None)
            mdl = data.get("model", None)

            if self.session is None:
                raise CustomException(_("Session not found."), 404)

            if not cnt:
                raise CustomException(_("Content is required."), 400)

            if not cnt:
                raise CustomException(_("Model is required."), 400)

            self.user_message = await self._create_message(role="user", content=cnt, mdl=mdl)
            self.contents.append({"role": "user", "content": cnt})
            self.assistant_message = await self._create_message(role="assistant", content="", mdl=mdl)

            await self._process_transaction()

        except CustomException as e:
            await self.send(json.dumps({
                "status": e.status,
                "type": "error",
                "message": e.message
            }))
            self.contents.append({"role": "assistant", "content": ""})
        except Exception as e:
            await self.send(json.dumps({
                "status": 500,
                "type": "error",
                "message": "Internal server error."
            }))
            self.contents.append({"role": "assistant", "content": ""})
            await sync_to_async(UserLLMErrorLogModel.objects.create)(message=str(e), content=self.user_message.content,
                                                                     user=self.user)

        finally:
            self.session.is_streaming = False
            await database_sync_to_async(self.session.save)()

    async def _process_transaction(self):
        self.balance = await sync_to_async(lambda: self.user.balance)()
        self.rate = await sync_to_async(lambda: self.user.llm_rate)()
        self.context_rate = await sync_to_async(lambda: self.session.user_context_rate)()
        self.sub = await sync_to_async(lambda: self.user.active_sub)()

        self.credit_usage, self.cash_usage = await sync_to_async(llm_transaction)(self.balance, self.sub, self.rate,
                                                                                  self.context_rate,
                                                                                  self.user_message.content,
                                                                                  self.user_message.mdl)

        self.session.is_streaming = True

        await sync_to_async(self.session.save)()

        self.stream_task = asyncio.create_task(self._stream_llm())
        self.balance.cash -= self.cash_usage
        self.sub.credit_expense += self.credit_usage
        self.rate.credit_usage += self.credit_usage

    async def _stream_llm(self):
        try:
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
            await sync_to_async(self.sub.save)()
            await sync_to_async(self.rate.save)()
            await sync_to_async(self.context_rate.save)()
            await sync_to_async(UserExpenseModel.objects.create)(operation="llm", credit=self.credit_usage,
                                                                 cash=self.cash_usage,
                                                                 operation_id=self.user_message.id, user=self.user)

        except Exception as e:
            await self.send(json.dumps({
                "status": 500,
                "type": "error",
                "message": _("Internal server error")
            }))
            self.contents.append({"role": "assistant", "content": ""})
            await sync_to_async(UserLLMErrorLogModel.objects.create)(message=str(e),
                                                                     content=self.user_message.content,
                                                                     user=self.user)

    async def _create_message(self, role, content="", mdl="Base"):
        instance = await sync_to_async(UserLLMMessageModel.objects.create)(
            session=self.session,
            role=role,
            content=content,
            mdl=mdl
        )

        return instance

    async def disconnect(self, close_code):
        print(f"""Disconnected: {close_code}""")
        if self.stream_task is not None and self.stream_task and not self.stream_task.done():
            if self.assistant_message.content != "":
                await sync_to_async(self.balance.save)()
                await sync_to_async(self.sub.save)()
                await sync_to_async(self.rate.save)()
                await sync_to_async(UserExpenseModel.objects.create)(operation="llm", credit=self.credit_usage,
                                                                     cash=self.cash_usage,
                                                                     operation_id=self.user_message.id, user=self.user)
            self.stream_task.cancel()


class TokenLLMConsumer(TokenWebsocketConsumer):
    token_required = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.stream_task = None
        self.balance = None
        self.sub = None
        self.rate = None
        self.context_rate = None
        self.credit_usage = 0
        self.cash_usage = 0
        self.session = None
        self.user_message = None
        self.assistant_message = None
        self.contents = []

    async def on_connect(self):
        self.session = await database_sync_to_async(TokenLLMSessionModel.objects.get)(
            id=self.scope["url_route"]["kwargs"]["session_id"],
            token=self.token,
            is_deleted=False
        )
        self.contents = await database_sync_to_async(lambda: TokenLLMMessageSerializer(
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

            except CustomException as e:
                await self.send(json.dumps({
                    "status": e.status,
                    "type": "error",
                    "message": e.message
                }))
                self.contents.append({"role": "assistant", "content": ""})
            except Exception as e:
                await self.send(json.dumps({
                    "status": 500,
                    "type": "error",
                    "message": _("Internal server error")
                }))
                self.contents.append({"role": "assistant", "content": ""})
                await sync_to_async(TokenLLMErrorLogModel.objects.create)(message=str(e),
                                                                          content=self.user_message.content,
                                                                          token=self.token)
            finally:
                self.session.is_streaming = False
                await database_sync_to_async(self.session.save)()

    async def on_receive(self, request):
        permission = await sync_to_async(lambda: self.token.permission)()
        if permission.llm == "disable":
            await self.send(json.dumps({
                "status": 403,
                "type": "error",
                "message": _("Permission denied.")
            }))
            return

        data = json.loads(request)
        action = data.get("action")

        if action == "cancel":
            if self.stream_task is not None and not self.stream_task.done():
                self.stream_task.cancel()
                if self.assistant_message.content:
                    self.contents.append({"role": "assistant", "content": self.assistant_message.content})
                    await sync_to_async(self.balance.save)()
                    await sync_to_async(self.sub.save)()
                    await sync_to_async(self.rate.save)()
                    await sync_to_async(self.context_rate.save)()
                    await sync_to_async(TokenExpenseModel.objects.create)(operation="llm", credit=self.credit_usage,
                                                                         cash=self.cash_usage,
                                                                         operation_id=self.user_message.id,
                                                                         token=self.token)
            return

        try:
            cnt = data.get("content", None)
            mdl = data.get("model", None)

            if self.session is None:
                raise CustomException(_("Session not found."), 404)

            if not cnt:
                raise CustomException(_("Content is required."), 400)

            if not cnt:
                raise CustomException(_("Model is required."), 400)

            self.user_message = await self._create_message(role="user", content=cnt, mdl=mdl)
            self.contents.append({"role": "user", "content": cnt})
            self.assistant_message = await self._create_message(role="assistant", content="", mdl=mdl)

            await self._process_transaction()

        except CustomException as e:
            await self.send(json.dumps({
                "status": e.status,
                "type": "error",
                "message": e.message
            }))
            self.contents.append({"role": "assistant", "content": ""})
        except Exception as e:
            await self.send(json.dumps({
                "status": 500,
                "type": "error",
                "message": _("Internal server error")
            }))
            self.contents.append({"role": "assistant", "content": ""})
            await sync_to_async(TokenLLMErrorLogModel.objects.create)(message=str(e), content=self.user_message.content,
                                                                      token=self.token)

        finally:
            self.session.is_streaming = False
            await database_sync_to_async(self.session.save)()

    async def _process_transaction(self):
        self.balance = await sync_to_async(lambda: self.user.balance)()
        self.rate = await sync_to_async(lambda: self.token.llm_rate)()
        self.context_rate = await sync_to_async(lambda: self.session.token_context_rate)()
        self.sub = await sync_to_async(lambda: self.user.active_sub)()

        self.credit_usage, self.cash_usage = await sync_to_async(llm_transaction)(self.balance, self.sub, self.rate,
                                                                                  self.context_rate,
                                                                                  self.user_message.content,
                                                                                  self.user_message.mdl)

        self.session.is_streaming = True

        await sync_to_async(self.session.save)()

        self.stream_task = asyncio.create_task(self._stream_llm())
        self.balance.cash -= self.cash_usage
        self.sub.credit_expense += self.credit_usage
        self.rate.credit_usage += self.credit_usage

    async def _stream_llm(self):
        try:
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
            await sync_to_async(self.sub.save)()
            await sync_to_async(self.rate.save)()
            await sync_to_async(self.context_rate.save)()
            await sync_to_async(TokenExpenseModel.objects.create)(operation="llm", credit=self.credit_usage,
                                                                  cash=self.cash_usage,
                                                                  operation_id=self.user_message.id,
                                                                  token=self.token)

        except Exception as e:
            await self.send(json.dumps({
                "status": 500,
                "type": "error",
                "message": _("Internal server error")
            }))
            self.contents.append({"role": "assistant", "content": ""})
            await sync_to_async(TokenLLMErrorLogModel.objects.create)(message=str(e), content=self.user_message.content,
                                                                      token=self.token)

    async def _create_message(self, role, content="", mdl="Base"):
        instance = await sync_to_async(TokenLLMMessageModel.objects.create)(
            session=self.session,
            role=role,
            content=content,
            mdl=mdl
        )

        return instance

    async def disconnect(self, close_code):
        print(f"""Disconnected: {close_code}""")
        if self.stream_task is not None and self.stream_task and not self.stream_task.done():
            if self.assistant_message.content != "":
                await sync_to_async(self.balance.save)()
                await sync_to_async(self.sub.save)()
                await sync_to_async(self.rate.save)()
                await sync_to_async(TokenExpenseModel.objects.create)(operation="llm", credit=self.credit_usage,
                                                                      cash=self.cash_usage,
                                                                      operation_id=self.user_message.id,
                                                                      token=self.token)
            self.stream_task.cancel()
