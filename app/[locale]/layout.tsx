import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isSupportedLocale, locales } from "@/lib/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// In Next 15, segment layouts often receive `params` as a Promise
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) return notFound();

  // No <html> here; root layout handles it. Children render under the locale segment.
  return <>{children}</>;
}
