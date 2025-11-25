from rest_framework import serializers
from shared.serializers import AudioSerializer
from tts.models import UserTTSModel, TokenTTSModel


class UserTTSSerializer(serializers.ModelSerializer):
    emotion = serializers.CharField(max_length=50)


    class Meta:
        model = UserTTSModel
        fields = ["text", "audio", "mdl", "format", "emotion"]
        extra_kwargs = {
            "audio": {"read_only": True},
        }




class UserTTSListSerializer(serializers.ModelSerializer):
    audio = AudioSerializer()
    class Meta:
        model = UserTTSModel
        fields = ["id", "text", "audio", "created_at"]
        read_only_fields = ["id"]



class TokenTTSSerializer(serializers.ModelSerializer):
    emotion = serializers.CharField(max_length=50)


    class Meta:
        model = TokenTTSModel
        fields = ["text", "audio", "mdl", "format", "emotion"]
        extra_kwargs = {
            "audio": {"read_only": True},
        }




class TokenTTSListSerializer(serializers.ModelSerializer):
    audio = AudioSerializer()
    class Meta:
        model = TokenTTSModel
        fields = ["id", "text", "audio", "created_at"]
        read_only_fields = ["id"]