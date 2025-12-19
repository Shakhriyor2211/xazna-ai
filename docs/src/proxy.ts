import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';


const i18nMiddleware = createI18nMiddleware(i18n);

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const root_pattern = /^\/((ru|en|uz)?|((ru|en|uz)\/))$/

  if (root_pattern.test(request.nextUrl.pathname)) {

    return NextResponse.redirect(new URL("/docs/v1.0/introduction", request.url));
  }

  return i18nMiddleware(request, event);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/'],
};
