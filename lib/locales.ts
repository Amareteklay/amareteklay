export const SUPPORTED_LOCALES = ["en", "sv"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isSupportedLocale(v?: string | null): v is Locale {
  return !!v && SUPPORTED_LOCALES.includes(v as Locale);
}
