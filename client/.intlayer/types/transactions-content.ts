/* eslint-disable */
export default {
  "key": "transactions-content",
  "content": {
    "nodeType": "translation",
    "translation": {
      "uz": {
        "title": "Tranzaksiyalar",
        "table": {
          "empty": "Hozircha hech qanday maʼlumot yoʻq.",
          "head": {
            "amount": "Summasi",
            "invoice": "Invoys",
            "status": "Holati",
            "created_at": "Yaratilgan vaqti"
          },
          "rows": "Qatorlar"
        },
        "top_up": {
          "title": "Balansni to‘ldirish",
          "modal": {
            "form": {
              "amount": {
                "label": "Summasi"
              },
              "buttons": {
                "submit": "Davom etish",
                "cancel": "Bekor qilish"
              }
            }
          }
        },
        "errors": {
          "form": {
            "amount": {
              "required": "Ushbu qator to'ldirilishi shart.",
              "minimum": "Minimal balansni to'ldirish summasi"
            }
          },
          "server": "Serverda ichki xato yuz berdi."
        },
        "metadata": {
          "title": "AI Xazna | Tranzaksiyalar",
          "description": "Ushbu sahifa orqali AI Xazna hisobingizdagi barcha tranzaksiyalarni kuzatishingiz mumkin. To‘lovlar, balans to‘ldirish va foydalanuvchi faoliyati qayd etiladi.",
          "keywords": "AI Xazna, tranzaksiyalar, balans, to‘lov, tarix, hisob",
          "robots": {
            "index": false,
            "follow": false
          }
        }
      },
      "en": {
        "title": "Transactions",
        "table": {
          "empty": "There is no data yet.",
          "head": {
            "amount": "Amount",
            "invoice": "Invoice",
            "status": "Status",
            "created_at": "Created at"
          },
          "rows": "Rows"
        },
        "top_up": {
          "title": "Top up",
          "modal": {
            "form": {
              "amount": {
                "label": "Amount"
              },
              "buttons": {
                "submit": "Continue",
                "cancel": "Cancel"
              }
            }
          }
        },
        "errors": {
          "form": {
            "amount": {
              "required": "This field is required.",
              "minimum": "Minimum top-up amount is"
            }
          },
          "server": "Internal server error."
        },
        "metadata": {
          "title": "AI Xazna | Transactions",
          "description": "Track all transactions in your AI Xazna account, including payments, top-ups, and activity history.",
          "keywords": "AI Xazna, transactions, balance, payment, history, account",
          "robots": {
            "index": false,
            "follow": false
          }
        }
      },
      "ru": {
        "title": "Транзакции",
        "table": {
          "empty": "Данных пока нет.",
          "head": {
            "amount": "Сумма",
            "invoice": "Инвойс",
            "status": "Статус",
            "created_at": "Создано"
          },
          "rows": "Строки"
        },
        "top_up": {
          "title": "Пополнить баланс",
          "modal": {
            "form": {
              "amount": {
                "label": "Сумма"
              },
              "buttons": {
                "submit": "Продолжить",
                "cancel": "Отмена"
              }
            }
          }
        },
        "errors": {
          "form": {
            "amount": {
              "required": "Это поле обязательно для заполнения.",
              "minimum": "Минимальная сумма пополнения"
            }
          },
          "server": "Внутренняя ошибка сервера."
        },
        "metadata": {
          "title": "AI Xazna | Транзакции",
          "description": "На этой странице вы можете отслеживать все транзакции вашего аккаунта AI Xazna, включая платежи, пополнения и историю активности.",
          "keywords": "AI Xazna, транзакции, баланс, платеж, история, аккаунт",
          "robots": {
            "index": false,
            "follow": false
          }
        }
      }
    }
  },
  "localIds": [
    "transactions-content::local::src/intlayer/transactions.content.ts"
  ]
} as const;
