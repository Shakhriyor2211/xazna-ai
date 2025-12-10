import { type Dictionary, t } from "intlayer";

const resetPasswordContent = {
    key: "reset-password-content",
    live: true,
    content: {
        title: t({
            uz: "Parolni tiklash",
            en: "Password reset",
            ru: "Сброс пароля",
        }),
        main: {
            form: {
                email: {
                    label: t({
                        uz: "Email",
                        ru: "Электронная почта",
                        en: "Email",
                    })
                },
                buttons: {
                    submit: t({
                        uz: "Davom etish",
                        ru: "Продолжить",
                        en: "Continue",
                    })
                },
            },
            success: {
                description: t({
                    uz: "Xabar elektron pochtangizga yuborildi",
                    ru: "Сообщение было отправлено на ваш адрес электронной почты",
                    en: "Message was sent to your email address"
                }),
                buttons: {
                    back: t({
                        uz: "Kirish sahifasiga qaytish",
                        ru: "Вернуться к входу",
                        en: "Back to Sign In"
                    })
                }
            }
        },
        confirm: {
            form: {
                new_password: {
                    label: t({
                        uz: "Yangi parol",
                        ru: "Новый пароль",
                        en: "New password",
                    })
                },
                confirm_password: {
                    label: t({
                        uz: "Parolni tasdiqlang",
                        ru: "Подтвердите пароль",
                        en: "Confirm password",
                    })
                },
                buttons: {
                    submit: t({
                        uz: "Davom etish",
                        ru: "Продолжить",
                        en: "Continue",
                    })
                },
            },
            success: {
                description: t({
                    uz: "Xabar elektron pochtangizga yuborildi",
                    ru: "Сообщение было отправлено на ваш адрес электронной почты",
                    en: "Message was sent to your email address"
                }),
                buttons: {
                    back: t({
                        uz: "Kirish sahifasiga qaytish",
                        ru: "Вернуться к входу",
                        en: "Back to Sign In"
                    })
                }
            }
        },
        errors: {
            main: {
                form: {
                    email: {
                        required: t({
                            uz: "Ushbu qator to'ldirilishi shart.",
                            ru: "Это поле обязательно для заполнения.",
                            en: "This field is required.",
                        }),
                        invalid: t({
                            uz: "Email manzili noto‘g‘ri formatda.",
                            ru: "Неверный формат электронной почты.",
                            en: "Invalid email format.",
                        }),
                    },
                },
            },
            confirm: {
                form: {
                    new_password: {
                        required: t({
                            uz: "Ushbu qator to'ldirilishi shart.",
                            ru: "Это поле обязательно для заполнения.",
                            en: "This field is required.",
                        }),
                        rule: t({
                            uz: "Parol 8–16 belgidan iborat bo‘lishi, harflar va raqamlarni o‘z ichiga olishi, @#$%^&*.,! belgilarini ishlatishi mumkin.",
                            ru: "Пароль должен содержать 8–16 символов, включать буквы и цифры, и может содержать @#$%^&*.,!.",
                            en: "Password must be 8–16 characters, include letters and digits, and can contain @#$%^&*.,!",
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
            },

            server: t({
                uz: "Serverda ichki xato yuz berdi.",
                ru: "Внутренняя ошибка сервера.",
                en: "Internal server error."

            })
        },
        metadata: {
            title: t({
                uz: "AI Xazna | Parolni tiklash",
                en: "AI Xazna | Password reset",
                ru: "AI Xazna | Сброс пароля",
            }),

            description: t({
                uz: "AI Xazna hisobingiz uchun parolni tiklash sahifasi. Elektron pochta orqali parolni qayta o‘rnating.",
                en: "Password reset page for your AI Xazna account. Reset your password via email verification.",
                ru: "Страница сброса пароля для вашего аккаунта AI Xazna. Сбросьте пароль через подтверждение по электронной почте.",
            }),

            keywords: t({
                uz: "AI Xazna, parolni tiklash, parolni unutdim, xavfsizlik, avtorizatsiya",
                en: "AI Xazna, password reset, forgot password, security, authorization",
                ru: "AI Xazna, сброс пароля, забыл пароль, безопасность, авторизация",
            }),

            robots: {
                index: false,
                follow: false,
            },
        },
    },
} satisfies Dictionary;

export default resetPasswordContent;
