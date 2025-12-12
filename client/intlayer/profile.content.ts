import { type Dictionary, t } from "intlayer";

const profileContent = {
    key: "profile-content",
    live: true,
    content: {
        title: t({
            uz: "Profil",
            en: "Profile",
            ru: "Профиль",
        }),

        infromation: {
            title: t({
                uz: "Ma'lumotlar",
                en: "Information",
                ru: "Информация",
            }),
            form: {
                image: {
                    add: t({
                        uz: "Rasm qo'shish",
                        en: "Add image",
                        ru: "Добавить изображение",
                    }),
                    change: t({
                        uz: "Rasmni o'zgartirish",
                        en: "Change image",
                        ru: "Изменить изображение",
                    }),
                    remove: {
                        title: t({
                            uz: "Rasmni o'chirish",
                            en: "Remove image",
                            ru: "Удалить изображение",
                        }),
                        modal: {
                            title: t({
                                uz: "Profil rasmini o'chirish",
                                en: "Delete profile image",
                                ru: "Удалить изображение профиля",
                            }),
                            description: t({
                                uz: "Profil rasmingizni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.",
                                en: "Are you sure you want to delete your profile image? This action cannot be undone.",
                                ru: "Вы уверены, что хотите удалить изображение профиля? Это действие необратимо.",
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
                        }

                    },
                    description: t({
                        uz: "Biz 5MB dan kichik JPG va PNG formatlarini qo'llab-quvvatlaymiz.",
                        en: "We support JPG and PNG formats under 5MB.",
                        ru: "Мы поддерживаем JPG и PNG форматы размером до 5MB.",
                    }),
                    preview: {
                        modal: {
                            title: t({
                                uz: "Rasmni ko'rish",
                                en: "Image preview",
                                ru: "Предпросмотр изображения",
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
                        }
                    }
                },

                first_name: {
                    label: t({
                        uz: "Ism",
                        en: "First Name",
                        ru: "Имя",
                    })
                },

                last_name: {
                    label: t({
                        uz: "Familiya",
                        en: "Last Name",
                        ru: "Фамилия",
                    })
                }
            }
        },

        security: {
            title: t({
                uz: "Xavfsizlik",
                en: "Security",
                ru: "Безопасность",
            }),
            form: {
                email: {
                    label: t({
                        uz: "Elektron pochta",
                        en: "Email",
                        ru: "Электронная почта",
                    }),
                }
            },
            join_date: t({
                uz: "Ro'yxatdan o'tgan sana:",
                en: "Joining date:",
                ru: "Дата регистрации:",
            }),
            last_password_upadte: t({
                uz: "Oxirgi parol yangilanishi:",
                en: "Last password update:",
                ru: "Последнее обновление пароля:",
            }),

            change_password: {
                title: t({
                    uz: "Parolni o'zgartirish",
                    en: "Change password",
                    ru: "Изменить пароль",
                }),
                modal: {
                    title: t({
                        uz: "Parolni o'zgartirish",
                        en: "Change password",
                        ru: "Изменить пароль",
                    }),
                    form: {
                        old_password: t({
                            uz: "Eski parol",
                            en: "Old password",
                            ru: "Старый пароль",
                        }),
                        new_password: t({
                            uz: "Yangi parol",
                            en: "New password",
                            ru: "Новый пароль",
                        }),
                        confirm_password: t({
                            uz: "Parolni tasdiqlash",
                            en: "Confirm password",
                            ru: "Подтверждение пароля",
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
                }
            }
        },

        errors: {
            information: {
                form: {
                    first_name: {
                        required: t({
                            uz: "Ushbu qator to'ldirilishi shart.",
                            ru: "Это поле обязательно для заполнения.",
                            en: "This field is required.",
                        })
                    },
                    last_name: {
                        required: t({
                            uz: "Ushbu qator to'ldirilishi shart.",
                            ru: "Это поле обязательно для заполнения.",
                            en: "This field is required.",
                        })
                    }
                }
            },
            security: {
                change_password: {
                    modal: {
                        form: {
                            old_password: {
                                required: t({
                                    uz: "Ushbu qator to'ldirilishi shart.",
                                    ru: "Это поле обязательно для заполнения.",
                                    en: "This field is required.",
                                }),
                                rule: t({
                                    uz: "Parol 8–16 belgidan iborat bo'lishi, harflar va raqamlarni o'z ichiga olishi, @#$%^&*.,! belgilarini ishlatishi mumkin.",
                                    ru: "Пароль должен содержать 8–16 символов, включать буквы и цифры и может содержать @#$%^&*.,!.",
                                    en: "Password must be 8–16 characters, include letters and digits, and can contain @#$%^&*.,!",
                                })
                            },
                            new_password: {
                                required: t({
                                    uz: "Ushbu qator to'ldirilishi shart.",
                                    ru: "Это поле обязательно для заполнения.",
                                    en: "This field is required.",
                                }),
                                old_match: t({
                                    uz: "Yangi parol eski parol bilan bir xil bo'lishi mumkin emas.",
                                    ru: "Новый пароль не может совпадать со старым.",
                                    en: "New password cannot be the same as the old password.",
                                }),
                                rule: t({
                                    uz: "Parol 8–16 belgidan iborat bo'lishi, harflar va raqamlarni o'z ichiga olishi, @#$%^&*.,! belgilarini ishlatishi mumkin.",
                                    ru: "Пароль должен содержать 8–16 символов, включать буквы и цифры и может содержать @#$%^&*.,!.",
                                    en: "Password must be 8–16 characters, include letters and digits, and can contain @#$%^&*.,!",
                                }),
                                match: t({
                                    uz: "Parollar mos kelmadi.",
                                    ru: "Пароли не совпадают.",
                                    en: "Passwords did not match.",
                                }),
                            },
                            confirm_password: {
                                required: t({
                                    uz: "Ushbu qator to'ldirilishi shart.",
                                    ru: "Это поле обязательно для заполнения.",
                                    en: "This field is required.",
                                }),
                                match: t({
                                    uz: "Parollar mos kelmadi.",
                                    ru: "Пароли не совпадают.",
                                    en: "Passwords did not match.",
                                }),
                            },
                        }
                    }
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
                uz: "AI Xazna | Profil",
                en: "AI Xazna | Profile",
                ru: "AI Xazna | Профиль",
            }),

            description: t({
                uz: "Profilingizni boshqaring — shaxsiy ma'lumotlarni yangilang, xavfsizlik sozlamalarini o'zgartiring va hisobingizni nazorat qiling.",
                en: "Manage your profile — update personal information, adjust security settings, and stay in control of your account.",
                ru: "Управляйте своим профилем — обновляйте личные данные, изменяйте настройки безопасности и контролируйте свой аккаунт.",
            }),

            keywords: t({
                uz: "AI Xazna profil, foydalanuvchi ma'lumotlari, xavfsizlik, parol",
                en: "AI Xazna profile, user information, security, password",
                ru: "AI Xazna профиль, пользовательские данные, безопасность, пароль",
            }),

            robots: {
                index: false,
                follow: false,
            },
        },
    }

} satisfies Dictionary;

export default profileContent;
