import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source, {
  localeMap: {
    uz: { language: 'uzbek' },
    ru: { language: 'russian' },
    en: { language: 'english' },
  },
});
