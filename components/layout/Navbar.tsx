"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const seg = pathname.split("/").filter(Boolean)[0];
  return isSupportedLocale(seg ?? "") ? (seg as Locale) : DEFAULT_LOCALE;
}

function withLocale(locale: Locale, slug: string) {
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  // 🚫 No prop override. Always trust the URL.
  const currentLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  // Home is active only on exact "/:locale"
  function isActive(target: string, slug: string) {
    if (!pathname) return false;
    if (slug === "") return pathname === `/${currentLocale}`;
    return pathname === target || pathname.startsWith(`${target}/`);
  }

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-4 z-40">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-border bg-card/95 text-card-foreground px-4 shadow-lg ring-1 ring-black/5 backdrop-blur lg:px-6 dark:ring-white/5">
          {/* Brand */}
          <Link href={`/${currentLocale}`} className="flex flex-col">
            <span className="text-lg font-semibold">Amare Teklay</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {links.map((entry) => {
              const target = withLocale(currentLocale, entry.slug);
              const active = isActive(target, entry.slug);
              return (
                <Link
                  key={entry.slug || "home"}
                  href={target}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 transition",
                    "text-muted-foreground hover:text-foreground",
                    active &&
                      "border border-border bg-primary text-primary-foreground shadow-sm hover:text-primary-foreground"
                  )}
                >
                  {entry.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language is controlled by the URL-derived locale */}
            <LanguageSwitcher current={currentLocale} />

            {/* Theme toggle (JS-driven icon) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              aria-pressed={resolvedTheme === "dark"}
              title={resolvedTheme === "dark" ? "Switch to light" : "Switch to dark"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-md transition hover:scale-105"
            >
              <span className="sr-only">Toggle theme</span>
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5" aria-hidden />
                ) : (
                  <Moon className="h-5 w-5" aria-hidden />
                )
              ) : (
                <span className="block h-5 w-5" />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-md transition hover:scale-105 md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div
            id="mobile-nav"
            className="md:hidden mt-2 rounded-2xl border border-border bg-card/95 text-card-foreground shadow-xl backdrop-blur"
          >
            <div className="px-4 py-3">
              <nav className="flex flex-col gap-1 text-base font-medium">
                {links.map((entry) => {
                  const target = withLocale(currentLocale, entry.slug);
                  const active = isActive(target, entry.slug);
                  return (
                    <Link
                      key={`${entry.slug || "home"}-mobile`}
                      href={target}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-3 py-2 transition",
                        "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                        active && "bg-primary text-primary-foreground hover:bg-primary"
                      )}
                    >
                      {entry.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
