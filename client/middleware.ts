import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "./shared/site";

const AUTH_ROUTES = ["/auth/sign-in", "/auth/sign-up"];
const EMAIL_VERIFY_PREFIX = "/verify/email";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const path = request.nextUrl.pathname;

  const is_auth_route =
    AUTH_ROUTES.includes(path) || path.startsWith(EMAIL_VERIFY_PREFIX);

  if (token && is_auth_route) {
    return NextResponse.redirect(new URL(ROUTES.main, request.url));
  }

  if (!token && !is_auth_route) {
    return NextResponse.redirect(
      new URL(`${ROUTES.sign_in}?next=${path}`, request.url)
    );
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
  ],
};
