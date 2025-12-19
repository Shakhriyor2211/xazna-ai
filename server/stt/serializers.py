from rest_framework import serializers
from shared.serializers import AudioSerializer
from stt.models import UserSTTModel, TokenSTTModel


class STTSerializer(serializers.Serializer):
    audio = serializers.FileField()
    mdl = serializers.CharField(max_length=50)


class UserSTTListSerializer(serializers.ModelSerializer):
    audio = AudioSerializer()
    class Meta:
        model = UserSTTModel
        fields = ["id", "text", "audio", "created_at"]
        read_only_fields = ["id"]


class UserSTTChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSTTModel
        fields = [
            "text",
        ]


class TokenSTTListSerializer(serializers.ModelSerializer):
    audio = AudioSerializer()
    class Meta:
        model = TokenSTTModel
        fields = ["id", "text", "audio", "created_at"]
        read_only_fields = ["id"]


class TokenSTTChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenSTTModel
        fields = [
            "text",
        ]