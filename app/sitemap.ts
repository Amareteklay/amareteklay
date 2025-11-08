import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/locales";

type CmsPage = { slug: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  const api = process.env.NEXT_PUBLIC_API_URL!;

  const staticPaths = SUPPORTED_LOCALES.flatMap((locale) =>
    ["", "/writing", "/projects", "/about", "/contact"].map((segment) => ({
      url: `${base}/${locale}${segment || "/"}`,
      changeFrequency: "weekly" as const,
      priority: segment ? 0.6 : 1,
    }))
  );

  const res = await fetch(`${api}/api/v1/content/pages/`, { next: { revalidate: 3600 } });
  const data = res.ok ? await res.json() : { results: [] };
  const payload = (Array.isArray(data.results) ? data.results : []) as CmsPage[];

  const posts = SUPPORTED_LOCALES.flatMap((locale) =>
    payload.map((page) => ({
      url: `${base}/${locale}/writing/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPaths, ...posts];
}
