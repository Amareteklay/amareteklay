// lib/locales.ts
export const locales = ["en", "sv"] as const;
export type Locale = (typeof locales)[number];

// Single source of truth for default
export const DEFAULT_LOCALE: Locale = "en";

// Primary guard
export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

// Backward-compat alias (so old imports keep working)
export function isSupportedLocale(x: string): x is Locale {
  return isLocale(x);
}

// (Optional) helper if you need to coerce unknown -> valid
export function normalizeLocale(x: string | undefined | null): Locale {
  return x && isLocale(x) ? x : DEFAULT_LOCALE;
}
