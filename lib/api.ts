// lib/api.ts
import type { Locale } from "./locales";

/** ---------- Constants ---------- */
const DEFAULT_REVALIDATE = 300;

const RAW_API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? process.env.API_BASE;
if (!RAW_API_BASE) {
  throw new Error("API base URL is not configured (API_BASE / NEXT_PUBLIC_API_BASE)");
}
const API_BASE = normalizeBase(RAW_API_BASE);

// Optional site scoping (PythonAnywhere shows ?site=amare)
const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG ?? process.env.SITE_SLUG ?? undefined;

/** ---------- Types ---------- */
type ApiGetInit = RequestInit & {
  revalidate?: number;     // Next.js ISR seconds; 0 => no-store
  addQueryParam?: boolean; // add ?lang & ?site automatically
};

export type LooseTranslation = {
  title?: string;
  body_md?: string;
  summary?: string;
  excerpt?: string;
};

export type LoosePost = {
  id: number | string;
  slug: string;
  site?: string;
  tags?: string[] | null;
  published_at?: string | null;

  // list shape
  hero_image?: string | null;
  translations?: Record<string, LooseTranslation>;

  // detail public instance shape
  title?: string;
  summary?: string;
  body_html?: string;
  seo_title?: string;
  seo_desc?: string;
  hero_image_data?: any;
  active_locale?: string;
  available_locales?: string[];
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Post = {
  id: number | string;
  slug: string;
  title: string;
  content_html?: string;
  cover_image?: string;
  tags: string[];
  excerpt?: string;
  published_at?: string | null;
};

/** ---------- Navigation (grouped) ---------- */
// Shape your endpoint returns
type RawNavEntry = {
  label: string;
  url: string;
  new_tab?: boolean;
  order?: number;
  children_list?: RawNavEntry[];
};
type RawNavGroup = {
  id?: string;
  site?: string;
  slug: string; // "main" | "footer" | ...
  items: RawNavEntry[];
};

// Normalized for app use
export type NavItem = {
  id?: string | number;
  slug: string;            // internal slug ("" for home) when internal
  label: string;
  url?: string;            // preserves absolute URLs (external)
  external?: boolean;
  newTab?: boolean;
  order?: number;
  children?: NavItem[];
};

/** ---------- Core fetcher ---------- */
export async function apiGet<T>(
  path: string,
  locale: Locale,
  init?: ApiGetInit
): Promise<T> {
  if (!path) throw new Error("Path must be provided");

  const url = buildUrl(path);

  // Ensure ?lang and ?site when desired and missing
  if (init?.addQueryParam) {
    if (!url.searchParams.has("lang")) url.searchParams.set("lang", locale);
    if (SITE_SLUG && !url.searchParams.has("site")) url.searchParams.set("site", SITE_SLUG);
  }

  const revalidate = init?.revalidate ?? DEFAULT_REVALIDATE;

  const res = await fetch(url.toString(), {
    ...init,
    cache: revalidate === 0 ? "no-store" : undefined,
    next: { revalidate: revalidate > 0 ? revalidate : undefined },
    headers: {
      Accept: "application/json",
      "Accept-Language": locale,
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let body = "";
    try { body = await res.text(); } catch {}
    throw new Error(
      `Fetch failed (${res.status}) ${url.toString()}\n` +
      (body ? `Response body:\n${body}` : "")
    );
  }

  return (await res.json()) as T;
}

/** ---------- Posts ---------- */
export async function listPosts(locale: Locale, init?: Partial<ApiGetInit>) {
  const data = await apiGet<Paginated<LoosePost>>(
    "/content/posts/",
    locale,
    { addQueryParam: true, revalidate: 60, ...(init || {}) }
  );
  return {
    ...data,
    results: data.results.map((p) => normalizePost(p, locale)),
  };
}

export async function getPostBySlug(
  slug: string,
  locale: Locale,
  init?: Partial<ApiGetInit>
) {
  console.log("DETAIL TRY:", `/content/posts/${encodeURIComponent(slug)}/`, "lang=", locale);
  try {
    const raw = await apiGet<LoosePost>(
      `/content/posts/${encodeURIComponent(slug)}/`,
      locale,
      { addQueryParam: true, revalidate: 300, ...(init || {}) }
    );
    return normalizePost(raw, locale);
  } catch (err: any) {
    const msg = String(err ?? "");
    const isLikelyNotFound =
      msg.includes(" 404 ") || msg.toLowerCase().includes("not found") || msg.includes(" 405 ");
    if (!isLikelyNotFound) throw err;
  }

  const qs = new URLSearchParams({ slug });
  const data = await apiGet<Paginated<LoosePost>>(
    `/content/posts/?${qs}`,
    locale,
    { addQueryParam: true, revalidate: 300, ...(init || {}) }
  );
  const match = data.results?.find((p) => p.slug === slug) ?? data.results?.[0];
  if (!match) throw new Error(`Post with slug "${slug}" not found in fallback list query.`);
  return normalizePost(match, locale);
}

/** ---------- Navigation (group-aware) ---------- */
export async function listNavigationMenu(
  locale: Locale,
  menuSlug: "main" | "footer" | (string & {}) = "main",
  init?: Partial<ApiGetInit>
): Promise<NavItem[]> {
  // The endpoint returns an array of groups [{ slug: "main", items: [...]}, { slug: "footer", ...}]
  const groups = await apiGet<RawNavGroup[]>(
    "/navigation/",
    locale,
    { addQueryParam: true, revalidate: 300, ...(init || {}) }
  );

  const group = groups.find((g) => (g.slug || "").toLowerCase() === menuSlug.toLowerCase());
  if (!group) return [];

  const items = (group.items || []).slice().sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
  return items.map((e) => normalizeGroupEntry(e, locale)).filter(Boolean) as NavItem[];
}

function normalizeGroupEntry(e: RawNavEntry, locale: Locale): NavItem | null {
  const label = (e.label || "").trim();
  const url = (e.url || "").trim();
  if (!label || !url) return null;

  const external = /^https?:\/\//i.test(url);

  // Internal URL comes as "/en" or "/en/about" etc -> derive slug ("" for home)
  let slug = "";
  if (!external && url.startsWith("/")) {
    const parts = url.split("/").filter(Boolean); // ["en","about"]
    const urlLocale = parts[0];
    // If the URL's first segment is a locale, drop it and keep the rest as slug
    const isUrlLocale = !!urlLocale && urlLocale.length <= 5; // cheap guard
    const rest = isUrlLocale ? parts.slice(1) : parts;
    slug = rest.join("/"); // "" for home
  }

  const children = Array.isArray(e.children_list)
    ? e.children_list.map((c) => normalizeGroupEntry(c, locale)).filter(Boolean) as NavItem[]
    : undefined;

  return {
    label,
    slug,
    url: external ? url : undefined,
    external,
    newTab: !!e.new_tab,
    order: e.order ?? undefined,
    children,
  };
}

/** ---------- Helpers ---------- */
function normalizeBase(raw: string): URL {
  const cleaned = raw.replace(/\s/g, "");
  const withSlash = cleaned.endsWith("/") ? cleaned : `${cleaned}/`;
  try {
    return new URL(withSlash);
  } catch {
    throw new Error(`Invalid API base URL: ${raw}`);
  }
}

function buildUrl(path: string): URL {
  if (/^https?:\/\//i.test(path)) return new URL(path);
  const cleanedPath = path.startsWith("/") ? path.slice(1) : path;
  return new URL(cleanedPath, API_BASE);
}

function mdToHtmlOrPassthrough(s?: string) {
  if (!s) return undefined;
  const looksHtml = /<\/?[a-z][\s\S]*>/i.test(s);
  return looksHtml ? s : `<p>${s}</p>`;
}

function normalizePost(raw: LoosePost, locale: Locale): Post {
  if (raw.body_html || raw.title) {
    return {
      id: raw.id,
      slug: raw.slug,
      title: raw.title ?? raw.slug ?? "(Untitled)",
      content_html: raw.body_html ?? undefined,
      cover_image: undefined,
      tags: Array.isArray(raw.tags) ? raw.tags : [],
      excerpt: raw.summary ?? undefined,
      published_at: raw.published_at ?? null,
    };
  }

  const t = raw.translations?.[locale] ?? raw.translations?.["en"] ?? {};
  const excerpt =
    t.excerpt ??
    t.summary ??
    (t.body_md
      ? t.body_md.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 180)
      : undefined);

  return {
    id: raw.id,
    slug: raw.slug,
    title: t.title ?? raw.slug ?? "(Untitled)",
    content_html: mdToHtmlOrPassthrough(t.body_md),
    cover_image: typeof (raw as any).hero_image === "string" ? (raw as any).hero_image : undefined,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    excerpt,
    published_at: raw.published_at ?? null,
  };
}
