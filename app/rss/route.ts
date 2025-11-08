import { NextResponse } from "next/server";
import { locales } from "@/lib/locales";

type CmsPost = {
  slug: string;
  title: string;
  published_at?: string | null;
  excerpt?: string | null;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amareteklay.com";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? process.env.API_BASE ?? null;

async function fetchPosts(): Promise<CmsPost[]> {
  if (!API_BASE) return [];
  try {
    const url = new URL("/api/v1/content/pages/", API_BASE).toString();
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.results) ? (data.results as CmsPost[]) : [];
  } catch {
    return [];
  }
}

export async function GET() {
  const posts = await fetchPosts();

  const channels = await Promise.all(
    locales.map(async (locale) => {
      const items = posts
        .map(
          (p) => `
      <item>
        <title><![CDATA[${p.title}]]></title>
        <link>${SITE_URL}/${locale}/writing/${p.slug}</link>
        <pubDate>${new Date(p.published_at ?? Date.now()).toUTCString()}</pubDate>
        <guid>${SITE_URL}/${locale}/writing/${p.slug}</guid>
        <description><![CDATA[${p.excerpt ?? ""}]]></description>
      </item>`
        )
        .join("");

      return `
      <channel>
        <title>Amare Teklay -- Writing (${locale.toUpperCase()})</title>
        <link>${SITE_URL}/${locale}/writing</link>
        <description>Essays and notes</description>
        ${items}
      </channel>`;
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0">${channels.join("")}</rss>`.trim();

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
