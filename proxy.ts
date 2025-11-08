import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, isSupportedLocale } from "./lib/locales";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip files and Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  // `/` -> `/<default-locale>`
  if (segments.length === 0) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  // If first segment isn't a supported locale, prepend default
  if (!isSupportedLocale(maybeLocale)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes (except static files handled above)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
