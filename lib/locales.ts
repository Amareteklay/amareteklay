export const locales = ["en", "sv"] as const;
export type Locale = typeof locales[number];
export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}