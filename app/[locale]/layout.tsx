import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isSupportedLocale, locales, type Locale } from "@/lib/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type ParamsObj = { locale: string };
type Props =
  | { children: ReactNode; params: ParamsObj }
  | { children: ReactNode; params: Promise<ParamsObj> };

export default async function LocaleLayout(props: Props) {
  // Handle both object and Promise forms of params
  const { locale: raw } =
    "then" in (props as any).params
      ? await (props as { params: Promise<ParamsObj> }).params
      : (props as { params: ParamsObj }).params;

  if (!isSupportedLocale(raw)) return notFound();
  const _locale = raw as Locale;

  // Root layout is responsible for <html> and global chrome.
  // We could pass _locale via context here if needed later.
  return <>{props.children}</>;
}
