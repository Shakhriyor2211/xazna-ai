import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { IntlayerProvider } from "@/providers/intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { META } from "@/shared/site";
import { HeroUIProvider } from "@heroui/system";
import AlertSnackbar from "@/utils/alert";
import { UserProvider } from "@/providers/user";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getHTMLTextDir } from "intlayer";

export const metadata: Metadata = {
  title: {
    default: META.name,
    template: `%s - ${META.name}`,
  },
  description: META.description,
  icons: {
    icon: "/assets/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export { generateStaticParams } from "next-intlayer";

export const dynamic = "force-static";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html suppressHydrationWarning lang={locale} dir={getHTMLTextDir(locale)}>
      <body className="min-h-screen text-foreground bg-background font-sans antialiased">
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <AlertSnackbar />
            <UserProvider>
              <GoogleOAuthProvider clientId={client_id}>
                <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
              </GoogleOAuthProvider>
            </UserProvider>
          </NextThemesProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
