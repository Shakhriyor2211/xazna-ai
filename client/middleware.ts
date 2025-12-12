import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "./shared/site";
import { intlayerProxy, multipleProxies } from "next-intlayer/proxy";
import { getLocaleFromPath, getPathWithoutLocale } from "intlayer";



function appMiddleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const locale = getLocaleFromPath(request.nextUrl.pathname);
  const path = getPathWithoutLocale(request.nextUrl.pathname);

  const is_auth_route = path.startsWith("/auth")

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
    "/",
    "/user/:path*",
    "/auth/:path*",
    "/((?!api|protected|media|docs|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)"
  ],
};

export const middleware = multipleProxies([intlayerProxy, appMiddleware]);