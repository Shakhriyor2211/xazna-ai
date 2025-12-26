from rest_framework.views import APIView
from plan.models import PlanModel
from plan.serializers import PlanSerializer, PlanLLMInfoSerializer, PlanTTSInfoSerializer, PlanSTTInfoSerializer
from rest_framework import status
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class PlanListView(APIView):
    @swagger_auto_schema(
        operation_description="Plan list..",
        tags=["Plan"]
    )
    def get(self, request):
        serializer = PlanSerializer(PlanModel.objects.all(), many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class PlanInfoView(APIView):
    @swagger_auto_schema(
        operation_description="Plan info..",
        manual_parameters=[
            openapi.Parameter(
                name="tool",
                in_=openapi.IN_QUERY,
                description="Tool",
                type=openapi.TYPE_STRING,
                required=False,
            )
        ],
        tags=["Plan"]
    )
    def get(self, request,):
        tool = request.query_params.get("tool", "llm")

        if tool == "llm":
            serializer = PlanLLMInfoSerializer(PlanModel.objects.all())
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        if tool == "tts":
            serializer = PlanTTSInfoSerializer(PlanModel.objects.all())
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        if tool == "stt":
            serializer = PlanSTTInfoSerializer(PlanModel.objects.all())
            return Response(data=serializer.data, status=status.HTTP_200_OK)