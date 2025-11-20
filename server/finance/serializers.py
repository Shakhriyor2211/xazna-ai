from rest_framework import serializers
from finance.models import BalanceModel, TransactionModel, ExpenseModel


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


class ExpenseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseModel
        exclude = ["user"]