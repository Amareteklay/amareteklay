import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isSupportedLocale, SUPPORTED_LOCALES } from "@/lib/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return notFound();
  return <>{children}</>;
}
