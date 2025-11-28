from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from finance.models import TransactionModel, UserExpenseModel, TokenExpenseModel
from finance.serializers import BalanceManageSerializer, TransactionSerializer, UserExpenseListSerializer, \
    BalanceSerializer
from rest_framework import status
from rest_framework.response import Response
from shared.views import CustomPagination
from django.db import transaction
from sub.models import SubModel
from sub.serializers import SubSerializer


class UserExpenseListView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Expense list...', tags=["Finance"])
    def get(self, request):
        ordering = request.query_params.get('ordering', '-created_at')

        queryset = UserExpenseModel.objects.filter(user=request.user, is_deleted=False).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = UserExpenseListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)


class TokenExpenseListView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description='Expense list...',
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        tags=["Finance"])
    def get(self, request):
        permission = request.token.permission
        if permission.history != "all" and permission.history != "read":
            return Response(data={"message": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        ordering = request.query_params.get('ordering', '-created_at')

        queryset = TokenExpenseModel.objects.filter(token=request.token, is_deleted=False).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = UserExpenseListSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)


class UserExpenseItemView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description="Delete session...", tags=["Finance"])
    def delete(self, request, expense_id):
        try:
            expense = UserExpenseModel.objects.get(user=request.user, id=expense_id, is_deleted=False)
            expense.is_deleted = True
            expense.save()

            return Response(data={'message': 'Data successfully deleted.'}, status=status.HTTP_200_OK)
        except UserExpenseModel.DoesNotExist:
            return Response(data={"message": "Data not found."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TokenExpenseItemView(APIView):
    token_required = True

    @swagger_auto_schema(
        operation_description="Delete session...",
        manual_parameters=[
            openapi.Parameter(
                name="token",
                in_=openapi.IN_QUERY,
                description="Service API token",
                type=openapi.TYPE_STRING,
                required=True
            )
        ],
        tags=["Finance"]
    )
    def delete(self, request, expense_id):
        try:
            permission = request.token.permission
            if permission.history != "all" and permission.history != "write":
                return Response(data={"message": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

            expense = TokenExpenseModel.objects.get(token=request.token, id=expense_id, is_deleted=False)
            expense.is_deleted = True
            expense.save()

            return Response(data={'message': 'Data successfully deleted.'}, status=status.HTTP_200_OK)
        except TokenExpenseModel.DoesNotExist:
            return Response(data={"message": "Data not found."}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BalanceView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description="Balance...", tags=["Finance"])
    def get(self, request):
        b_serializer = BalanceSerializer(request.user.balance)
        sub = SubModel.objects.filter(user=request.user, status="active").first()
        s_serializer = SubSerializer(sub)

        return Response(data={"balance": b_serializer.data, "sub": s_serializer.data}, status=status.HTTP_200_OK)


class BalanceTopUpView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description="Top up balance...", request_body=TransactionSerializer,
                         tags=["Finance"])
    def post(self, request):
        try:
            with transaction.atomic():
                serializer = TransactionSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save(user=request.user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(data=serializer.data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BalanceManageView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Manage subscription...', request_body=BalanceManageSerializer,
                         tags=["Finance"])
    def patch(self, request):
        try:
            serializer = BalanceManageSerializer(
                instance=request.user.balance,
                data=request.data,
                partial=True
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(data={"message": "Balance settings changed successfully."}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TransactionListView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Transaction list...', tags=["Finance"])
    def get(self, request):
        ordering = request.query_params.get('ordering', '-created_at')

        queryset = TransactionModel.objects.filter(user=request.user).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = TransactionSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)
