"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";

function replaceLocale(pathname: string, next: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  parts[0] = next;
  return "/" + parts.join("/");
}

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}`;
  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-900/15 bg-white/70 px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] shadow-sm dark:border-white/20 dark:bg-white/5">
      {SUPPORTED_LOCALES.map((locale) => (
        <Link
          key={locale}
          href={replaceLocale(pathname, locale)}
          prefetch={false}
          className={cn(
            "rounded-full px-2 py-1 transition",
            locale === current
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          )}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
