import { type Dictionary, t } from "intlayer";

const subContent = {
    key: "sub-content",
    live: true,
    content: {
        title: t({
            uz: "Obuna",
            en: "Subscription",
            ru: "Подписка",
        }),
        range: {
            monthly: t({
                uz: "Oylik",
                ru: "Ежемесячный",
                en: "Monthly",
            }),
            annual: t({
                uz: "Yillik",
                ru: "Еежегодный",
                en: "Annual",
            })
        },
        card: {
            credit_range: {
                monthly: t({
                    uz: "kredit/oy",
                    ru: "кредитов/месяц",
                    en: "credits/month",
                }),
                annual: t({
                    uz: "kredit/yil",
                    ru: "кредитов/год",
                    en: "credits/year",
                }),
            },
            price_range: {
                monthly: t({
                    uz: "oyiga",
                    ru: "в месяц",
                    en: "per month",
                }),
                annual: t({
                    uz: "yiliga",
                    ru: "в год",
                    en: "per year",
                })
            },
            change: {
                title: t({
                    uz: "Obuna bo'lish",
                    ru: "Подписаться",
                    en: "Subscribe",
                }),
                modal: {
                    title: t({
                        uz: "Rejani o‘zgartirish",
                        ru: "Изменить план",
                        en: "Change plan",
                    }),
                    description: t({
                        uz: "Rejangizni o‘zgartirishni davom ettirmoqchimisiz?",
                        ru: "Вы хотите продолжить изменение плана?",
                        en: "Do you want to proceed changing your plan?",
                    }),
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
                    }
                }
            },
            restart: {
                title: t({
                    uz: "Qayta ishga tushirish",
                    ru: "Перезапустить",
                    en: "Restart",
                }),
                modal: {
                    title: t({
                        uz: "Rejani qayta ishga tushirish",
                        ru: "Перезапуск плана",
                        en: "Restart plan",
                    }),
                    description: t({
                        uz: "Rejangizni qayta ishga tushirishni davom ettirmoqchimisiz?",
                        ru: "Вы хотите продолжить перезапуск плана?",
                        en: "Do you want to proceed restarting your plan?",
                    }),
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
                    }
                }
            },
            buttons: {
                contact: t({
                    uz: "Savdo bilan bog‘lanish",
                    ru: "Связаться с отделом продаж",
                    en: "Contact sales",
                }),
            }
        },
        manage: {
            title: t({
                uz: "Boshqarish",
                ru: "Управление",
                en: "Manage",
            }),
            modal: {
                title: t({
                    uz: "Boshqarish",
                    ru: "Управление",
                    en: "Manage",
                }),
                plan: t({
                    uz: "Reja",
                    ru: "План",
                    en: "Plan",
                }),
                credits: t({
                    uz: "Kreditlar",
                    ru: "Кредиты",
                    en: "Credits",
                }),
                cost: t({
                    uz: "Narx",
                    ru: "Стоимость",
                    en: "Cost",
                }),
                auto_renew: t({
                    uz: "Avto yangilash",
                    ru: "Автопродление",
                    en: "Auto renew",
                }),
                cash_charge: t({
                    uz: "Balansni to'ldirish",
                    ru: "Пополнить баланс",
                    en: "Cash charge",
                })
            },
        },
        tab: {
            chatbot: t({
                uz: "Chatbot",
                en: "Chatbot",
                ru: "Чат-бот",
            }),

            stt: t({
                uz: "Nutqdan matnga",
                en: "Speech to text",
                ru: "Речь в текст",
            }),
            tts: t({
                uz: "Matndan nutqqa",
                en: "Text to speech",
                ru: "Текст в речь",
            }),
        },
        table: {
            empty: t({
                uz: "Hozircha hech qanday maʼlumot yoʻq.",
                en: "There is no data yet.",
                ru: "Данных пока нет.",
            }),
            head: {
                credit_rate: t({
                    uz: "Kredit limiti",
                    en: "Credit limit",
                    ru: "Лимит кредита",
                }),
                session_rate: t({
                    uz: "Sessiya limiti",
                    en: "Session limit",
                    ru: "Лимит сессий",
                }),

                credit_usage: t({
                    uz: "Kreditdan foydalanish",
                    en: "Credit usage",
                    ru: "Использование кредита",
                }),
                cash_usage: t({
                    uz: "Naqd puldan foydalanish",
                    en: "Cash usage",
                    ru: "Использование денежных средств",
                }),
            },
            minute: t({
                uz: "min",
                en: "min",
                ru: "мин",
            }),
            character: t({
                uz: "belgi",
                en: "chars",
                ru: "символов",
            })

        },

        success: {
            change: t({
                uz: "Rejangiz muvaffaqiyatli o‘zgartirildi.",
                ru: "Ваш план успешно изменён.",
                en: "Your plan changed successfully.",
            }),
            restart: t({
                uz: "Rejangiz muvaffaqiyatli qayta ishga tushirildi.",
                ru: "Ваш план успешно перезапущен.",
                en: "Your plan restarted successfully.",
            })
        },
        errors: {
            server: t({
                uz: "Serverda ichki xato yuz berdi.",
                ru: "Внутренняя ошибка сервера.",
                en: "Internal server error.",
            })
        },

        metadata: {
            title: t({
                uz: "AI Xazna | Obunalar",
                en: "AI Xazna | Subscriptions",
                ru: "AI Xazna | Подписки",
            }),

            description: t({
                uz: "AI Xazna obunalari — ehtiyojingizga mos rejani tanlab, xizmatlardan cheklovlarsiz foydalaning.",
                en: "Explore AI Xazna subscription plans and choose the one that fits your needs.",
                ru: "Ознакомьтесь с планами подписки AI Xazna и выберите подходящий для себя.",
            }),

            keywords: t({
                uz: "AI Xazna, obuna, reja, narxlar, to'lov, premium",
                en: "AI Xazna, subscription, plans, pricing, upgrade, premium",
                ru: "AI Xazna, подписка, планы, цены, обновление, премиум",
            }),

            robots: {
                index: false,
                follow: false,
            },
        },
    }

} satisfies Dictionary;

export default subContent;
