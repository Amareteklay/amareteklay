import { NextResponse } from "next/server";
import { locales } from "@/lib/locales";

type CmsPost = {
  slug: string;
  title: string;
  published_at?: string | null;
  excerpt?: string | null;
};

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  const api = process.env.NEXT_PUBLIC_API_URL!;
  const res = await fetch(`${api}/api/v1/content/pages/`, { next: { revalidate: 600 } });
  const data = res.ok ? await res.json() : { results: [] };
  const posts = (Array.isArray(data.results) ? data.results : []) as CmsPost[];

  const channels = await Promise.all(
    locales.map(async (locale) => {
      const items = posts
        .map(
          (p) => `
      <item>
        <title><![CDATA[${p.title}]]></title>
        <link>${base}/${locale}/writing/${p.slug}</link>
        <pubDate>${new Date(p.published_at ?? Date.now()).toUTCString()}</pubDate>
        <guid>${base}/${locale}/writing/${p.slug}</guid>
        <description><![CDATA[${p.excerpt ?? ""}]]></description>
      </item>`
        )
        .join("");

      return `
      <channel>
        <title>Amare Teklay -- Writing (${locale.toUpperCase()})</title>
        <link>${base}/${locale}/writing</link>
        <description>Essays and notes</description>
        ${items}
      </channel>`;
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0">${channels.join("")}</rss>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml" } });
}
