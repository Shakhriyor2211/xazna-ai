import { dropdown } from "@heroui/theme";
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
          uz: "Ishlab chiqish",
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
    },
    header: {
      dropdown: {
        total: t({
          uz: "Jami",
          en: "Total",
          ru: "Итого",
        }),
        usage: t({
          uz: "Foydalanish",
          en: "Usage",
          ru: "Использование",
        }),
        cash: t({
          uz: "Balans",
          en: "Cash",
          ru: "Баланс",
        }),
        sub: t({
          uz: "Obuna",
          en: "Subscription",
          ru: "Подписка",
        }),
        transactions: t({
          uz: "Tranzaksiyalar",
          en: "Transactions",
          ru: "Транзакции",
        }),
        profile: t({
          uz: "Profil",
          en: "Profile",
          ru: "Профиль",
        }),
        sign_out: t({
          uz: "Chiqish",
          en: "Sign out",
          ru: "Выйти",
        }),
        buttons: {
          upgrade: t({
            uz: "Yangilash",
            en: "Upgrade",
            ru: "Обновить",
          }),
        }
      }
    },
    errors: {
      server: t({
        uz: "Serverda ichki xato yuz berdi.",
        ru: "Внутренняя ошибка сервера.",
        en: "Internal server error.",
      })
    },
  },
} satisfies Dictionary;

export default navigationContent;
