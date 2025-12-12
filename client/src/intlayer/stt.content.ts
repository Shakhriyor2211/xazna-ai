import { type Dictionary, t } from "intlayer";

const sttContent = {
    key: "stt-content",
    live: true,
    content: {
        title: t({
            uz: "Nutqdan matnga",
            en: "Speech to text",
            ru: "Речь в текст",
        }),

        form: {
            file: {
                button: t({
                    uz: "Faylni tanlash",
                    en: "Browse file",
                    ru: "Выбрать файл",
                }),
                description: t({
                    uz: "MP3 yoki WAV, maksimal fayl hajmi 50 MB",
                    en: "MP3 or WAV, maximum file size 50 MB",
                    ru: "MP3 или WAV, максимальный размер файла 50 МБ",
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
            form: {
                text: {
                    label: t({
                        uz: "Matnni kiriting ...",
                        en: "Enter text ...",
                        ru: "Введите текст ...",
                    })
                },
            },
            buttons: {
                submit: t({
                    uz: "Yangilash",
                    ru: "Обновить",
                    en: "Update",
                }),
                reset: t({
                    uz: "Qayta tiklash",
                    ru: "Сбросить",
                    en: "Reset",
                }),
            },
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
                uz: "AI Xazna | Nutqdan matnga",
                en: "AI Xazna | Speech to Text",
                ru: "AI Xazна | Речь в текст",
            }),

            description: t({
                uz: "AI Xazna STT — audio fayllarni tez va aniq matnga aylantiruvchi sun'iy intellekt xizmati.",
                en: "AI Xazna STT converts your audio into accurate, high-quality text instantly.",
                ru: "AI Xazna STT — сервис, который быстро и точно преобразует аудио в текст.",
            }),

            keywords: t({
                uz: "AI Xazna, STT, nutqdan matnga, audio matn, transkripsiya, sun'iy intellekt",
                en: "AI Xazna, STT, speech to text, transcription, audio to text, artificial intelligence",
                ru: "AI Xazna, STT, речь в текст, транскрипция, аудио в текст, искусственный интеллект",
            }),

            robots: {
                index: false,
                follow: false,
            },
        },
    }

} satisfies Dictionary;

export default sttContent;
