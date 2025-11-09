// lib/types.ts
import { z } from "zod";

/** ---------- Common ---------- */
const metaRecord = z.record(z.string(), z.any());

/** A single translation entry (for any locale) */
const Translation = z
  .object({
    title: z.string().optional(),
    body_md: z.string().optional(),
    body_html: z.string().optional(),   // <-- added for HTML-in-translations support
    summary: z.string().optional(),
    excerpt: z.string().optional(),
    seo_title: z.string().optional(),
    seo_desc: z.string().optional(),
  })
  .partial();

/** ---------- PAGES (loose from API) ---------- */
export const LoosePage = z
  .object({
    id: z.union([z.string(), z.number()]),
    slug: z.string(),
    is_home: z.boolean().optional(),
    site: z.string().optional(),
    meta: metaRecord.optional(),

    // Either translations...
    translations: z.record(z.string(), Translation).optional(),

    // ...or a flat public instance (detail) shape
    title: z.string().optional(),
    summary: z.string().optional(),
    body_html: z.string().optional(),
    body_md: z.string().optional(),     // <-- allow flat Markdown too
    seo_title: z.string().optional(),
    seo_desc: z.string().optional(),

    // hero can appear in either form
    hero_image: z.string().nullable().optional(),
    hero_image_data: z.any().optional(),

    active_locale: z.string().optional(),
    available_locales: z.array(z.string()).optional(),
  })
  .catchall(z.any());
export type LoosePage = z.infer<typeof LoosePage>;

export const PaginatedPagesLoose = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(LoosePage),
});
export type PaginatedPagesLoose = z.infer<typeof PaginatedPagesLoose>;

/** Normalized Page used by the UI */
export const Page = z.object({
  id: z.union([z.string(), z.number()]),
  slug: z.string(),
  title: z.string(),
  content_html: z.string().optional(),
  cover_image: z.string().optional(),
});
export type Page = z.infer<typeof Page>;

/** ---------- POSTS (loose from API) ---------- */
export const LoosePost = z
  .object({
    id: z.union([z.string(), z.number()]),
    slug: z.string(),

    // shared fields
    site: z.string().optional(),
    meta: metaRecord.optional(),
    tags: z.array(z.string()).optional(),
    published_at: z.string().nullable().optional(),

    // media
    hero_image: z.string().nullable().optional(),
    hero_image_data: z.any().optional(),

    // Either translations...
    translations: z.record(z.string(), Translation).optional(),

    // ...or a flat public instance (detail) shape
    title: z.string().optional(),
    summary: z.string().optional(),
    body_html: z.string().optional(),
    body_md: z.string().optional(),
    seo_title: z.string().optional(),
    seo_desc: z.string().optional(),
  })
  .catchall(z.any());
export type LoosePost = z.infer<typeof LoosePost>;

export const PaginatedPostsLoose = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(LoosePost),
});
export type PaginatedPostsLoose = z.infer<typeof PaginatedPostsLoose>;

/** Normalized Post used by the UI */
export const Post = z.object({
  id: z.union([z.string(), z.number()]),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  content_html: z.string().optional(),
  cover_image: z.string().optional(),
  published_at: z.string().nullable().optional(),
  tags: z.array(z.string()),
});
export type Post = z.infer<typeof Post>;
