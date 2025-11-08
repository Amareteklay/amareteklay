"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { DEFAULT_LOCALE, isSupportedLocale, type Locale } from "@/lib/locales";

const links = [
  { slug: "", label: "Home" },
  { slug: "about", label: "About" },
  { slug: "writing", label: "Writing" },
  { slug: "projects", label: "Projects" },
  { slug: "contact", label: "Contact" },
];

function getLocaleFromPath(pathname: string | null): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  const segment = pathname.split("/").filter(Boolean)[0];
  return isSupportedLocale(segment) ? (segment as Locale) : DEFAULT_LOCALE;
}

function withLocale(locale: Locale, slug: string) {
  if (!slug) return `/${locale}`;
  return `/${locale}/${slug}`;
}

export default function Navbar({ locale }: { locale?: Locale }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const currentLocale = useMemo(
    () => (locale && isSupportedLocale(locale) ? locale : getLocaleFromPath(pathname)),
    [locale, pathname]
  );

  function toggleTheme() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  }

  return (
    <header className="sticky top-4 z-40">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-slate-900/10 bg-white/95 px-4 shadow-lg ring-1 ring-black/5 backdrop-blur dark:border-white/10 dark:bg-slate-900/80 dark:ring-white/5 lg:px-6">
          <Link href={`/${currentLocale}`} className="flex flex-col">
            <span className="text-lg font-semibold text-slate-900 dark:text-white">Amare Teklay</span>
          </Link>

          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {links.map((entry) => {
              const target = withLocale(currentLocale, entry.slug);
              const active =
                pathname === target ||
                (!!pathname && pathname.startsWith(`${target}/`)) ||
                (entry.slug === "" && pathname === `/${currentLocale}`);
              return (
                <Link
                  key={entry.slug || "home"}
                  href={target}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-slate-600 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white",
                    active &&
                      "border border-slate-900/20 bg-slate-900 text-white shadow-sm dark:border-white/20 dark:bg-white/10"
                  )}
                >
                  {entry.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] md:hidden">
              {links.map((entry) => {
                const target = withLocale(currentLocale, entry.slug);
                const active = pathname === target || (!!pathname && pathname.startsWith(`${target}/`));
                return (
                  <Link
                    key={`${entry.slug || "home"}-mobile`}
                    href={target}
                    className={cn(
                      "text-slate-500 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
                      active && "text-slate-900 dark:text-white"
                    )}
                  >
                    {entry.label[0]}
                  </Link>
                );
              })}
            </nav>
            <LanguageSwitcher current={currentLocale} />
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/20 bg-slate-900 text-white shadow-md transition hover:scale-105 dark:border-white/20 dark:bg-white dark:text-slate-900"
            >
              <span className="sr-only">Toggle theme</span>
              <Sun className="h-5 w-5 dark:hidden" aria-hidden />
              <Moon className="hidden h-5 w-5 dark:block" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
