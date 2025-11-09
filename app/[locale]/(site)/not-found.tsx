"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isSupportedLocale, DEFAULT_LOCALE, type Locale } from "@/lib/locales";

export default function NotFound() {
  const pathname = usePathname();
  const seg = pathname?.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isSupportedLocale(seg) ? (seg as Locale) : DEFAULT_LOCALE;
  const homeHref = `/${locale}`;

  return (
    <main className="container mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-foreground">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        The page you’re looking for doesn’t exist or may have moved.
      </p>

      <Link
        href={homeHref}
        className="mt-8 inline-block rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Go home
      </Link>
    </main>
  );
}
