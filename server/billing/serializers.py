from rest_framework import serializers
from billing.models import BillingModel

class BillingTransactionParamsSerializer(serializers.Serializer):
    invoice = serializers.CharField(max_length=20,  allow_null=True, allow_blank=True, default=None, required=False)
    amount = serializers.DecimalField(
        max_digits=14,
        decimal_places=2,
        allow_null=True,
        required=False,
    )

    xaznaTransactionId = serializers.CharField(
        allow_null=True,
        allow_blank=True,
        default=None,
        required=False,
    )


class BillingTransactionSerializer(serializers.Serializer):
    id = serializers.CharField()
    jsonrpc = serializers.CharField(max_length=10)
    method = serializers.CharField(max_length=20)
    params = BillingTransactionParamsSerializer()



class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingModel
        exclude = ["user"]
        extra_kwargs = {
            "invoice": {"read_only": True},
            "status": {"read_only": True},
            "transaction_id": {"read_only": True},
        }