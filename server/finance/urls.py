from django.urls import path
from django.urls.conf import include
from finance.views import BalanceManageView, BalanceTopUpView, TransactionListView, \
    BalanceView, UserExpenseListView, TokenExpenseListView, UserExpenseItemView, TokenExpenseItemView, \
    UserTokenExpenseListView

user_patterns = [
    path("expense/list", UserExpenseListView.as_view(), name="user_expense_list"),
    path("token/expense/list/<uuid:token_id>", UserTokenExpenseListView.as_view(), name="user_token_expense_list"),
    path("item/<uuid:expense_id>", UserExpenseItemView.as_view(), name="user_expense_item")
]

token_patterns = [
    path("expense/list", TokenExpenseListView.as_view(), name="token_expense_list"),
    path("item/<uuid:expense_id>", TokenExpenseItemView.as_view(), name="token_expense_item")
]
urlpatterns = [
    path("info", BalanceView.as_view(), name="balance_info"),
    path("balance/manage", BalanceManageView.as_view(), name="balance_manage"),
    path("balance/top-up", BalanceTopUpView.as_view(), name="balance_top_up"),
    path("transaction/list", TransactionListView.as_view(), name="transaction_list"),
    path("user/", include(user_patterns)),
    path("token/", include(token_patterns))
]