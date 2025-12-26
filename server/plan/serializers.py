from rest_framework import serializers
from llm.models import LLMModelModel
from plan.models import PlanModel
from rate.models import PlanTTSRateModel, PlanLLMRateModel, PlanSTTRateModel
from stt.models import STTModelModel
from tts.models import TTSModelModel


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
            "annual_discount"
        ]


class PlanLLMInfoSerializer(serializers.Serializer):
    plan = serializers.SerializerMethodField()
    mdl = serializers.SerializerMethodField()
    rate = serializers.SerializerMethodField()

    def get_plan(self, obj):
        plan = []

        for p in obj:
            if p.title != "Enterprise":
                plan.append(p.title)

        return plan

    def get_mdl(self, obj):
        mdl = []

        for m in LLMModelModel.objects.all():
            mdl.append({"title": m.title, "credit": m.credit, "cash": m.cash})

        return mdl

    def get_rate(self, obj):
        rate = []
        for r in PlanLLMRateModel.objects.all():
            rate.append({"plan": r.plan.title, "credit_limit": r.credit_limit, "credit_time": r.credit_time,
                         "session_limit": r.session_limit, "context_limit": r.context_limit})

        return rate


class PlanTTSInfoSerializer(serializers.Serializer):
    plan = serializers.SerializerMethodField()
    mdl = serializers.SerializerMethodField()
    rate = serializers.SerializerMethodField()

    def get_plan(self, obj):
        plan = []

        for p in obj:
            if p.title != "Enterprise":
                plan.append(p.title)

        return plan

    def get_mdl(self, obj):
        mdl = []

        for m in TTSModelModel.objects.all():
            mdl.append({"title": m.title, "credit": m.credit, "cash": m.cash})

        return mdl

    def get_rate(self, obj):
        rate = []
        for r in PlanTTSRateModel.objects.all():
            rate.append({"plan": r.plan.title, "credit_limit": r.credit_limit, "credit_time": r.credit_time})

        return rate


class PlanSTTInfoSerializer(serializers.Serializer):
    plan = serializers.SerializerMethodField()
    mdl = serializers.SerializerMethodField()
    rate = serializers.SerializerMethodField()

    def get_plan(self, obj):
        plan = []

        for p in obj:
            if p.title != "Enterprise":
                plan.append(p.title)

        return plan

    def get_mdl(self, obj):
        mdl = []

        for m in STTModelModel.objects.all():
            mdl.append({"title": m.title, "credit": m.credit, "cash": m.cash})

        return mdl

    def get_rate(self, obj):
        rate = []
        for r in PlanSTTRateModel.objects.all():
            rate.append({"plan": r.plan.title, "credit_limit": r.credit_limit, "credit_time": r.credit_time})

        return rate
