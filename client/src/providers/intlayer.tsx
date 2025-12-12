import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
  </IntlayerServerProvider>
);
