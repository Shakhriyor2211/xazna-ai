import { type Dictionary, t } from "intlayer";

const verifyEmailContent = {
    key: "verify-email-content",
    live: true,
    content: {
        title: t({
            uz: "Emailni tasdiqlash",
            en: "Email verification",
            ru: "Подтверждение электронной почты",
        }),

        description: t({
            uz: "Emailga yuborilgan 6 xonali kodni kiriting",
            ru: "Введите 6-значный код, отправленный на вашу электронную почту",
            en: "Enter the 6-digit code sent to your email"
        }),
        buttons: {
            submit: t({
                uz: "Tekshirish",
                ru: "Проверить",
                en: "Verify"
            }),
            resend: t({
                uz: "Kodni qayta yuborish",
                ru: "Отправить код ещё раз",
                en: "Resend code"
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
                uz: "AI Xazna | Emailni tasdiqlash",
                en: "AI Xazna | Email Verification",
                ru: "AI Xazna | Подтверждение электронной почты",
            }),

            description: t({
                uz: "AI Xazna hisobingizni faollashtirish uchun email manzilingizni tasdiqlang. Tasdiqlash havolasi elektron pochtaga yuboriladi.",
                en: "Verify your email to activate your AI Xazna account. A verification link will be sent to your email.",
                ru: "Подтвердите свою электронную почту, чтобы активировать аккаунт AI Xazna. Ссылка для подтверждения будет отправлена на вашу почту.",
            }),

            keywords: t({
                uz: "AI Xazna, email tasdiqlash, hisobni faollashtirish, ro'yxatdan o'tish, avtorizatsiya",
                en: "AI Xazna, email verification, activate account, registration, authorization",
                ru: "AI Xazna, подтверждение электронной почты, активация аккаунта, регистрация, авторизация",
            }),

            robots: {
                index: false,
                follow: false,
            },
        },
    },
} satisfies Dictionary;

export default verifyEmailContent;
