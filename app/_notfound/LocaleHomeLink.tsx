// app/_notfound/LocaleHomeLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isSupportedLocale, DEFAULT_LOCALE, type Locale } from "@/lib/locales";

export default function LocaleHomeLink() {
  const pathname = usePathname();
  const seg = pathname?.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isSupportedLocale(seg) ? (seg as Locale) : DEFAULT_LOCALE;
  const homeHref = `/${locale}`;

  return (
    <Link
      href={homeHref}
      className="mt-8 inline-block rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Go home
    </Link>
  );
}
