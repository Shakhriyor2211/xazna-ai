"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { UserProvider } from "@/providers/user";
import AlertSnackbar from "@/utils/alert";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}
export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <AlertSnackbar />
        <UserProvider>
          <GoogleOAuthProvider clientId={client_id}>
            {children}
          </GoogleOAuthProvider>
        </UserProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
