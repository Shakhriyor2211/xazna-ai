import { dropdown } from "@heroui/theme";
import { type Dictionary, t } from "intlayer";

const chatbotContent = {
    key: "chatbot-content",
    live: true,
    content: {
        new_chat: {
            title: t({
                uz: "Chatbot",
                en: "Chatbot",
                ru: "Чатбот",
            }),
            greeting: t({
                uz: "Bugun nimani o'ylayapsiz?",
                ru: "О чём вы думаете сегодня?",
                en: "What’s on your mind today?"
            }),
            form: {
                message: {
                    label: t({
                        uz: "Biror narsa so'rang ...",
                        ru: "Спросить что-нибудь ...",
                        en: "Ask anything ..."
                    })
                }
            },
        },

        session: {
            title: t({
                uz: "Chatbot",
                en: "Chatbot",
                ru: "Чатбот",
            }),
            form: {
                message: {
                    label: t({
                        uz: "Biror narsa so'rang ...",
                        ru: "Спросить что-нибудь ...",
                        en: "Ask anything ..."
                    })
                }
            },
            dropdown: {
                edit: {
                    title: t({
                        uz: "Tahrirlash",
                        ru: "Редактировать",
                        en: "Edit",
                    }),
                    modal: {
                        title: t({
                            uz: "Sessiyani qayta nomlash",
                            ru: "Переименовать сессию",
                            en: "Rename session",
                        }),
                        form: {
                            title: {
                                label: t({
                                    uz: "Sarlavha",
                                    ru: "Заголовок",
                                    en: "Title",
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
                        },
                    },
                },
                delete: {
                    title: t({
                        uz: "O'chirish",
                        ru: "Удалить",
                        en: "Delete",
                    }),
                    modal: {
                        title: t({
                            uz: "Sessiyani o'chirish",
                            ru: "Удалить сессию",
                            en: "Delete session",
                        }),
                        description: t({
                            uz: "Ishni davom ettirmoqchimisiz? Bu amal maʼlumotlarni doimiy o'chiradi.",
                            ru: "Вы уверены, что хотите продолжить? Это действие навсегда удалит данные.",
                            en: "Are you sure you want to proceed? This action will permanently delete the data.",
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
                        },
                    },
                },
            },

        },
        errors: {
            session: {
                server: t({
                    uz: "Serverda ichki xato yuz berdi.",
                    ru: "Внутренняя ошибка сервера.",
                    en: "Internal server error."

                })
            },
            new_chat: {
                server: t({
                    uz: "Serverda ichki xato yuz berdi.",
                    ru: "Внутренняя ошибка сервера.",
                    en: "Internal server error."

                })
            }
        },
        metadata: {
            title: t({
                uz: "AI Xazna | Chatbot",
                en: "AI Xazna | Chatbot",
                ru: "AI Xazna | Чатбот",
            }),

            description: t({
                uz: "AI Xazna chatbot — tabiiy tilni tushunishga asoslangan, savollarga javob beruvchi va foydalanuvchilarga yordam beruvchi sun’iy intellekt yordamchisi.",
                en: "AI Xazna chatbot is an AI assistant powered by natural language understanding, capable of answering questions and helping users with various tasks.",
                ru: "Чатбот AI Xazna — это интеллектуальный помощник, основанный на понимании естественного языка, который отвечает на вопросы и помогает пользователям.",
            }),

            keywords: t({
                uz: "AI Xazna, chatbot, AI yordamchi, sun’iy intellekt, til modeli, suhbatlashuvchi yordamchi",
                en: "AI Xazna, chatbot, AI assistant, artificial intelligence, language model, conversational assistant",
                ru: "AI Xazna, чатбот, AI помощник, искусственный интеллект, языковая модель, разговорный помощник",
            }),
            robots: {
                index: false,
                follow: false,
            },
        }
    },
} satisfies Dictionary;

export default chatbotContent;
