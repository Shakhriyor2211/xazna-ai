import { type Dictionary, t } from "intlayer";

const ttsContent = {
    key: "tts-content",
    live: true,
    content: {
        page: {
            title: t({
                uz: "Matndan nutqqa",
                en: "Text-to-Speech",
                ru: "Преобразование текста в речь",
            }),
            description: t({
                uz: "Matnni sun'iy intellekt yordamida tabiiy nutqqa aylantiring.",
                en: "Convert text into natural-sounding speech using AI.",
                ru: "Преобразуйте текст в естественную речь с помощью искусственного интеллекта.",
            }),
        },

        form: {
            text_label: t({
                uz: "Matnni kiriting...",
                en: "Enter text...",
                ru: "Введите текст...",
            }),
            voice_label: t({
                uz: "Ovoz turini tanlang",
                en: "Choose a voice",
                ru: "Выберите голос",
            }),
            submit: t({
                uz: "Ovoz yaratish",
                en: "Generate Speech",
                ru: "Создать речь",
            }),
            download: t({
                uz: "Yuklab olish",
                en: "Download",
                ru: "Скачать",
            }),
        },

        messages: {
            empty_text: t({
                uz: "Iltimos, matn kiriting.",
                en: "Please enter text.",
                ru: "Пожалуйста, введите текст.",
            }),
            generating: t({
                uz: "Ovoz yaratilmoqda...",
                en: "Generating speech...",
                ru: "Создание речи...",
            }),
            error: t({
                uz: "Xatolik yuz berdi. Qayta urinib ko‘ring.",
                en: "An error occurred. Please try again.",
                ru: "Произошла ошибка. Попробуйте снова.",
            }),
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
