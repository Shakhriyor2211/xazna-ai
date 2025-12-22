import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';


const ROOT_DIR = ["/docs", "/en/docs", "/ru/docs", "/uz/docs"];

const i18nMiddleware = createI18nMiddleware(i18n);

export function proxy(request: NextRequest, event: NextFetchEvent) {



  if (ROOT_DIR.includes(request.nextUrl.pathname)) {

    return NextResponse.redirect(new URL("/docs/v1.0/introduction", request.url));
  }

  return i18nMiddleware(request, event);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/'],
};
