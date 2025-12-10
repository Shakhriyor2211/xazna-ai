import { type Dictionary, t } from "intlayer";

const userMonitoringContent = {
    key: "user-monitoring-content",
    live: true,
    content: {
        title: t({
            uz: "Monitoring",
            en: "Monitoring",
            ru: "Мониторинг",
        }),
        table: {
            empty: t({
                uz: "Hozircha hech qanday maʼlumot yoʻq.",
                en: "There is no data yet.",
                ru: "Данных пока нет.",
            }),
            head: {
                operation: t({
                    uz: "Amal",
                    en: "Operation",
                    ru: "Операция",
                }),
                credit: t({
                    uz: "Kredit",
                    en: "Credit",
                    ru: "Кредит",
                }),
                cash: t({
                    uz: "Naqd",
                    en: "Cash",
                    ru: "Наличные",
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
        errors: {
            server: t({
                uz: "Serverda ichki xato yuz berdi.",
                ru: "Внутренняя ошибка сервера.",
                en: "Internal server error."

            })
        },
        metadata: {
            title: t({
                uz: "AI Xazna | Monitoring",
                en: "AI Xazna | Monitoring",
                ru: "AI Xazna | Мониторинг",
            }),

            description: t({
                uz: "Ushbu sahifa orqali AI Xazna hisobingiz faoliyatini kuzatishingiz mumkin. Barcha so‘rovlar va tizimdan foydalanish tarixi monitoring uchun qayd etiladi.",
                en: "Use this page to monitor the activity of your AI Xazna account. All requests and usage history are logged for monitoring purposes.",
                ru: "На этой странице вы можете отслеживать активность вашего аккаунта AI Xazna. Все запросы и история использования фиксируются для мониторинга.",
            }),

            keywords: t({
                uz: "AI Xazna, monitoring, foydalanuvchi, faoliyat, tarix",
                en: "AI Xazna, monitoring, user, activity, history",
                ru: "AI Xazna, мониторинг, пользователь, активность, история",
            }),

            robots: {
                index: false,
                follow: false,
            },
        }
    },
} satisfies Dictionary;

export default userMonitoringContent;
