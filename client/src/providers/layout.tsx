import { IntlayerProvider } from "@/providers/intlayer";
import AlertSnackbar from "@/utils/alert";
import { HeroUIProvider } from "@heroui/system";
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";

export { generateStaticParams } from "next-intlayer";

export const dynamic = "force-static";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className="min-h-screen text-foreground bg-background font-sans antialiased">
        <HeroUIProvider>
          <AlertSnackbar />
          <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
