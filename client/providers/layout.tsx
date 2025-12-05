import { IntlayerProvider } from "@/providers/intlayer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { fontCirce } from "@/shared/site";
import { AlertSnackbar } from "@/utils/alert";
import { HeroUIProvider } from "@heroui/system";
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";

export { generateStaticParams } from "next-intlayer";

export const dynamic = "force-static";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html
      className={fontCirce.className}
      lang={locale}
      dir={getHTMLTextDir(locale)}
    >
      <body>
        <HeroUIProvider>
          <AlertSnackbar />
          <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        </HeroUIProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
};

export default LocaleLayout;
