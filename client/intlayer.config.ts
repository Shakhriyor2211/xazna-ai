import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.UZBEK_LATIN, Locales.ENGLISH, Locales.RUSSIAN],
    defaultLocale: Locales.UZBEK_LATIN
  },
  routing: {

    storage: {
      type: "cookie",
      name: "locale"
    },
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
