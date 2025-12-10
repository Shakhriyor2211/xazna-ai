import { dropdown } from "@heroui/theme";
import { m } from "framer-motion";
import { type Dictionary, t } from "intlayer";

const keysContent = {
    key: "keys-content",
    live: true,
    content: {
        title: t({
            uz: "Kalitlarni boshqarish",
            en: "Key management",
            ru: "Управление ключами",
        }),

        table: {
            empty: t({
                uz: "Hozircha hech qanday maʼlumot yoʻq.",
                en: "There is no data yet.",
                ru: "Данных пока нет.",
            }),
            head: {
                name: t({
                    uz: "Nomi",
                    en: "Name",
                    ru: "Название",
                }),
                key: t({
                    uz: "Kalit",
                    en: "Key",
                    ru: "Ключ",
                }),
                active: t({
                    uz: "Faol",
                    en: "Active",
                    ru: "Активный",
                }),
                created_at: t({
                    uz: "Yaratilgan vaqti",
                    en: "Created at",
                    ru: "Создано",
                }),
                action: t({
                    uz: "Amallar",
                    en: "Action",
                    ru: "Действие",
                }),
            },
            dropdown: {
                monitoring: {
                    title: t({
                        uz: "Monitoring",
                        en: "Monitoring",
                        ru: "Мониторинг",
                    }),
                },
                copy: {
                    title: t({
                        uz: "Nusxa olish",
                        en: "Copy",
                        ru: "Копировать",
                    }),
                },
                edit: {
                    title: t({
                        uz: "Tahrirlash",
                        ru: "Редактировать",
                        en: "Edit",
                    }),
                    drawer: {
                        title: t({
                            uz: "Kalit tahrirlash",
                            en: "Edit key",
                            ru: "Редактировать ключ",
                        }),
                        form: {
                            name: {
                                label: t({
                                    uz: "Nomi",
                                    en: "Name",
                                    ru: "Название",
                                }),
                            }
                        },
                        permissions: {
                            title: t({
                                uz: "Ruxsatlar",
                                en: "Permissions",
                                ru: "Разрешения",
                            }),

                            chatbot: {
                                title: t({
                                    uz: "Chatbot",
                                    en: "Chatbot",
                                    ru: "Чатбот",
                                }),
                                tabs: {
                                    enable: t({
                                        uz: "yoqish",
                                        en: "enable",
                                        ru: "включить",
                                    }),
                                    disable: t({
                                        uz: "o'chirish",
                                        en: "disable",
                                        ru: "отключить",
                                    })
                                }
                            },

                            tts: {
                                title: t({
                                    uz: "Matndan nutqqa",
                                    en: "Text to speech",
                                    ru: "Текст в речь",
                                }),
                                tabs: {
                                    enable: t({
                                        uz: "yoqish",
                                        en: "enable",
                                        ru: "включить",
                                    }),
                                    disable: t({
                                        uz: "o'chirish",
                                        en: "disable",
                                        ru: "отключить",
                                    })
                                }
                            },

                            stt: {
                                title: t({
                                    uz: "Nutqdan matnga",
                                    en: "Speech to text",
                                    ru: "Речь в текст",
                                }),
                                tabs: {
                                    enable: t({
                                        uz: "yoqish",
                                        en: "enable",
                                        ru: "включить",
                                    }),
                                    disable: t({
                                        uz: "o'chirish",
                                        en: "disable",
                                        ru: "отключить",
                                    })
                                }
                            },

                            history: {
                                title: t({
                                    uz: "Tarix",
                                    en: "History",
                                    ru: "История",
                                }),
                                tabs: {
                                    all: t({
                                        uz: "barchasi",
                                        en: "all",
                                        ru: "все",
                                    }),
                                    read: t({
                                        uz: "o'qish",
                                        en: "read",
                                        ru: "чтение",
                                    }),
                                    write: t({
                                        uz: "yozish",
                                        en: "write",
                                        ru: "запись",
                                    }),
                                    disable: t({
                                        uz: "o'chirish",
                                        en: "disable",
                                        ru: "отключить",
                                    })
                                }
                            },

                            monitoring: {
                                title: t({
                                    uz: "Monitoring",
                                    en: "Monitoring",
                                    ru: "Мониторинг",
                                }),
                                tabs: {
                                    all: t({
                                        uz: "barchasi",
                                        en: "all",
                                        ru: "все",
                                    }),
                                    read: t({
                                        uz: "o'qish",
                                        en: "read",
                                        ru: "чтение",
                                    }),
                                    write: t({
                                        uz: "yozish",
                                        en: "write",
                                        ru: "запись",
                                    }),
                                    disable: t({
                                        uz: "o'chirish",
                                        en: "disable",
                                        ru: "отключить",
                                    })
                                }
                            }
                        },

                        buttons: {
                            submit: t({
                                uz: "Saqlash",
                                en: "Save",
                                ru: "Сохранить",
                            }),
                            cancel: t({
                                uz: "Bekor qilish",
                                en: "Cancel",
                                ru: "Отмена",
                            })
                        }

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
            rows: t({
                uz: "Qatorlar",
                en: "Rows",
                ru: "Строки",
            })
        },


        create: {
            title: t({
                uz: "Kalit yaratish",
                en: "Create key",
                ru: "Создать ключ"
            }),
            drawer: {
                title: t({
                    uz: "Kalit yaratish",
                    en: "Create key",
                    ru: "Создать ключ",
                }),
                form: {
                    name: {
                        label: t({
                            uz: "Nomi",
                            en: "Name",
                            ru: "Название",
                        }),
                    }
                },
                permissions: {
                    title: t({
                        uz: "Ruxsatlar",
                        en: "Permissions",
                        ru: "Разрешения",
                    }),

                    chatbot: {
                        title: t({
                            uz: "Chatbot",
                            en: "Chatbot",
                            ru: "Чатбот",
                        }),
                        tabs: {
                            enable: t({
                                uz: "yoqish",
                                en: "enable",
                                ru: "включить",
                            }),
                            disable: t({
                                uz: "o'chirish",
                                en: "disable",
                                ru: "отключить",
                            })
                        }
                    },

                    tts: {
                        title: t({
                            uz: "Matndan nutqqa",
                            en: "Text to speech",
                            ru: "Текст в речь",
                        }),
                        tabs: {
                            enable: t({
                                uz: "yoqish",
                                en: "enable",
                                ru: "включить",
                            }),
                            disable: t({
                                uz: "o'chirish",
                                en: "disable",
                                ru: "отключить",
                            })
                        }
                    },

                    stt: {
                        title: t({
                            uz: "Nutqdan matnga",
                            en: "Speech to text",
                            ru: "Речь в текст",
                        }),
                        tabs: {
                            enable: t({
                                uz: "yoqish",
                                en: "enable",
                                ru: "включить",
                            }),
                            disable: t({
                                uz: "o'chirish",
                                en: "disable",
                                ru: "отключить",
                            })
                        }
                    },

                    history: {
                        title: t({
                            uz: "Tarix",
                            en: "History",
                            ru: "История",
                        }),
                        tabs: {
                            all: t({
                                uz: "barchasi",
                                en: "all",
                                ru: "все",
                            }),
                            read: t({
                                uz: "o'qish",
                                en: "read",
                                ru: "чтение",
                            }),
                            write: t({
                                uz: "yozish",
                                en: "write",
                                ru: "запись",
                            }),
                            disable: t({
                                uz: "o'chirish",
                                en: "disable",
                                ru: "отключить",
                            })
                        }
                    },

                    monitoring: {
                        title: t({
                            uz: "Monitoring",
                            en: "Monitoring",
                            ru: "Мониторинг",
                        }),
                        tabs: {
                            all: t({
                                uz: "barchasi",
                                en: "all",
                                ru: "все",
                            }),
                            read: t({
                                uz: "o'qish",
                                en: "read",
                                ru: "чтение",
                            }),
                            write: t({
                                uz: "yozish",
                                en: "write",
                                ru: "запись",
                            }),
                            disable: t({
                                uz: "o'chirish",
                                en: "disable",
                                ru: "отключить",
                            })
                        }
                    }
                },

                buttons: {
                    submit: t({
                        uz: "Yaratish",
                        en: "Create",
                        ru: "Создать",
                    }),
                    cancel: t({
                        uz: "Bekor qilish",
                        en: "Cancel",
                        ru: "Отмена",
                    })
                }

            },
        },

        errors: {
            form: {
                name: {
                    required: t({
                        uz: "Ushbu qator to'ldirilishi shart.",
                        ru: "Это поле обязательно для заполнения.",
                        en: "This field is required.",
                    })
                }
            },
            server: t({
                uz: "Serverda ichki xato yuz berdi.",
                ru: "Внутренняя ошибка сервера.",
                en: "Internal server error."

            })
        },
        info: {
            copy: t({
                uz: "Kalit xotiraga nusxalandi.",
                en: "Key copied to clipboard.",
                ru: "Ключ скопирован в буфер обмена.",
            }),

            delete: t({
                uz: "Kalit muvaffaqiyatli o‘chirildi.",
                en: "Key successfully deleted.",
                ru: "Ключ успешно удалён.",
            })
        },

        metadata: {
            title: t({
                uz: "AI Xazna | Kalitlar",
                en: "AI Xazna | Keys",
                ru: "AI Xazna | Ключи",
            }),

            description: t({
                uz: "Bu sahifada AI Xazna hisobingizdagi barcha kalitlarni ko'rishingiz va boshqarishingiz mumkin.",
                en: "View and manage all the keys in your AI Xazna account on this page.",
                ru: "На этой странице вы можете просмотреть и управлять всеми ключами вашего аккаунта AI Xazna.",
            }),

            keywords: t({
                uz: "AI Xazna, kalitlar, ro'yxat, boshqarish, TTS, STT, LLM",
                en: "AI Xazna, keys, list, management, TTS, STT, LLM",
                ru: "AI Xazna, ключи, список, управление, TTS, STT, LLM",
            }),

            robots: {
                index: false,
                follow: false,
            },
        },
    },
} satisfies Dictionary;

export default keysContent;
