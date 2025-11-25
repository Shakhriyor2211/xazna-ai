from django.urls import path
from finance.views import BalanceManageAPIView, BalanceTopUpAPIView, TransactionListAPIView, \
    BalanceAPIView, UserExpenseListAPIView, TokenExpenseListAPIView

urlpatterns = [
    path("info", BalanceAPIView.as_view(), name="balance_info"),
    path("balance/manage", BalanceManageAPIView.as_view(), name="balance_manage"),
    path("balance/top-up", BalanceTopUpAPIView.as_view(), name="balance_top_up"),
    path("transaction/list", TransactionListAPIView.as_view(), name="transaction_list"),
    path("user/expense/list", UserExpenseListAPIView.as_view(), name="user_expense_list"),
    path("token/expense/list", TokenExpenseListAPIView.as_view(), name="token_expense_list"),

]
