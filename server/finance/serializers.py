from rest_framework import serializers
from finance.models import BalanceModel, TransactionModel, UserExpenseModel, TokenExpenseModel


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionModel
        exclude = ["user"]
        extra_kwargs = {
            "status": {"read_only": True},
        }


class BalanceManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BalanceModel
        fields = ["chargeable"]


class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BalanceModel
        exclude = ["user", "created_at", "updated_at"]


class UserExpenseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExpenseModel
        exclude = ["user"]


class TokenExpenseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenExpenseModel
        exclude = ["token"]