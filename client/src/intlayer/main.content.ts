import { type Dictionary, t } from "intlayer";

const mainContent = {
  key: "main-content",
  live: true,
  content: {
    title:
      t({
        uz: "Bosh sahifa",
        en: "Landing",
        ru: "Главная",
      }),
    metadata: {
      title: t({
        uz: "AI Xazna | Sun'iy Intellekt Platformasi",
        en: "AI Xazna | Artificial Intelligence Platform",
        ru: "AI Xazna | Платформа Искусственного Интеллекта",
      }),

      description: t({
        uz: "AI Xazna — matndan ovoz yaratish, nutqni matnga aylantirish, katta til modellari asosidagi tizimlar va suhbatlashuvchi intellektual yordamchilarni taqdim etuvchi sun'iy intellekt platformasi.",
        en: "AI Xazna is a modern artificial intelligence platform that provides text-to-speech generation, speech-to-text conversion, large language model technologies, and conversational intelligent assistants.",
        ru: "AI Xazna — современная платформа искусственного интеллекта, предоставляющая преобразование текста в речь, преобразование речи в текст, технологии больших языковых моделей и интеллектуальных разговорных помощников.",
      }),

      keywords: t({
        uz: "AI Xazna, sun'iy intellekt, matndan ovoz yaratish, nutqni matnga aylantirish, katta til modellari, intellektual yordamchi, chatbot, ovoz texnologiyalari, nutq texnologiyalari",
        en: "AI Xazna, artificial intelligence, text to speech, speech to text, large language models, intelligent assistant, chatbot, speech technologies, voice technologies",
        ru: "AI Xazna, искусственный интеллект, текст в речь, речь в текст, большие языковые модели, интеллектуальный помощник, чат-бот, голосовые технологии, речевые технологии",
      }),

      authors: [{ name: "AI Xazna" }],

      openGraph: {
        title: t({
          uz: "AI Xazna | Sun'iy Intellekt Xizmatlari",
          en: "AI Xazna | Artificial Intelligence Services",
          ru: "AI Xazna | Услуги Искусственного Интеллекта",
        }),
        description: t({
          uz: "Matndan ovoz yaratish, nutqni matnga aylantirish, katta til modellari va suhbatlashuvchi intellektual yordamchi texnologiyalariga ega sun'iy intellekt platformasi.",
          en: "A powerful artificial intelligence platform offering text-to-speech, speech-to-text, large language model technologies, and conversational intelligent assistants.",
          ru: "Мощная платформа искусственного интеллекта с технологиями текст-в-речь, речь-в-текст, большими языковыми моделями и интеллектуальными разговорными помощниками.",
        }),
        url: "https://ai.xazna.uz",
        siteName: t({ uz: "AI Xazna", en: "AI Xazna", ru: "AI Xazna" }),
        images: [
          {
            url: "https://ai.xazna.uz/og-image.png",
            width: 1200,
            height: 630,
            alt: t({
              uz: "AI Xazna — Sun'iy Intellekt Platformasi",
              en: "AI Xazna — Artificial Intelligence Platform",
              ru: "AI Xazna — Платформа Искусственного Интеллекта",
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
          uz: "AI Xazna | Sun'iy Intellekt Platformasi",
          en: "AI Xazna | Artificial Intelligence Platform",
          ru: "AI Xazna | Платформа Искусственного Интеллекта",
        }),
        description: t({
          uz: "Matndan ovoz yaratish, nutqni matnga aylantirish, katta til modellari va suhbatlashuvchi intellektual yordamchi xizmatlariga ega sun'iy intellekt platformasi.",
          en: "A complete artificial intelligence platform offering text-to-speech, speech-to-text, large language model systems, and conversational intelligent assistants.",
          ru: "Полноценная платформа искусственного интеллекта с преобразованием текста в речь, речи в текст, технологиями больших языковых моделей и разговорными интеллектуальными помощниками.",
        }),
        images: ["https://ai.xazna.uz/og-image.png"],
        site: "@xazna_ai",
        creator: "@xazna_ai",
      },

      robots: {
        index: true,
        follow: true,
      },
    }
  },
} satisfies Dictionary;

export default mainContent;
