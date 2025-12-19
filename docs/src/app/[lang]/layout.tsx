import "fumadocs-ui/style.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

const { provider } = defineI18nUI(i18n, {
  translations: {
    ru: {
      displayName: "Русский",
      toc: "Оглавление",
      search: "Поиск",
      lastUpdate: "Последнее обновление",
      searchNoResult: "Результаты не найдены",
      previousPage: "Предыдущая страница",
      nextPage: "Следующая страница",
      chooseLanguage: "Выбрать язык",
    },
    uz: {
      displayName: "O'zbekcha",
      toc: "Mundarija",
      search: "Qidirish",
      lastUpdate: "Oxirgi yangilanish",
      searchNoResult: "Hech qanday natija topilmadi",
      previousPage: "Oldingi sahifa",
      nextPage: "Keyingi sahifa",
      chooseLanguage: "Tilni tanlang",
    },
    en: {
      displayName: "English",
      toc: "Table of Contents",
      search: "Search",
      lastUpdate: "Last update",
      searchNoResult: "No results found",
      previousPage: "Previous page",
      nextPage: "Next page",
      chooseLanguage: "Choose language",
    },
  },
});

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <RootProvider i18n={provider(lang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
