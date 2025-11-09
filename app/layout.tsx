import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DEFAULT_LOCALE } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Amare Teklay",
  description: "Research, writing, and projects.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: { images: ["/og-default.png"] },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar /> {/* no locale prop */}
          <main className="min-h-[70vh]">{children}</main>
          <Footer /> {/* no locale prop */}
        </ThemeProvider>
      </body>
    </html>
  );
}
