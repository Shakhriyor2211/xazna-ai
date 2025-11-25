import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from django.http import parse_cookie
from jwt import decode, ExpiredSignatureError, InvalidTokenError
from accounts.models import CustomUserModel
from service.models import ServiceTokenModel
from xazna import settings
from urllib.parse import parse_qsl
from asgiref.sync import sync_to_async


class AuthWebsocketConsumer(AsyncWebsocketConsumer):
    async def _validate(self):
        auth_required = getattr(self, "auth_required", False)

        if not auth_required:
            self.user = AnonymousUser()
            return True

        cookies = {}
        token = None

        for name, value in self.scope.get("headers", []):
            if name == b"cookie":
                cookies = parse_cookie(value.decode("latin1"))
                break

        token = cookies.get("access_token")

        if not token:
            await self.close(code=4400)

        try:
            payload = decode(
                token,
                settings.SECRET_KEY,
                algorithms=[settings.JWT_ALGORITHM],
                options={"verify_exp": True}
            )

            user_id = payload.get("user_id") or payload.get("sub")
            user = await database_sync_to_async(CustomUserModel.objects.get)(id=user_id)

            if user.is_blocked:
                await self.send(json.dumps({
                    "status": 403,
                    "type": "error",
                    "message": "Account is blocked."
                }))
                return False

            admin_required = getattr(self, "admin_required", False)

            if admin_required and user.role != "admin" and user.role != "superadmin":
                await self.send(json.dumps({
                    "status": 403,
                    "type": "error",
                    "message": "Admin privileges required."
                }))
                return False

            self.user = user

        except ExpiredSignatureError:
            await self.send(json.dumps({
                "status": 401,
                "type": "error",
                "message": "Token has expired."
            }))
            return False

        except InvalidTokenError:
            await self.close(code=4400)
            return False
        except CustomUserModel.DoesNotExist:
            await self.close(code=4404)
            return False

        return True

    async def connect(self):
        await self.accept()
        is_valid = await self._validate()

        if not is_valid:
            return

        if hasattr(self, "on_connect"):
            await self.on_connect()

    async def receive(self, text_data=None):
        is_valid = await self._validate()

        if not is_valid:
            return

        if hasattr(self, "on_receive"):
            await self.on_receive(text_data)

    async def disconnect(self, close_code):
        if hasattr(self, "on_disconnect"):
            await self.on_disconnect(close_code)


class TokenWebsocketConsumer(AsyncWebsocketConsumer):
    async def _validate(self):
        token_required = getattr(self, "token_required", False)

        if not token_required:
            self.user = AnonymousUser()
            self.token = None
            return True

        t = None
        cookies = {}

        for name, value in self.scope.get("headers", []):
            if name == b"cookie":
                cookies = parse_cookie(value.decode("latin1"))
                break

        t = cookies.get("token")

        if not t:
            raw = self.scope.get("query_string", b"").decode()

            for name, value in parse_qsl(raw):
                if name == "token":
                    t = value
                    break

            if not t:
                await self.close(code=4400)

        try:
            token = await database_sync_to_async(ServiceTokenModel.objects.get)(key=t)
            user = await sync_to_async(lambda: token.user)()

            if token.is_blocked:
                await self.send(json.dumps({
                    "status": 403,
                    "type": "error",
                    "message": "Token is blocked."
                }))
                return False

            if not token.is_active:
                await self.send(json.dumps({
                    "status": 403,
                    "type": "error",
                    "message": "Token is inactive."
                }))
                return False

            if user.is_blocked:
                await self.send(json.dumps({
                    "status": 403,
                    "type": "error",
                    "message": "Account is blocked."
                }))

            if not user.is_active:
                await self.send(json.dumps({
                    "status": 403,
                    "type": "error",
                    "message": "Account is inactive."
                }))

            self.user = user
            self.token = token

        except ServiceTokenModel.DoesNotExist:
            await self.close(code=4404)
            return False

        return True

    async def connect(self):
        await self.accept()
        is_valid = await self._validate()

        if not is_valid:
            return

        if hasattr(self, "on_connect"):
            await self.on_connect()

    async def receive(self, text_data=None):
        is_valid = await self._validate()

        if not is_valid:
            return

        if hasattr(self, "on_receive"):
            await self.on_receive(text_data)

    async def disconnect(self, close_code):
        if hasattr(self, "on_disconnect"):
            await self.on_disconnect(close_code)
