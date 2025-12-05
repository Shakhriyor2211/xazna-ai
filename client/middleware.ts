import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "./shared/site";
import { intlayerProxy, multipleProxies } from "next-intlayer/proxy";
import { getLocaleFromPath, getPathWithoutLocale, localeDetector } from "intlayer";


const AUTH_ROUTES = ["/auth/sign-in", "/auth/sign-up"];
const EMAIL_VERIFY_PREFIX = "/verify/email";


function appMiddleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const locale = getLocaleFromPath(request.nextUrl.pathname);
  const path = getPathWithoutLocale(request.nextUrl.pathname);

  const is_auth_route =
    AUTH_ROUTES.includes(path) || path.startsWith(EMAIL_VERIFY_PREFIX);

  if (token && is_auth_route) {
    return NextResponse.redirect(new URL(`/${locale}${ROUTES.main}`, request.url));
  }

  if (!token && !is_auth_route) {
    return NextResponse.redirect(new URL(`/${locale}${ROUTES.sign_in}?next=/${path !== "/" ? `${locale}${path}` : locale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/",
    "/auth/sign-in",
    "/auth/sign-up",
    "/verify/email/:path*",
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)"
  ],
};

export const middleware = multipleProxies([intlayerProxy, appMiddleware]);