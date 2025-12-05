import { type Dictionary, t } from "intlayer";

const signinContent = {
    key: "signin-content",
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
                    }),
                    errors: {
                        required: t({
                            uz: "Ushbu qator to'ldirilishi shart.",
                            ru: "Это поле обязательно для заполнения.",
                            en: "This field is required.",
                        }),
                    },
                },
                password: {
                    label: t({
                        uz: "Parol",
                        ru: "Пароль",
                        en: "Password",
                    }),
                    errors: {
                        required: t({
                            uz: "Ushbu qator to'ldirilishi shart.",
                            ru: "Это поле обязательно для заполнения.",
                            en: "This field is required.",
                        }),
                    },
                },
                submit: t({
                    uz: "Kirish",
                    ru: "Вход",
                    en: "Sign In",
                })
            },
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
            authors: [{ name: "AI Xazna" }],
            openGraph: {
                title: t({
                    uz: "AI Xazna | Kirish",
                    en: "AI Xazna | Sign In",
                    ru: "AI Xazna | Вход",
                }),
                description: t({
                    uz: "AI Xazna hisobingizga kirish va sun’iy intellekt xizmatlaridan foydalanish.",
                    en: "Access your AI Xazna account and enjoy the AI services.",
                    ru: "Доступ к вашему аккаунту AI Xazna и использование сервисов искусственного интеллекта.",
                }),
                url: "https://ai.xazna.uz/sign-in",
                siteName: t({ uz: "AI Xazna", en: "AI Xazna", ru: "AI Xazna" }),
                images: [
                    {
                        url: "https://ai.xazna.uz/sign-in-og-image.png",
                        width: 1200,
                        height: 630,
                        alt: t({
                            uz: "Kirish sahifasi — AI Xazna",
                            en: "Sign In Page — AI Xazna",
                            ru: "Страница входа — AI Xazna",
                        }),
                    },
                ],
                type: "website",
                locale: t({
                    uz: "uz_UZ",
                    en: "en_US",
                    ru: "ru_RU",
                }),
            },
            twitter: {
                card: "summary_large_image",
                title: t({
                    uz: "AI Xazna | Kirish",
                    en: "AI Xazna | Sign In",
                    ru: "AI Xazna | Вход",
                }),
                description: t({
                    uz: "AI Xazna hisobingizga kirish va xizmatlardan foydalanish.",
                    en: "Sign in to your AI Xazna account and access the AI services.",
                    ru: "Войдите в свой аккаунт AI Xazna и используйте сервисы платформы.",
                }),
                images: ["https://ai.xazna.uz/sign-in-og-image.png"],
                site: "@xazna_ai",
                creator: "@xazna_ai",
            },
            robots: {
                index: true,
                follow: true,
            },
        },
    },
} satisfies Dictionary;

export default signinContent;
