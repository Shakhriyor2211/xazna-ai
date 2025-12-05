import { type Dictionary, t } from "intlayer";

const signupContent = {
    key: "signup-content",
    live: true,
    content: {
        title: t({
            uz: "Ro'yxatdan o'tish",
            en: "Sign Up",
            ru: "Регистрация",
        }),
        or: t({
            uz: "YOKI",
            ru: "ИЛИ",
            en: "OR"
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
                    invalid: t({
                        uz: "Email manzili noto‘g‘ri formatda.",
                        ru: "Неверный формат электронной почты.",
                        en: "Invalid email format.",
                    }),
                },
            },
            first_name: {
                label: t({
                    uz: "Ism",
                    ru: "Имя",
                    en: "First name",
                }),
                errors: {
                    required: t({
                        uz: "Ushbu qator to'ldirilishi shart.",
                        ru: "Это поле обязательно для заполнения.",
                        en: "This field is required.",
                    }),
                },
            },
            last_name: {
                label: t({
                    uz: "Familiya",
                    ru: "Фамилия",
                    en: "Last name",
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
                    rule: t({
                        uz: "Parol 8–16 belgidan iborat bo‘lishi, harflar va raqamlarni o‘z ichiga olishi, @#$%^&*.,! belgilarini ishlatishi mumkin.",
                        ru: "Пароль должен содержать 8–16 символов, включать буквы и цифры, и может содержать @#$%^&*.,!.",
                        en: "Password must be 8–16 characters, include letters and digits, and can contain @#$%^&*.,!",
                    }),
                    match: t({
                        uz: "Parollar mos kelmadi.",
                        ru: "Пароли не совпадают.",
                        en: "Passwords did not match.",
                    }),
                },
            },
            confirm_password: {
                label: t({
                    uz: "Parolni tasdiqlang",
                    ru: "Подтвердите пароль",
                    en: "Confirm password",
                }),
                errors: {
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
            },
            submit: t({
                uz: "Ro‘yxatdan o‘tish",
                ru: "Регистрация",
                en: "Sign up",
            }),
        },

        sigin: {
            title: t({
                uz: "Kirish",
                ru: "Вход",
                en: "Sign in",
            }),
            description: t({
                uz: "Akkauntingiz bormi?",
                ru: "У вас уже есть аккаунт?",
                en: "Already have an account?",
            }),
        },

        metadata: {
            title: t({
                uz: "AI Xazna | Ro'yxatdan o'tish",
                en: "AI Xazna | Sign Up",
                ru: "AI Xazna | Регистрация",
            }),
            description: t({
                uz: "AI Xazna platformasiga yangi hisob yaratish va sun'iy intellekt xizmatlaridan foydalanish uchun ro'yxatdan o'ting.",
                en: "Create a new AI Xazna account to access AI services and personalized features.",
                ru: "Создайте новый аккаунт AI Xazna для доступа к сервисам искусственного интеллекта и персонализированным функциям.",
            }),
            keywords: t({
                uz: "AI Xazna, ro'yxatdan o'tish, sign up, sun'iy intellekt, hisob",
                en: "AI Xazna, sign up, register, artificial intelligence, account",
                ru: "AI Xazna, регистрация, sign up, искусственный интеллект, аккаунт",
            }),
            authors: [{ name: "AI Xazna" }],
            openGraph: {
                title: t({
                    uz: "AI Xazna | Ro'yxatdan o'tish",
                    en: "AI Xazna | Sign Up",
                    ru: "AI Xazna | Регистрация",
                }),
                description: t({
                    uz: "Yangi hisob yaratish va AI Xazna sun'iy intellekt xizmatlaridan foydalanish.",
                    en: "Create a new account and start using AI Xazna AI services.",
                    ru: "Создайте новый аккаунт и начните пользоваться сервисами AI Xazna.",
                }),
                url: "https://ai.xazna.uz/sign-up",
                siteName: t({ uz: "AI Xazna", en: "AI Xazna", ru: "AI Xazna" }),
                images: [
                    {
                        url: "https://ai.xazna.uz/sign-up-og-image.png",
                        width: 1200,
                        height: 630,
                        alt: t({
                            uz: "Ro'yxatdan o'tish — AI Xazna",
                            en: "Sign Up Page — AI Xazna",
                            ru: "Страница регистрации — AI Xazna",
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
                    uz: "AI Xazna | Ro'yxatdan o'tish",
                    en: "AI Xazna | Sign Up",
                    ru: "AI Xazna | Регистрация",
                }),
                description: t({
                    uz: "Yangi hisob yaratish va AI Xazna xizmatlaridan foydalanish.",
                    en: "Create a new account and access AI Xazna services.",
                    ru: "Создайте новый аккаунт и используйте сервисы AI Xazna.",
                }),
                images: ["https://ai.xazna.uz/sign-up-og-image.png"],
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

export default signupContent;
