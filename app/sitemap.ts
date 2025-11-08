import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";

type CmsPage = { slug: string };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amareteklay.com";
// Prefer the same envs you already use elsewhere
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? process.env.API_BASE ?? null;

async function fetchPages(): Promise<CmsPage[]> {
  if (!API_BASE) return []; // no API in build env → just ship static URLs
  try {
    const url = new URL("/api/v1/content/pages/", API_BASE).toString();
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.results) ? (data.results as CmsPage[]) : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    ["", "/writing", "/projects", "/about", "/contact"].map((segment) => ({
      url: `${SITE_URL}/${locale}${segment || "/"}`,
      changeFrequency: "weekly",
      priority: segment ? 0.6 : 1,
      lastModified: new Date(),
    }))
  );

  const pages = await fetchPages();

  const posts: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    pages.map((p) => ({
      url: `${SITE_URL}/${locale}/writing/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: new Date(),
    }))
  );

  return [...staticPaths, ...posts];
}
