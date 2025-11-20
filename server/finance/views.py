from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from finance.models import TransactionModel, ExpenseModel, BalanceModel
from finance.serializers import BalanceManageSerializer, TransactionSerializer, ExpenseListSerializer, BalanceSerializer
from rest_framework import status
from rest_framework.response import Response
from shared.views import CustomPagination
from django.db import transaction

from sub.models import SubModel
from sub.serializers import SubSerializer


class ExpenseListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Expense list...', tags=["Finance"])
    def get(self, request):
        ordering = request.query_params.get('ordering', '-created_at')

        queryset = ExpenseModel.objects.filter(user=request.user, consumer="user").order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = ExpenseListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)



class BalanceAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description="Balance...", tags=["Finance"])
    def get(self, request):
        b_serializer = BalanceSerializer(request.user.balance)
        sub = SubModel.objects.filter(user=request.user, status="active").first()
        s_serializer = SubSerializer(sub)

        return Response(data={"balance": b_serializer.data, "sub": s_serializer.data}, status=status.HTTP_200_OK)



class BalanceTopUpAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description="Top up balance...", request_body=TransactionSerializer, tags=["Finance"])
    def post(self, request):
        try:
            with transaction.atomic():
                serializer = TransactionSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save(user=request.user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(data=serializer.data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BalanceManageAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Manage subscription...', request_body=BalanceManageSerializer, tags=["Finance"])
    def patch(self, request):
        try:
            serializer = BalanceManageSerializer(
                instance=request.user.balance,
                data=request.data,
                partial=True
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TransactionListAPIView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Transaction list...', tags=["Finance"])
    def get(self, request):
        ordering = request.query_params.get('ordering', '-created_at')

        queryset = TransactionModel.objects.filter(user=request.user).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = TransactionSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)

