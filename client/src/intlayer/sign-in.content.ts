import { type Dictionary, t } from "intlayer";

const signinContent = {
    key: "sign-in-content",
    live: true,
    content: {
        title: t({
            uz: "Kirish",
            en: "Sign In",
            ru: "Вход",
        }),
        or: t({
            uz: "YOKI",
            ru: "ИЛИ",
            en: "OR"
        }),
        regular: {
            forgot_password: t({
                uz: "Parolni unutdingizmi?",
                ru: "Забыли пароль?",
                en: "Forgot your password?",
            }),
            form: {
                email: {
                    label: t({
                        uz: "Email",
                        ru: "Электронная почта",
                        en: "Email",
                    })
                },
                password: {
                    label: t({
                        uz: "Parol",
                        ru: "Пароль",
                        en: "Password",
                    })
                },
                buttons: {
                    submit: t({
                        uz: "Kirish",
                        ru: "Вход",
                        en: "Sign In",
                    })
                }
            }
        },

        signup: {
            title: t({
                uz: "Ro'yxatdan o'tish",
                ru: "Зарегистрироваться",
                en: "Sign up"
            }),
            description: t({
                uz: "Hali akkauntingiz yo'qmi?",
                ru: "У вас ещё нет аккаунта?",
                en: "Don't have an account yet?",
            })
        },
        errors: {
            regular: {
                form: {
                    email: {
                        required: t({
                            uz: "Ushbu qator to'ldirilishi shart.",
                            ru: "Это поле обязательно для заполнения.",
                            en: "This field is required.",
                        }),
                    },
                    password: {
                        required: t({
                            uz: "Ushbu qator to'ldirilishi shart.",
                            ru: "Это поле обязательно для заполнения.",
                            en: "This field is required.",
                        }),
                    },
                },
            },
            google: {
                auth: t({
                    uz: "Google hisobiga kirishda xatolik yuz berdi.",
                    ru: "Не удалось выполнить вход через аккаунт Google.",
                    en: "Failed to authenticate via Google account."
                }),
            },
            server: t({
                uz: "Serverda ichki xato yuz berdi.",
                ru: "Внутренняя ошибка сервера.",
                en: "Internal server error."

            })
        },
        metadata: {
            title: t({
                uz: "AI Xazna | Kirish",
                en: "AI Xazna | Sign In",
                ru: "AI Xazna | Вход",
            }),
            description: t({
                uz: "AI Xazna platformasiga kirish va shaxsiy hisobingizni boshqarish uchun tizimga kiring.",
                en: "Sign in to your AI Xazna account to access personalized features and manage your profile.",
                ru: "Войдите в свой аккаунт AI Xazna, чтобы получить доступ к персонализированным функциям и управлять своим профилем.",
            }),
            keywords: t({
                uz: "AI Xazna, kirish, login, sun’iy intellekt, hisob",
                en: "AI Xazna, sign in, login, artificial intelligence, account",
                ru: "AI Xazna, вход, логин, искусственный интеллект, аккаунт",
            }),
            robots: {
                index: true,
                follow: true,
            },
        },
    },
} satisfies Dictionary;

export default signinContent;
