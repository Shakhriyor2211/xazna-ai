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
                    uz: "",
                    en: "Browse file",
                    ru: "",
                }),
                description: t({
                    uz: "",
                    en: "MP3 or WAV, maximum file size 50 MB",
                    ru: "",
                })
            }
        },
        history: {
            title: t({
                uz: "",
                en: "History",
                ru: "",
            }),
            empty: t({
                uz: "Hozircha hech qanday maʼlumot yoʻq.",
                en: "There is no data yet.",
                ru: "Данных пока нет.",
            }),
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

export default sttContent;
