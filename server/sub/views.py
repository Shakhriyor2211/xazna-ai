from decimal import Decimal
from drf_yasg import openapi
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from finance.models import BalanceModel
from plan.models import PlanModel
from rate.models import SubLLMRateModel, SubTTSRateModel, SubSTTRateModel
from sub.models import SubModel
from sub.serializers import SubChangeSerializer, SubListSerializer, \
    SubManageSerializer
from rest_framework import status
from rest_framework.response import Response
from django.utils import timezone
from shared.views import CustomPagination
from django.db import transaction
from django.utils.translation import gettext_lazy as _


class SubRestartView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description="Restart subscription...", tags=["Sub"])
    def post(self, request):
        try:
            with transaction.atomic():
                balance = request.user.balance
                active_sub = request.user.active_sub
                plan = PlanModel.objects.get(title=active_sub.title)

                if active_sub.period == "monthly":
                    credit = plan.monthly_credit
                    discount = plan.monthly_discount
                    price = plan.monthly_price * (Decimal(100 - discount) / Decimal(100))

                else:
                    credit = plan.annual_credit
                    discount = plan.annual_discount
                    price = plan.annual_price * (Decimal(100 - discount) / Decimal(100))

                if plan.title == "Free":
                    return Response(data={"message": _("This plan can't be restarted.")},
                                    status=status.HTTP_400_BAD_REQUEST)

                if price > balance.cash:
                    return Response(data={"message": _("Not enough funds, please top up your balance.")},
                                    status=status.HTTP_400_BAD_REQUEST)

                sub = SubModel.objects.create(user=request.user, title=plan.title, period=active_sub.period,
                                              price=price,
                                              credit=credit, discount=discount)
                SubLLMRateModel.objects.create(sub=sub, credit_limit=plan.llm_rate.credit_limit,
                                               credit_time=plan.llm_rate.credit_time,
                                               session_limit=plan.llm_rate.session_limit,
                                               context_limit=plan.llm_rate.context_limit)
                SubTTSRateModel.objects.create(sub=sub, credit_limit=plan.tts_rate.credit_limit,
                                               credit_time=plan.tts_rate.credit_time)
                SubSTTRateModel.objects.create(sub=sub, credit_limit=plan.stt_rate.credit_limit,
                                               credit_time=plan.stt_rate.credit_time)

                balance.cash -= price

                active_sub.status = "canceled"
                active_sub.save()
                balance.save()

                return Response(data={"message": _("Subscription restarted successfully.")}, status=status.HTTP_200_OK)
        except PlanModel.DoesNotExist:
            return Response(data={"message": _("Plan not found.")}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubChangeView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Change subscription...', request_body=SubChangeSerializer, tags=["Sub"])
    def post(self, request):
        try:
            with transaction.atomic():
                serializer = SubChangeSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)

                period = serializer.validated_data["period"]
                plan = PlanModel.objects.get(title=serializer.validated_data["plan"])

                active_sub = request.user.active_sub

                if plan.title == "Enterprise" or plan.title == "Free" and period == "annual" or plan.title == active_sub.title and active_sub.period == period:
                    return Response(data={"message": _("Failed to change subscription.")},
                                    status=status.HTTP_400_BAD_REQUEST)

                if plan.title == "Free":
                    sub = SubModel.objects.filter(title="Free", user=request.user).order_by("-start_date").first()
                    if sub is not None and sub.end_date >= timezone.now():
                        sub.status = "active"
                        sub.save()
                    else:
                        sub = SubModel.objects.create(user=request.user, title=plan.title, credit=plan.monthly_credit,
                                                      period=period, price=plan.monthly_price,
                                                      discount=plan.monthly_discount)
                        SubLLMRateModel.objects.create(sub=sub, credit_limit=plan.llm_rate.credit_limit,
                                                       credit_time=plan.llm_rate.credit_time,
                                                       session_limit=plan.llm_rate.session_limit,
                                                       context_limit=plan.llm_rate.context_limit)
                        SubTTSRateModel.objects.create(sub=sub, credit_limit=plan.tts_rate.credit_limit,
                                                       credit_time=plan.tts_rate.credit_time)
                        SubSTTRateModel.objects.create(sub=sub, credit_limit=plan.stt_rate.credit_limit,
                                                       credit_time=plan.stt_rate.credit_time)

                else:
                    if period == "monthly":
                        credit = plan.monthly_credit
                        discount = plan.monthly_discount
                        price = plan.monthly_price * (Decimal(100 - discount) / Decimal(100))

                    else:
                        credit = plan.annual_credit
                        discount = plan.annual_discount
                        price = plan.annual_price * (Decimal(100 - discount) / Decimal(100))

                    balance = request.user.balance

                    if price > balance.cash:
                        return Response(data={"message": _("Not enough funds, please top up your balance.")},
                                        status=status.HTTP_400_BAD_REQUEST)

                    sub = SubModel.objects.create(user=request.user, title=plan.title, credit=credit,
                                                  period=period, price=price,
                                                  discount=discount)

                    SubLLMRateModel.objects.create(sub=sub, credit_limit=plan.llm_rate.credit_limit,
                                                   credit_time=plan.llm_rate.credit_time,
                                                   session_limit=plan.llm_rate.session_limit,
                                                   context_limit=plan.llm_rate.context_limit)
                    SubTTSRateModel.objects.create(sub=sub, credit_limit=plan.tts_rate.credit_limit,
                                                   credit_time=plan.tts_rate.credit_time)
                    SubSTTRateModel.objects.create(sub=sub, credit_limit=plan.stt_rate.credit_limit,
                                                   credit_time=plan.stt_rate.credit_time)

                    balance.cash -= price
                    balance.save()

                active_sub.status = "canceled"
                active_sub.save()

                return Response(data={"message": _("Subscription changed successfully.")}, status=status.HTTP_200_OK)

        except PlanModel.DoesNotExist:
            return Response(data={"message": _("Plan not found.")}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubManageView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Manage subscription...', request_body=SubManageSerializer, tags=["Sub"])
    def patch(self, request):
        try:
            serializer = SubManageSerializer(
                instance=request.user.active_sub,
                data=request.data,
                partial=True
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubListView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Subscription list...', manual_parameters=[
        openapi.Parameter(
            'page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            'page_size', openapi.IN_QUERY, description="Items per page (max 100)", type=openapi.TYPE_INTEGER
        ),
        openapi.Parameter(
            'ordering', openapi.IN_QUERY, description="Comma-separated fields (e.g. `created_at,text`)",
            type=openapi.TYPE_STRING
        ),
    ],
                         tags=["Sub"])
    def get(self, request):
        ordering = request.query_params.get('ordering', '-created_at')

        queryset = SubModel.objects.filter(user=request.user).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = SubListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)


class SubCheckView(APIView):
    auth_required = True
    admin_required = True

    @swagger_auto_schema(operation_description="Subscription check...", tags=["Sub"])
    def get(self, request):
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

            return Response(status=status.HTTP_200_OK)
