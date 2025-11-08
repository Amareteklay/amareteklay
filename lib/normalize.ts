import { LoosePage, Page, LoosePost, Post } from "./types";

/** simple HTML check for body_md */
function looksLikeHtml(str?: string) {
  return !!str && /<\/?[a-z][\s\S]*>/i.test(str);
}

/** POSTS (from earlier reply) */
export function normalizePost(raw: LoosePost): Post {
  const en = raw.translations?.en ?? {};
  const title = en.title ?? raw.slug ?? "(Untitled)";
  const body = en.body_md;
  const content_html = looksLikeHtml(body) ? body : (body ? `<p>${body}</p>` : undefined);
  const cover_image = typeof raw.hero_image === "string" ? raw.hero_image : undefined;
  const tags = Array.isArray(raw.tags) ? raw.tags : [];
  return {
    id: raw.id,
    slug: raw.slug,
    title,
    excerpt: en.summary,
    content_html,
    published_at: raw.published_at,
    cover_image,
    tags,
  };
}

/** PAGES */
export function normalizePage(raw: LoosePage): Page {
  const en = raw.translations?.en ?? {};
  const title = en.title ?? raw.slug ?? "(Untitled)";
  const body = en.body_md;
  const content_html = looksLikeHtml(body) ? body : (body ? `<p>${body}</p>` : undefined);
  const cover_image = typeof raw.hero_image === "string" ? raw.hero_image : undefined;

  return {
    id: raw.id,
    slug: raw.slug,
    title,
    content_html,
    cover_image,
  };
}
