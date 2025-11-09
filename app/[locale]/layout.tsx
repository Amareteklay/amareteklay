import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isSupportedLocale, locales } from "@/lib/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string }; // <-- not a Promise
}) {
  const { locale } = params;

  if (!isSupportedLocale(locale)) return notFound();

  // No <html> here; root layout already renders it.
  // Navbar/Footer derive locale from the URL, so no props needed.
  return <>{children}</>;
}
