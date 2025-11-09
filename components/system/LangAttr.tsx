"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isSupportedLocale, DEFAULT_LOCALE } from "@/lib/locales";

/** Keeps <html lang="..."> in sync with the current URL segment. */
export default function LangAttr() {
  const pathname = usePathname(); // e.g., "/en/writing/foo"

  useEffect(() => {
    const html = document.documentElement;
    const seg = (pathname || "/").split("/").filter(Boolean)[0];
    const lang = isSupportedLocale(seg ?? "") ? seg : DEFAULT_LOCALE;

    if (html.lang !== lang) html.lang = lang;
    // Also mirror on a data attribute if you want CSS hooks:
    if (html.dataset.lang !== lang) html.dataset.lang = lang;
  }, [pathname]);

  return null;
}
