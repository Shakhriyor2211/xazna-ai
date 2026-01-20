from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch
from decimal import Decimal

from billing.models import BillingModel
from log.models import BillingErrorLogModel

User = get_user_model()


def authorize(client):
    data = {"email": "test@example.com", "password": "testpass123"}
    response = client.post("/api/v1/auth/sign-in", data, format="json")
    return response.cookies["access_token"].value


def info_request_data(payment_id="1234", invoice="INV-123"):
    return {
        "jsonrpc": "2.0",
        "method": "get.info",
        "id": payment_id,
        "params": {
            "invoice": invoice
        }
    }

def pay_request_data(payment_id="1234", invoice="INV-123", transaction_id="TXN-123", amount=Decimal("100.00")):
    return {
        "jsonrpc": "2.0",
        "method": "pay",
        "id": payment_id,
        "params": {
            "invoice": invoice,
            "amount": amount,
            "xaznaTransactionId": transaction_id
        }
    }

def check_request_data(payment_id="1234", transaction_id="TXN-123"):
    return {
        "jsonrpc": "2.0",
        "method": "check",
        "id": payment_id,
        "params": {
            "xaznaTransactionId": transaction_id
        }
    }

class BillingViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="test@example.com",
            first_name="Test",
            last_name="Test",
            password="testpass123",
            is_active=True
        )

    def test_successful_top_up(self):
        self.client.cookies["access_token"] = authorize(self.client)

        """Test successful balance top-up"""
        data = {
            "amount": 100.00
        }

        with patch("billing.views.generate_public_id") as mock_generate_id:
            mock_generate_id.return_value = "INV-123456"

            response = self.client.post("/api/v1/billing/top-up", data, format="json")

            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertIn("invoice", response.data)
            self.assertEqual(response.data["invoice"], "INV-123456")

        self.assertTrue(BillingModel.objects.filter(invoice="INV-123456").exists())

        billing = BillingModel.objects.get(invoice="INV-123456")
        self.assertEqual(billing.user, self.user)
        self.assertEqual(billing.amount, Decimal("100.00"))
        self.assertEqual(billing.status, "pending")

    def test_top_up_without_authentication(self):
        """Test top-up without authentication"""
        data = {"amount": 100.00}

        response = self.client.post("/api/v1/billing/top-up", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_billing_info_succeed(self):
        """Test successful retrieval of billing information"""

        BillingModel.objects.create(
            user=self.user,
            invoice="INV-SUCCEED",
            amount=Decimal("100.00"),
            status="pending"
        )

        data = info_request_data("1234", "INV-SUCCEED")

        response = self.client.post("/api/v1/billing/info", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data, {"jsonrpc": "2.0", "id": "1234",
                                             "result": {"amount": Decimal("100.00") * 100, "invoice": "INV-SUCCEED"}})

    def test_billing_info_not_found(self):
        """Test billing info when invoice doesn"t exist"""
        data = info_request_data("1234", "INV-NOT-FOUND")
        response = self.client.post("/api/v1/billing/info", data, format="json")


        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["result"], None)

        self.assertEqual(response.data["error"]["code"], -1)
        self.assertEqual(response.data["error"]["message"], "Data not found.")

        error_log = BillingErrorLogModel.objects.filter(method="info", invoice="INV-NOT-FOUND").first()

        self.assertIsNotNone(error_log)
        self.assertEqual(error_log.code, -1)
        self.assertEqual(error_log.message, "Data not found.")

    def test_billing_info_completed(self):
        """Test billing info for already completed transaction"""

        BillingModel.objects.create(
            user=self.user,
            invoice="INV-COMPLETED",
            transaction_id="TXN-123",
            amount=Decimal("100.00"),
            status="completed"
        )

        data = info_request_data("1234", "INV-COMPLETED")

        response = self.client.post("/api/v1/billing/info", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["result"], None)

        self.assertEqual(response.data["error"]["code"], -2)
        self.assertEqual(response.data["error"]["message"], "The transaction has been completed.")

        error_log = BillingErrorLogModel.objects.filter(method="info", invoice="INV-COMPLETED").first()

        self.assertIsNotNone(error_log)
        self.assertEqual(error_log.code, -2)
        self.assertEqual(error_log.message, "The transaction has been completed.")

    def test_billing_info_failed(self):
        """Test billing info for already completed transaction"""

        BillingModel.objects.create(
            user=self.user,
            invoice="INV-FAILED",
            amount=Decimal("100.00"),
            status="failed"
        )

        data = info_request_data("1234", "INV-FAILED")
        response = self.client.post("/api/v1/billing/info", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["result"], None)

        self.assertEqual(response.data["error"]["code"], -4)
        self.assertEqual(response.data["error"]["message"], "The transaction has failed.")

        error_log = BillingErrorLogModel.objects.filter(method="info", invoice="INV-FAILED").first()

        self.assertIsNotNone(error_log)
        self.assertEqual(error_log.code, -4)
        self.assertEqual(error_log.message, "The transaction has failed.")

    def test_billing_pay_succeed(self):
        """Test successful retrieval of billing pay"""

        BillingModel.objects.create(
            user=self.user,
            invoice="INV-SUCCEED",
            amount=Decimal("100.00"),
            status="pending"
        )

        data = pay_request_data("1234", "INV-SUCCEED", "TXN-123", Decimal("100.00") * 100)
        response = self.client.post("/api/v1/billing/pay", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data, {"jsonrpc": "2.0", "id": "1234",
                                             "result": {"message": "success", "code": 0}})

    def test_billing_pay_not_found(self):
        """Test billing pay when invoice doesn"t exist"""
        data = pay_request_data("1234", "INV-NOT-FOUND", "TXN-123", Decimal("100.00") * 100)
        response = self.client.post("/api/v1/billing/pay", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["result"], None)

        self.assertEqual(response.data["error"]["code"], -1)
        self.assertEqual(response.data["error"]["message"], "Data not found.")

        error_log = BillingErrorLogModel.objects.filter(method="pay", invoice="INV-NOT-FOUND").first()

        self.assertIsNotNone(error_log)
        self.assertEqual(error_log.code, -1)
        self.assertEqual(error_log.message, "Data not found.")

    def test_billing_pay_completed(self):
        """Test billing pay for already completed transaction"""

        BillingModel.objects.create(
            user=self.user,
            invoice="INV-COMPLETED",
            transaction_id="TXN-123",
            amount=Decimal("100.00"),
            status="completed"
        )

        data = pay_request_data("1234", "INV-COMPLETED", "TXN-123", Decimal("100.00") * 100)
        response = self.client.post("/api/v1/billing/pay", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["result"], None)

        self.assertEqual(response.data["error"]["code"], -2)
        self.assertEqual(response.data["error"]["message"], "The transaction has been completed.")

        error_log = BillingErrorLogModel.objects.filter(method="pay", invoice="INV-COMPLETED").first()

        self.assertIsNotNone(error_log)
        self.assertEqual(error_log.code, -2)
        self.assertEqual(error_log.message, "The transaction has been completed.")

    def test_billing_pay_failed(self):
        """Test billing pay for already completed transaction"""

        BillingModel.objects.create(
            user=self.user,
            invoice="INV-FAILED",
            amount=Decimal("100.00"),
            status="failed"
        )

        data = pay_request_data("1234", "INV-FAILED", "TXN-123", Decimal("100.00") * 100)
        response = self.client.post("/api/v1/billing/pay", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["result"], None)

        self.assertEqual(response.data["error"]["code"], -4)
        self.assertEqual(response.data["error"]["message"], "The transaction has failed.")

        error_log = BillingErrorLogModel.objects.filter(method="pay", invoice="INV-FAILED").first()

        self.assertIsNotNone(error_log)
        self.assertEqual(error_log.code, -4)
        self.assertEqual(error_log.message, "The transaction has failed.")

    def test_billing_pay_amount_mismatch(self):
        BillingModel.objects.create(
            user=self.user,
            invoice="INV-AMOUNT-MISMATCH",
            amount=Decimal("100.00"),
            status="pending"
        )

        data = pay_request_data("1234", "INV-AMOUNT-MISMATCH", "TXN-123", Decimal("100.00"))
        response = self.client.post("/api/v1/billing/pay", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["result"], None)

        self.assertEqual(response.data["error"]["code"], -4)
        self.assertEqual(response.data["error"]["message"], "Transaction amount mismatch.")

        error_log = BillingErrorLogModel.objects.filter(method="pay", invoice="INV-AMOUNT-MISMATCH").first()

        self.assertIsNotNone(error_log)
        self.assertEqual(error_log.code, -4)
        self.assertEqual(error_log.message, "Transaction amount mismatch.")

    def test_billing_check_succeed(self):
        """Test successful retrieval of billing pay"""

        BillingModel.objects.create(
            user=self.user,
            invoice="INV-SUCCEED",
            transaction_id="TXN-SUCCEED",
            amount=Decimal("100.00"),
            status="pending"
        )

        data = check_request_data("1234", "TXN-SUCCEED")
        response = self.client.post("/api/v1/billing/check", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.data, {"jsonrpc": "2.0", "id": "1234",
                                             "result": {"xaznaTransId": "TXN-SUCCEED", "success": True}})

    def test_billing_check_not_found(self):
        """Test billing pay when invoice doesn"t exist"""
        data = check_request_data("1234", "TXN-NOT-FOUND")
        response = self.client.post("/api/v1/billing/check", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"]["code"], -1)
        self.assertEqual(response.data["error"]["message"], "Data not found.")

        error_log = BillingErrorLogModel.objects.filter(method="check", transaction_id="TXN-NOT-FOUND").first()

        self.assertIsNotNone(error_log)
        self.assertEqual(error_log.code, -1)
        self.assertEqual(error_log.message, "Data not found.")

    def test_billing_check_completed(self):
        """Test billing pay for already completed transaction"""

        BillingModel.objects.create(
            user=self.user,
            invoice="INV-COMPLETED",
            transaction_id="TXN-COMPLETED",
            amount=Decimal("100.00"),
            status="completed"
        )

        data = check_request_data("1234", "TXN-COMPLETED")
        response = self.client.post("/api/v1/billing/check", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"]["code"], -2)
        self.assertEqual(response.data["error"]["message"], "The transaction has been completed.")

        error_log = BillingErrorLogModel.objects.filter(method="check", transaction_id="TXN-COMPLETED").first()

        self.assertIsNotNone(error_log)
        self.assertEqual(error_log.code, -2)
        self.assertEqual(error_log.message, "The transaction has been completed.")

    def test_billing_check_failed(self):
        """Test billing pay for already completed transaction"""

        BillingModel.objects.create(
            user=self.user,
            invoice="INV-FAILED",
            transaction_id="TXN-FAILED",
            amount=Decimal("100.00"),
            status="failed"
        )

        data = check_request_data("1234", "TXN-FAILED")
        response = self.client.post("/api/v1/billing/check", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"]["code"], -4)
        self.assertEqual(response.data["error"]["message"], "The transaction has failed.")

        error_log = BillingErrorLogModel.objects.filter(method="check", transaction_id="TXN-FAILED").first()

        self.assertIsNotNone(error_log)
        self.assertEqual(error_log.code, -4)
        self.assertEqual(error_log.message, "The transaction has failed.")






