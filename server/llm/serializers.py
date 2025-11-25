from rest_framework import serializers
from llm.models import UserLLMSessionModel, UserLLMMessageModel, TokenLLMMessageModel, TokenLLMSessionModel


class UserLLMMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserLLMMessageModel
        fields = ["id", "role", "content", "mdl", "created_at", "updated_at"]
        extra_kwargs = {
            "role": {"read_only": True},
            "mdl": {"read_only": True},
        }

class TokenLLMMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = TokenLLMMessageModel
        fields = ["id", "role", "content", "mdl", "created_at", "updated_at"]
        extra_kwargs = {
            "role": {"read_only": True},
            "mdl": {"read_only": True},
        }



class UserLLMSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLLMSessionModel
        fields = ["id", "title", "created_at", "updated_at"]
        extra_kwargs = {
            "title": {"read_only": True},
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True}
        }

class TokenLLMSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenLLMSessionModel
        fields = ["id", "title", "created_at", "updated_at"]
        extra_kwargs = {
            "title": {"read_only": True},
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True}
        }