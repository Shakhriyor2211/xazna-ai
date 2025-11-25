from django.contrib.auth.models import AnonymousUser
from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from jwt import decode, InvalidTokenError, ExpiredSignatureError
from accounts.models import CustomUserModel
from service.models import ServiceTokenModel
from xazna import settings



class AuthViewMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        view_class = getattr(view_func, "view_class", None)
        token_required = getattr(view_class, "token_required", False) or getattr(view_func, "token_required", False)
        auth_required = getattr(view_class, "auth_required", False) or getattr(view_func, "auth_required", False)

        if token_required:
            return None

        if not auth_required:
            request._user = AnonymousUser()
            return None

        token = request.COOKIES.get("access_token")

        if not token:
            return JsonResponse({"message": "Authentication credentials were not provided.", "code": "auth_required"}, status=401)


        try:
            payload = decode(
                token,
                settings.SECRET_KEY,
                algorithms=[settings.JWT_ALGORITHM],
                options={"verify_exp": True}
            )

            user_id = payload.get("user_id") or payload.get("sub")
            user = CustomUserModel.objects.get(id=user_id)

            if user.is_blocked:
                return JsonResponse({"message": "Account is blocked.", "code": "account_blocked"}, status=403)

            if not user.is_active:
                return JsonResponse({"message": "Account is inactive.", "code": "account_inactive"}, status=403)

            admin_required = getattr(view_class, "admin_required", False) or getattr(view_func, "admin_required", False)

            if admin_required and user.role != "admin" and  user.role != "superadmin":
                return JsonResponse({"message": "Admin privileges required.", "code": "privileges_required"}, status=403)

            request._user = user

        except ExpiredSignatureError:
            return JsonResponse({"message": "Token has expired.", "code": "expired_token"}, status=401)
        except InvalidTokenError:
            return JsonResponse({"message": "Invalid token.", "code": "invalid_token"}, status=400)
        except CustomUserModel.DoesNotExist:
            return JsonResponse({"message": "User not found.", "code": "not_found"}, status=404)



class TokenViewMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        view_class = getattr(view_func, "view_class", None)
        token_required = getattr(view_class, "token_required", False) or getattr(view_func, "token_required", False)
        auth_required = getattr(view_class, "auth_required", False) or getattr(view_func, "auth_required", False)

        if auth_required:
            return None

        if not token_required:
            request._user = AnonymousUser()
            request.token = None
            return None

        t = request.COOKIES.get("token") or request.GET.get("token")

        if not t:
            return JsonResponse({"message": "Token was not provided.", "code": "token_required"}, status=401)

        try:
            token = ServiceTokenModel.objects.get(key=t)

            if token.is_blocked:
                return JsonResponse({"message": "Token is blocked.", "code": "token_blocked"}, status=403)

            if not token.is_active:
                return JsonResponse({"message": "Token is inactive.", "code": "token_inactive"}, status=403)

            if token.user.is_blocked:
                return JsonResponse({"message": "Account is blocked.", "code": "account_blocked"}, status=403)

            if not token.user.is_active:
                return JsonResponse({"message": "Account is inactive.", "code": "account_inactive"}, status=403)

            request._user = token.user
            request.token = token

        except ServiceTokenModel.DoesNotExist:
            return JsonResponse({"message": "Token not found.", "code": "not_found"}, status=404)