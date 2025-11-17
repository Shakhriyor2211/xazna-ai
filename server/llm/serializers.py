from rest_framework import serializers
from llm.models import LLMSessionModel, LLMMessageModel



class LLMMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = LLMMessageModel
        fields = ["id", "role", "content", "mdl", "created_at", "updated_at"]
        extra_kwargs = {
            "role": {"read_only": True},
            "mdl": {"read_only": True},
            "status": {"read_only": True}
        }




class LLMSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LLMSessionModel
        fields = ["id", "title", "created_at", "updated_at"]
        extra_kwargs = {
            "title": {"read_only": True},
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True}
        }
