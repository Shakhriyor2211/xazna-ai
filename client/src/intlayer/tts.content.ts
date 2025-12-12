import { type Dictionary, t } from "intlayer";

const ttsContent = {
    key: "tts-content",
    live: true,
    content: {
        title: t({
            uz: "Matndan nutqqa",
            en: "Text to speech",
            ru: "Текста в речь",
        }),
        form: {
            text: {
                label: t({
                    uz: "Matnni kiriting ...",
                    en: "Enter text ...",
                    ru: "Введите текст ...",
                })
            },
            buttons: {
                submit: t({
                    uz: "Yaratish",
                    ru: "Сгенерировать",
                    en: "Generate",
                }),
                cancel: t({
                    uz: "Bekor qilish",
                    ru: "Отмена",
                    en: "Cancel",
                })
            }

        },
        drawer: {
            buttons: {
                download: t({
                    uz: "Yuklab olish",
                    en: "Download",
                    ru: "Скачать",
                }),
            }
        },
        settings: {
            title: t({
                uz: "Sozlamalar",
                en: "Settings",
                ru: "Настройки",
            }),
            form: {
                select: {
                    model: {
                        label: t({
                            uz: "Model",
                            en: "Model",
                            ru: "Модель",
                        }),
                    },
                    emotion: {
                        label: t({
                            uz: "Emotsiya",
                            en: "Emotion",
                            ru: "Эмоция",
                        }),
                    },

                    format: {
                        label: t({
                            uz: "Audio format",
                            en: "Audio format",
                            ru: "Аудио формат",
                        }),
                    }
                }
            }
        },
        history: {
            title: t({
                uz: "Tarix",
                en: "History",
                ru: "История",
            }),
            empty: {
                load: t({
                    uz: "Hozircha hech qanday maʼlumot yoʻq.",
                    en: "There is no data yet.",
                    ru: "Данных пока нет.",
                }),
                search: t({
                    uz: "Hech narsa topilmadi.",
                    en: "Nothing found.",
                    ru: "Ничего не найдено.",
                })
            },
            form: {
                search: {
                    label: t({
                        uz: "Nom bo'yicha qidirish ...",
                        en: "Search by name ...",
                        ru: "Поиск по названию ...",
                    })
                }
            },
            modal: {
                title: t({
                    uz: "Ma'lumotlarni o'chirish",
                    ru: "Удалить данные",
                    en: "Delete data",
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
            buttons: {
                more: t({
                    uz: "Ko'proq",
                    en: "More",
                    ru: "Больше",
                }),
                less: t({
                    uz: "Kamroq",
                    en: "Less",
                    ru: "Меньше",
                }),
            },

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
                uz: "AI Xazna | Matndan nutqqa",
                en: "AI Xazna | Text-to-Speech",
                ru: "AI Xazna | Преобразование текста в речь",
            }),

            description: t({
                uz: "AI Xazna TTS — matnni tez va aniq tabiiy nutqqa aylantiruvchi sun'iy intellekt xizmati.",
                en: "AI Xazna TTS converts your text into clear, natural-sounding speech instantly.",
                ru: "AI Xazna TTS — сервис, который мгновенно преобразует текст в естественную речь.",
            }),

            keywords: t({
                uz: "AI Xazna, TTS, matndan nutqqa, ovoz yaratish, sun'iy intellekt",
                en: "AI Xazna, TTS, text to speech, voice synthesis, artificial intelligence",
                ru: "AI Xazna, TTS, текст в речь, синтез голоса, искусственный интеллект",
            }),

            robots: {
                index: false,
                follow: false,
            },
        },
    },
} satisfies Dictionary;

export default ttsContent;
