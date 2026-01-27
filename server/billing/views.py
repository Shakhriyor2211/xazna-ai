from django.db import transaction
from billing.models import BillingModel
from finance.models import BalanceModel
from billing.serializers import BillingSerializer, BillingTransactionSerializer
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from log.models import BillingErrorLogModel
from shared.views import CustomPagination
from shared.utils import generate_public_id
from django.utils.translation import gettext_lazy as _


class TopUpView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description="Top up balance...", request_body=BillingSerializer,
                         tags=["Billing"])
    def post(self, request):
        try:
            with transaction.atomic():
                serializer = BillingSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)

                invoice = generate_public_id()
                serializer.save(user=request.user, invoice=invoice)

                return Response(data={"invoice": invoice}, status=status.HTTP_200_OK)
        except:
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BillingInfoView(APIView):
    @swagger_auto_schema(operation_description="Billing info...", request_body=BillingTransactionSerializer,
                         tags=["Billing"])
    def post(self, request):
        try:
            serializer = BillingTransactionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data
            params = validated_data["params"]
            data = {
                "jsonrpc": validated_data["jsonrpc"],
                "id": validated_data["id"],
                "result": None
            }

            billing = BillingModel.objects.filter(invoice=params["invoice"]).first()

            if billing is None:
                data["error"] = {
                    "code": -1,
                    "message": "Data not found."
                }
                BillingErrorLogModel.objects.create(message=data["error"]["message"], method="info",
                                                    code=data["error"]["code"], invoice=params["invoice"])
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)

            if billing.status == "completed":
                data["error"] = {
                    "code": -2,
                    "message": "The transaction has been completed."
                }

                BillingErrorLogModel.objects.create(message=data["error"]["message"], method="info",
                                                    code=data["error"]["code"], invoice=params["invoice"])
                return Response(data=data, status=status.HTTP_409_CONFLICT)

            if billing.status == "failed":
                data["error"] = {
                    "code": -4,
                    "message": "The transaction has failed."
                }
                BillingErrorLogModel.objects.create(message=data["error"]["message"], method="info",
                                                    code=data["error"]["code"], invoice=params["invoice"])
                return Response(data=data, status=status.HTTP_409_CONFLICT)

            data["result"] = {
                "invoice": billing.invoice,
                "amount": billing.amount * 100
            }

            return Response(data=data, status=status.HTTP_200_OK)

        except Exception as e:
            BillingErrorLogModel.objects.create(message=str(e), method="info")
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BillingPayView(APIView):
    @swagger_auto_schema(operation_description="Billing pay...", request_body=BillingTransactionSerializer,
                         tags=["Billing"])
    def post(self, request):
        try:
            serializer = BillingTransactionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data
            params = validated_data["params"]

            data = {
                "jsonrpc": validated_data["jsonrpc"],
                "id": validated_data["id"],
                "result": None
            }
            with transaction.atomic():
                billing = BillingModel.objects.select_for_update().filter(invoice=params["invoice"]).first()

                if billing is None:
                    data["error"] = {
                        "code": -1,
                        "message": "Data not found."
                    }
                    BillingErrorLogModel.objects.create(message=data["error"]["message"], method="pay",
                                                        code=data["error"]["code"], invoice=params["invoice"])
                    return Response(data=data, status=status.HTTP_404_NOT_FOUND)

                if billing.status == "completed":
                    data["error"] = {
                        "code": -2,
                        "message": "The transaction has been completed."
                    }

                    BillingErrorLogModel.objects.create(message=data["error"]["message"], method="pay",
                                                        code=data["error"]["code"], invoice=params["invoice"],
                                                        transaction_id=params["xaznaTransactionId"])
                    return Response(data=data, status=status.HTTP_409_CONFLICT)

                if billing.status == "failed":
                    data["error"] = {
                        "code": -4,
                        "message": "The transaction has failed."
                    }
                    BillingErrorLogModel.objects.create(message=data["error"]["message"], method="pay",
                                                        code=data["error"]["code"], invoice=params["invoice"],
                                                        transaction_id=params["xaznaTransactionId"])
                    return Response(data=data, status=status.HTTP_409_CONFLICT)

                if billing.amount * 100 != params["amount"]:
                    data["error"] = {
                        "code": -4,
                        "message": "Transaction amount mismatch."
                    }
                    BillingErrorLogModel.objects.create(message=data["error"]["message"], method="pay",
                                                        code=data["error"]["code"], invoice=params["invoice"],
                                                        transaction_id=params["xaznaTransactionId"])
                    return Response(data=data, status=status.HTTP_409_CONFLICT)

                billing.transaction_id = params["xaznaTransactionId"]
                billing.status = "completed"
                balance = BalanceModel.objects.select_for_update().get(user=billing.user)
                balance.cash += params["amount"] / 100
                billing.save()
                balance.save()

                data["result"] = {
                    "message": "The transaction has been successfully processed.",
                    "code": 0
                }

                return Response(data=data, status=status.HTTP_200_OK)

        except Exception as e:
            BillingErrorLogModel.objects.create(message=str(e), method="pay")
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BillingCheckView(APIView):
    @swagger_auto_schema(operation_description="Billing check...", request_body=BillingTransactionSerializer,
                         tags=["Billing"])
    def post(self, request):
        try:
            serializer = BillingTransactionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data
            params = validated_data["params"]

            data = {
                "jsonrpc": validated_data["jsonrpc"],
                "id": validated_data["id"],
                "result": None
            }

            billing = BillingModel.objects.filter(transaction_id__isnull=False,
                                                  transaction_id=params["xaznaTransactionId"]).first()

            if billing is None:
                data["error"] = {
                    "code": -1,
                    "message": "Data not found."
                }

                BillingErrorLogModel.objects.create(message=data["error"]["message"], method="check",
                                                    code=data["error"]["code"],
                                                    transaction_id=params["xaznaTransactionId"])
                return Response(data=data, status=status.HTTP_404_NOT_FOUND)

            if billing.status == "completed":
                billing.transaction_id = params["xaznaTransactionId"]
                billing.status = "completed"
                billing.save()

                data["result"] = {
                    "xaznaTransactionId": params["xaznaTransactionId"],
                    "success": True
                }

                return Response(data=data, status=status.HTTP_200_OK)

            data["error"] = {
                "code": -4,
                "message": "The transaction has failed."
            }
            BillingErrorLogModel.objects.create(message=data["error"]["message"], method="check",
                                                code=data["error"]["code"], invoice=params["invoice"],
                                                transaction_id=params["xaznaTransactionId"])

            return Response(data=data, status=status.HTTP_409_CONFLICT)



        except Exception as e:
            BillingErrorLogModel.objects.create(message=str(e), method="check")
            return Response(data={"message": _("Something went wrong.")}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BillingListView(APIView):
    auth_required = True

    @swagger_auto_schema(operation_description='Transaction list...', tags=["Billing"])
    def get(self, request):
        ordering = request.query_params.get('ordering', '-created_at')

        queryset = BillingModel.objects.filter(user=request.user).order_by(ordering)

        paginator = CustomPagination()
        paginated_qs = paginator.paginate_queryset(queryset, request)

        serializer = BillingSerializer(paginated_qs, many=True)

        return paginator.get_paginated_response(serializer.data)
