from rest_framework import serializers
from plan.models import PlanModel
from rate.models import PlanTTSRateModel, PlanLLMRateModel, PlanSTTRateModel



class PlanLLMRateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PlanLLMRateModel
        fields = ["credit_limit", "credit_time", "session_limit", "context_limit"]


class PlanTTSRateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PlanTTSRateModel
        fields = ["credit_limit", "credit_time"]


class PlanSTTRateSerializer(serializers.ModelSerializer):

    class Meta:
        model = PlanSTTRateModel
        fields = ["credit_limit", "credit_time"]



class PlanSerializer(serializers.ModelSerializer):
    llm_rate = PlanLLMRateSerializer()
    tts_rate = PlanTTSRateSerializer()
    stt_rate = PlanSTTRateSerializer()

    class Meta:
        model = PlanModel
        fields = [
            "id",
            "title",
            "description",
            "monthly_credit",
            "monthly_price",
            "monthly_discount",
            "annual_credit",
            "annual_price",
            "annual_discount",
            "llm_rate",
            "tts_rate",
            "stt_rate",
        ]