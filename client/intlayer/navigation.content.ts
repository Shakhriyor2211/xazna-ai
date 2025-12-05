import { type Dictionary, t } from "intlayer";

const navigationContent = {
  key: "navigation-content",
  live: true,
  content: {
    sidebar: {
      playground: {
        title: t({
          uz: "O'yin maydonchasi",
          en: "Playground",
          ru: "Игровое поле",
        }),
        chatbot: {
          title:
            t({
              uz: "Chatbot",
              en: "Chatbot",
              ru: "Чат-бот",
            }), new_session: t({
              uz: "Yangi chat",
              en: "New chat",
              ru: "Новый чат",
            }),
        },
        stt: t({
          uz: "Nutqdan matnga",
          en: "Speech to Text",
          ru: "Речь в текст",
        }),
        tts: t({
          uz: "Matndan nutqqa",
          en: "Text to Speech",
          ru: "Текст в речь",
        }),
        monitoring: t({
          uz: "Monitoring",
          en: "Monitoring",
          ru: "Мониторинг",
        }),
      },
      development: {
        title: t({
          uz: "Rivojlantirish",
          en: "Development",
          ru: "Разработка",
        }),
        docs: t({
          uz: "Hujjatlar",
          en: "Documentation",
          ru: "Документация",
        }),
        keys: t({
          uz: "API kalitlari",
          en: "API Keys",
          ru: "API ключи",
        }),
      }
    }
  },
} satisfies Dictionary;

export default navigationContent;
