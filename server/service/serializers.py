from rest_framework import serializers
from service.models import ServiceTokenModel, ServiceTokenPermissionModel


class ServiceTokenSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    llm = serializers.ChoiceField(choices=[("enable", "enable"), ("disable", "disable")], default="disable")
    tts = serializers.ChoiceField(choices=[("enable", "enable"), ("disable", "disable")], default="disable")
    stt = serializers.ChoiceField(choices=[("enable", "enable"), ("disable", "disable")], default="disable")
    history = serializers.ChoiceField(choices=[("read", "read"), ("write", "write"), ("all", "all"), ("disable", "disable")],
                               default="disable")
    monitoring = serializers.ChoiceField(choices=[("read", "read"), ("write", "write"), ("all", "all"), ("disable", "disable")],
                                  default="disable")


class ServiceTokenManageSerializer(serializers.Serializer):
    is_active = serializers.BooleanField()

class ServiceTokenPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTokenPermissionModel
        fields = ["llm", "tts", "stt", "history", "monitoring"]


class ServiceTokenListSerializer(serializers.ModelSerializer):
    permission = ServiceTokenPermissionSerializer()

    class Meta:
        model = ServiceTokenModel
        fields = ["id", "name", "last_symbols", "permission", "is_active", "last_used_at", "created_at", "updated_at"]
        extra_kwargs = {
            "last_used_at": {"read_only": True},
            "last_symbols": {"read_only": True},
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True}
        }