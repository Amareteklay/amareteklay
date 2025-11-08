import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DEFAULT_LOCALE, isSupportedLocale, type Locale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Amare Teklay",
  description: "Research, writing, and projects.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: { images: ["/og-default.png"] },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale: localeParam } = await params;

  // Narrow to string first; then validate with the type guard
  const locale: Locale =
    typeof localeParam === "string" && isSupportedLocale(localeParam)
      ? (localeParam as Locale)
      : DEFAULT_LOCALE;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar locale={locale} />
          <main className="min-h-[70vh]">{children}</main>
          <Footer locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
