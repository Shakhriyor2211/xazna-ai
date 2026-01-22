import { currency, type Dictionary, t } from "intlayer";

const transactionsContent = {
    key: "transactions-content",
    live: true,
    content: {
        title: t({
            uz: "Tranzaksiyalar",
            en: "Transactions",
            ru: "Транзакции",
        }),
        table: {
            empty: t({
                uz: "Hozircha hech qanday maʼlumot yoʻq.",
                en: "There is no data yet.",
                ru: "Данных пока нет.",
            }),
            head: {
                amount: t({
                    uz: "Summasi",
                    en: "Amount",
                    ru: "Сумма",
                }),
                invoice: t({
                    uz: "Invoys",
                    en: "Invoice",
                    ru: "Инвойс",
                }),
                status: t({
                    uz: "Holati",
                    en: "Status",
                    ru: "Статус",
                }),
                created_at: t({
                    uz: "Yaratilgan vaqti",
                    en: "Created at",
                    ru: "Создано",
                }),
            },
            rows: t({
                uz: "Qatorlar",
                en: "Rows",
                ru: "Строки",
            })
        },
        top_up: {
            title: t({
                uz: "Balansni to‘ldirish",
                en: "Top up",
                ru: "Пополнить баланс",
            }),
            modal: {
                form: {
                    amount: {
                        label: t({
                            uz: "Summasi",
                            en: "Amount",
                            ru: "Сумма",
                        }),
                    },
                    buttons: {
                        submit: t({
                            uz: "Davom etish",
                            ru: "Продолжить",
                            en: "Continue",
                        }),
                        cancel: t({
                            uz: "Bekor qilish",
                            ru: "Отмена",
                            en: "Cancel",
                        }),
                    },
                }
            }
        },
        errors: {
            form: {
                amount: {
                    required: t({
                        uz: "Ushbu qator to'ldirilishi shart.",
                        ru: "Это поле обязательно для заполнения.",
                        en: "This field is required.",
                    }),
                    minimum: t({
                        uz: "Minimal balansni to'ldirish summasi",
                        ru: "Минимальная сумма пополнения",
                        en: "Minimum top-up amount is",
                    }),
                }
            },
            server: t({
                uz: "Serverda ichki xato yuz berdi.",
                ru: "Внутренняя ошибка сервера.",
                en: "Internal server error.",
            })
        },
        metadata: {
            title: t({
                uz: "AI Xazna | Tranzaksiyalar",
                en: "AI Xazna | Transactions",
                ru: "AI Xazna | Транзакции",
            }),

            description: t({
                uz: "Ushbu sahifa orqali AI Xazna hisobingizdagi barcha tranzaksiyalarni kuzatishingiz mumkin. To‘lovlar, balans to‘ldirish va foydalanuvchi faoliyati qayd etiladi.",
                en: "Track all transactions in your AI Xazna account, including payments, top-ups, and activity history.",
                ru: "На этой странице вы можете отслеживать все транзакции вашего аккаунта AI Xazna, включая платежи, пополнения и историю активности.",
            }),

            keywords: t({
                uz: "AI Xazna, tranzaksiyalar, balans, to‘lov, tarix, hisob",
                en: "AI Xazna, transactions, balance, payment, history, account",
                ru: "AI Xazna, транзакции, баланс, платеж, история, аккаунт",
            }),

            robots: {
                index: false,
                follow: false,
            },
        }
    },
} satisfies Dictionary;

export default transactionsContent;
