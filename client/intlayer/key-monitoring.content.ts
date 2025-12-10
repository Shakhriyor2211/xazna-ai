import { type Dictionary, t } from "intlayer";

const keyMonitoringContent = {
    key: "key-monitoring-content",
    live: true,
    content: {
        title: t({
            uz: "Kalit monitoringi",
            en: "Key monitoring",
            ru: "Мониторинг ключа",
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
                uz: "AI Xazna | Kalit Monitoringi",
                en: "AI Xazna | Key Monitoring",
                ru: "AI Xazna | Мониторинг ключа",
            }),

            description: t({
                uz: "AI Xazna kalitingizning ishlatilishini kuzatish va monitoring qilish uchun ushbu sahifadan foydalaning. Har bir so‘rov faoliyati qayd etiladi.",
                en: "Use this page to monitor and track the usage of your AI Xazna key. All requests are logged for monitoring.",
                ru: "Используйте эту страницу для отслеживания и мониторинга использования вашего ключа AI Xazna. Все запросы фиксируются для контроля.",
            }),

            keywords: t({
                uz: "AI Xazna, kalit, monitoring, ishlatilish, TTS, STT, LLM",
                en: "AI Xazna, key, monitoring, usage, TTS, STT, LLM",
                ru: "AI Xazna, ключ, мониторинг, использование, TTS, STT, LLM",
            }),

            robots: {
                index: false,
                follow: false,
            },
        },


    },
} satisfies Dictionary;

export default keyMonitoringContent;
