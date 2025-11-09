// components/LanguageSwitcher.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { locales, type Locale, isSupportedLocale } from "@/lib/locales";
import { cn } from "@/lib/utils";

/** Replace or insert the locale segment while preserving the rest of the path */
function replaceLocale(pathname: string, next: Locale) {
  const safe = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const parts = safe.split("/"); // ["", maybe-locale, ...rest]
  const maybeLocale = parts[1] ?? "";
  if (isSupportedLocale(maybeLocale)) parts[1] = next;
  else parts.splice(1, 0, next);
  return parts.join("/").replace(/\/{2,}/g, "/");
}

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || "/";
  const search = useSearchParams();

  // Normalize: if current path has no locale, prefix it (preserves trailing path)
  const basePath = (() => {
    const parts = pathname.split("/");
    const seg1 = parts[1] ?? "";
    if (isSupportedLocale(seg1)) return pathname;
    return [``, current, ...parts.slice(1)].join("/").replace(/\/{2,}/g, "/");
  })();

  // Preserve search & hash
  const suffix = (() => {
    const qs = search?.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    return `${qs ? `?${qs}` : ""}${hash || ""}`;
  })();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-1 rounded-full border border-slate-900/15 bg-white/70 px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] shadow-sm dark:border-white/20 dark:bg-white/5"
    >
      {locales.map((locale) => {
        const href = `${replaceLocale(basePath, locale)}${suffix}`;
        const active = locale === current;

        return (
          <Link
            key={locale}
            href={href}
            prefetch={false}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-2 py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500/70 dark:focus-visible:ring-indigo-400/70 focus-visible:ring-offset-transparent",
              active
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            )}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
