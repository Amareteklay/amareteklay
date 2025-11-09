// app/api/nav/route.ts
import { NextResponse } from "next/server";
import { listNavigationMenu } from "@/lib/api";
import { DEFAULT_LOCALE, isSupportedLocale, type Locale } from "@/lib/locales";

export const revalidate = 300; // ISR for this route

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lp = (searchParams.get("locale") || DEFAULT_LOCALE) as string;
  const menu = (searchParams.get("menu") || "main").toLowerCase();
  const locale: Locale = isSupportedLocale(lp) ? (lp as Locale) : DEFAULT_LOCALE;

  try {
    const items = await listNavigationMenu(locale, menu as any, { revalidate: 300 });
    return NextResponse.json(items, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "nav_fetch_failed", message: String(e?.message || e) },
      { status: 502 }
    );
  }
}
