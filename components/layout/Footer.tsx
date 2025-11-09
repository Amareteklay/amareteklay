"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_LOCALE, isSupportedLocale, type Locale } from "@/lib/locales";

const footerLinks = [
  { slug: "", label: "Home" },
  { slug: "about", label: "About" },
  { slug: "writing", label: "Writing" },
  { slug: "projects", label: "Projects" },
  { slug: "contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/amareteklay/", label: "LinkedIn" },
  { href: "https://twitter.com/amareteklay", label: "Twitter" },
  { href: "https://github.com/amareteklay", label: "GitHub" },
];

const proWriting = { href: "https://homoadapticus.com", label: "Homo Adapticus" };

function getLocaleFromPath(pathname: string | null): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  const seg = pathname.split("/").filter(Boolean)[0];
  return isSupportedLocale(seg ?? "") ? (seg as Locale) : DEFAULT_LOCALE;
}
function withLocale(locale: Locale, slug: string) {
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const year = new Date().getFullYear();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const ticking = useRef(false);

  // Throttled + passive scroll handler
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setShowScrollTop(window.scrollY > 300);
        ticking.current = false;
      });
    };
    onScroll(); // initialize
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll as EventListener);
  }, []);

  // Smooth scroll respects prefers-reduced-motion
  const scrollToTop = () => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  const siteLinks = useMemo(
    () =>
      footerLinks.map((link) => {
        const href = withLocale(locale, link.slug);
        const active =
          pathname === href ||
          (!!pathname && link.slug !== "" && pathname.startsWith(`${href}/`)) ||
          (link.slug === "" && pathname === `/${locale}`);
        return { ...link, href, active };
      }),
    [locale, pathname]
  );

  return (
    <footer className="relative mt-24 border-t border-border bg-card/95 text-foreground/80">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Intro column */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground/80">
              Stay curious
            </p>
            <h3 className="text-xl font-semibold text-foreground">Amare Teklay</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Notes on adaptation, public health, and data practice. For deeper dives into
              professional research and client work, visit Homo Adapticus.
            </p>
            <a
              href={proWriting.href}
              target="_blank"
              rel="me noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-foreground transition-colors hover:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={`${proWriting.label} (opens in a new tab)`}
            >
              {proWriting.label}
              <span aria-hidden className="text-muted-foreground">↗</span>
            </a>
          </div>

          {/* Site links */}
          <nav className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground/80">
              Site
            </p>
            <ul className="grid gap-2 text-base">
              {siteLinks.map(({ slug, label, href, active }) => (
                <li key={slug || "home"}>
                  <Link
                    href={href}
                    prefetch={false}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-1.5 transition-colors focus:outline-none hover:text-foreground",
                      active ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <nav className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground/80">
              Connect
            </p>
            <ul className="grid gap-2 text-base">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="rounded-full px-3 py-1.5 transition-colors text-muted-foreground hover:text-primary focus:outline-none"
                    aria-label={`${link.label} (opens in a new tab)`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p className="font-light tracking-wide">
            © {year} <span className="font-medium text-foreground">Amare Teklay</span> — All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll-to-top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-black/5 transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </button>
      )}
    </footer>
  );
}
