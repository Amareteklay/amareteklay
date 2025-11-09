// lib/normalize.ts
import { LoosePage, Page, LoosePost, Post } from "./types";
import type { Locale } from "./locales";

/** HTML-ish check */
function looksLikeHtml(str?: string) {
  return !!str && /<\/?[a-z][\s\S]*>/i.test(str);
}

/** Wrap plain text/markdown-ish into a simple <p> if it's not already HTML */
function toHtml(body?: string) {
  if (!body) return undefined;
  return looksLikeHtml(body) ? body : `<p>${body}</p>`;
}

/** Derive a short text excerpt from HTML */
function htmlToExcerpt(html?: string, max = 180) {
  if (!html) return undefined;
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.slice(0, max) : undefined;
}

/** Pick the best translation for the given locale, then fall back */
function pickTranslation<T extends Record<string, any> | undefined>(
  translations: Record<string, T> | undefined,
  locale: Locale
) {
  return (
    translations?.[locale] ??
    translations?.en ?? // common default
    (translations ? translations[Object.keys(translations)[0]] : undefined) // any available
  );
}

/** ------------------- POSTS ------------------- */
export function normalizePost(raw: LoosePost, locale: Locale = "en"): Post {
  // Prefer flat detail shape if present
  const flatTitle = (raw as any).title as string | undefined;
  const flatHtml = (raw as any).body_html as string | undefined;
  const flatMd = (raw as any).body_md as string | undefined;
  const flatSummary = (raw as any).summary as string | undefined;

  const t = pickTranslation(raw.translations, locale) ?? {};

  const title = flatTitle ?? t.title ?? raw.slug ?? "(Untitled)";

  // Prefer explicit HTML (flat or translated), then fall back to MD (flat or translated)
  const content_html =
    flatHtml ??
    t.body_html ??
    toHtml(flatMd ?? t.body_md);

  const cover_image =
    typeof raw.hero_image === "string" ? raw.hero_image : undefined;

  const tags = Array.isArray(raw.tags) ? raw.tags : [];

  // Prefer explicit excerpts/summaries (translated first, then flat), otherwise derive
  const excerpt =
    t.excerpt ??
    t.summary ??
    flatSummary ??
    htmlToExcerpt(content_html);

  return {
    id: raw.id,
    slug: raw.slug,
    title,
    excerpt,
    content_html,
    published_at: raw.published_at ?? null,
    cover_image,
    tags,
  };
}

/** ------------------- PAGES ------------------- */
export function normalizePage(raw: LoosePage, locale: Locale = "en"): Page {
  // Prefer flat detail shape if present
  const flatTitle = (raw as any).title as string | undefined;
  const flatHtml = (raw as any).body_html as string | undefined;
  const flatMd = (raw as any).body_md as string | undefined;

  const t = pickTranslation(raw.translations, locale) ?? {};

  const title = flatTitle ?? t.title ?? raw.slug ?? "(Untitled)";

  const content_html =
    flatHtml ??
    t.body_html ??
    toHtml(flatMd ?? t.body_md);

  const cover_image =
    typeof raw.hero_image === "string" ? raw.hero_image : undefined;

  return {
    id: raw.id,
    slug: raw.slug,
    title,
    content_html,
    cover_image,
  };
}
