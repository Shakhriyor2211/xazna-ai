from rest_framework import serializers
from sub.models import SubModel


class SubChangeSerializer(serializers.Serializer):
    plan = serializers.CharField(max_length=50)
    period = serializers.CharField(max_length=50)

class SubManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubModel
        fields = ["auto_renew"]

class SubSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubModel
        exclude = ["user", "created_at", "updated_at"]

class SubListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubModel
        exclude = ["user"]

