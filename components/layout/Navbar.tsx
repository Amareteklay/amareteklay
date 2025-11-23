"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { DEFAULT_LOCALE, isSupportedLocale, type Locale } from "@/lib/locales";
import type { NavItem } from "@/lib/api";

// Fallback if the API fails
const FALLBACK_LINKS: NavItem[] = [
  { slug: "", label: "Home" },
  { slug: "about", label: "About" },
  { slug: "writing", label: "Writing" },
  { slug: "projects", label: "Projects" },
  { slug: "courses", label: "Courses" },
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
function isAbsolute(u?: string) {
  return !!u && /^https?:\/\//i.test(u);
}

// Stable unique key helper
function keyForItem(item: NavItem, i: number, variant: "int" | "ext" | "mint" | "mext") {
  // include label/url/slug + index to avoid collisions when multiple items map to ""
  const base = `${item.slug || "home"}|${item.label}|${item.url || ""}|${i}`;
  return `${variant}:${base}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [nav, setNav] = useState<NavItem[] | null>(null);
  const [navError, setNavError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const currentLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);

  // Fetch navigation from internal server route (menu=main)
  useEffect(() => {
    let alive = true;
    setNav(null);
    setNavError(null);

    const bust = process.env.NODE_ENV === "development" ? `&v=${Date.now()}` : "";
    fetch(`/api/nav?locale=${currentLocale}&menu=main${bust}`, { cache: "force-cache" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`nav ${r.status}`);
        return (await r.json()) as NavItem[];
      })
      .then((items) => {
        if (!alive) return;
        setNav(items?.length ? items : FALLBACK_LINKS);
      })
      .catch((err) => {
        if (!alive) return;
        console.error("Nav fetch failed:", err);
        setNavError("nav-failed");
        setNav(FALLBACK_LINKS);
      });

    return () => {
      alive = false;
    };
  }, [currentLocale]);

  const isActive = useCallback(
    (item: NavItem) => {
      if (!pathname) return false;
      if (item.url && isAbsolute(item.url)) return false; // external never "active"
      const target = withLocale(currentLocale, item.slug ?? "");
      if (!item.slug) return pathname === `/${currentLocale}`;
      return pathname === target || pathname.startsWith(`${target}/`);
    },
    [pathname, currentLocale]
  );

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = useMemo(() => {
    // Create a shallow copy to avoid mutating the original array
    let list = [...(nav ?? FALLBACK_LINKS)];

    // Remove existing "Courses" if present to ensure we control the position
    list = list.filter((item) => item.slug !== "courses");

    // Find index of "Contact"
    const contactIndex = list.findIndex((item) => item.slug === "contact");

    const coursesItem = { slug: "courses", label: "Courses" };

    if (contactIndex !== -1) {
      // Insert before Contact
      list.splice(contactIndex, 0, coursesItem);
    } else {
      // Append if Contact not found
      list.push(coursesItem);
    }

    return list;
  }, [nav]);

  return (
    <header className="sticky top-4 z-40">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded bg-primary px-3 py-2 text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-border bg-card/95 text-card-foreground px-4 shadow-lg ring-1 ring-black/5 backdrop-blur lg:px-6 dark:ring-white/5">
          {/* Brand */}
          <Link href={`/${currentLocale}`} className="flex flex-col">
            <span className="text-lg font-semibold">Amare Teklay</span>
            {navError && <span className="text-[10px] text-muted-foreground">offline menu</span>}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {items.map((entry, i) => {
              const active = isActive(entry);

              // External?
              if (entry.url && isAbsolute(entry.url)) {
                return (
                  <a
                    key={keyForItem(entry, i, "ext")}
                    href={entry.url}
                    target={entry.newTab ? "_blank" : undefined}
                    rel={entry.newTab ? "noreferrer" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 transition",
                      "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {entry.label}
                  </a>
                );
              }

              const href = withLocale(currentLocale, entry.slug || "");
              return (
                <Link
                  key={keyForItem(entry, i, "int")}
                  href={href}
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
            <LanguageSwitcher current={currentLocale} />
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              aria-pressed={mounted ? resolvedTheme === "dark" : false}
              title={mounted ? (resolvedTheme === "dark" ? "Switch to light" : "Switch to dark") : "Toggle theme"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-md transition hover:scale-105"
            >
              <span className="sr-only">Toggle theme</span>
              {mounted ? (resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : <span className="block h-5 w-5" />}
            </button>

            {/* Mobile toggle */}
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

        {/* Mobile menu + backdrop */}
        {open && (
          <>
            <button
              aria-hidden
              tabIndex={-1}
              className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <div
              id="mobile-nav"
              className="md:hidden mt-2 rounded-2xl border border-border bg-card/95 text-card-foreground shadow-xl backdrop-blur relative z-40"
            >
              <div className="px-4 py-3">
                <nav className="flex flex-col gap-1 text-base font-medium">
                  {items.map((entry, i) => {
                    const active = isActive(entry);

                    if (entry.url && isAbsolute(entry.url)) {
                      return (
                        <a
                          key={keyForItem(entry, i, "mext")}
                          href={entry.url}
                          target={entry.newTab ? "_blank" : undefined}
                          rel={entry.newTab ? "noreferrer" : undefined}
                          className={cn(
                            "rounded-xl px-3 py-2 transition",
                            "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                          )}
                        >
                          {entry.label}
                        </a>
                      );
                    }

                    const href = withLocale(currentLocale, entry.slug || "");
                    return (
                      <Link
                        key={keyForItem(entry, i, "mint")}
                        href={href}
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
          </>
        )}
      </div>
    </header>
  );
}
