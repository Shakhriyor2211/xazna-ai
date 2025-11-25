from rest_framework import serializers

from service.models import ServiceTokenModel


class ServiceTokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceTokenModel
        fields = ["id", "name", "last_symbols", "last_used_at", "created_at", "updated_at"]
        extra_kwargs = {
            "last_used_at": {"read_only": True},
            "last_symbols": {"read_only": True},
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True}
        }