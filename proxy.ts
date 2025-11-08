// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, isLocale, type Locale } from "./lib/locales";

const DEFAULT_LOCALE: Locale = "en";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  const pathLocale = pathname.split("/")[1];
  if (!isLocale(pathLocale)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
