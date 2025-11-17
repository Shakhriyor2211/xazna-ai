from rest_framework import serializers
from plan.models import (
    PlanRateModel, PlanModel, PlanMonthlyModel, PlanAnnualModel,
    PlanSTTRateModel, PlanTTSRateModel, PlanLLMRateModel,
    PlanSTTCreditRateModel, PlanTTSCreditRateModel, PlanLLMCreditRateModel
)

class PlanSTTCreditRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanSTTCreditRateModel
        fields = ["limit", "time"]


class PlanTTSCreditRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanTTSCreditRateModel
        fields = ["limit", "time"]


class PlanLLMCreditRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanLLMCreditRateModel
        fields = ["limit", "time"]



class PlanSTTRateSerializer(serializers.ModelSerializer):
    credit = PlanSTTCreditRateSerializer()

    class Meta:
        model = PlanSTTRateModel
        fields = ["credit"]


class PlanTTSRateSerializer(serializers.ModelSerializer):
    credit = PlanTTSCreditRateSerializer()

    class Meta:
        model = PlanTTSRateModel
        fields = ["credit"]


class PlanLLMRateSerializer(serializers.ModelSerializer):
    credit = PlanLLMCreditRateSerializer()

    class Meta:
        model = PlanLLMRateModel
        fields = ["credit"]


class PlanRateSerializer(serializers.ModelSerializer):
    stt = PlanSTTRateSerializer()
    tts = PlanTTSRateSerializer()
    llm = PlanLLMRateSerializer()

    class Meta:
        model = PlanRateModel
        fields = ["stt", "tts", "llm"]


class PlanMonthlySerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanMonthlyModel
        fields = ["credit", "price", "discount"]


class PlanAnnualSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanAnnualModel
        fields = ["credit", "price", "discount"]


class PlanSerializer(serializers.ModelSerializer):
    rate = PlanRateSerializer()
    monthly = PlanMonthlySerializer()
    annual = PlanAnnualSerializer()

    class Meta:
        model = PlanModel
        fields = ["id", "title", "description", "rate", "monthly", "annual"]
