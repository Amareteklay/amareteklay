import { z } from "zod";

/** Loose PAGE shape coming from your API (matches your sample) */
const metaRecord = z.record(z.string(), z.any());

export const LoosePage = z.object({
  id: z.string(), // UUID
  slug: z.string(),
  is_home: z.boolean().optional(),
  hero_image: z.string().nullable().optional(),
  site: z.string().optional(),
  meta: metaRecord.optional(),
  translations: z
    .object({
      en: z
        .object({
          title: z.string().optional(),
          body_md: z.string().optional(),
          seo_title: z.string().optional(),
          seo_desc: z.string().optional(),
        })
        .partial()
        .optional(),
      // you also have "ti-et", "sv" keys; we ignore for now
    })
    .partial(),
}).catchall(z.any());
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
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  content_html: z.string().optional(),
  cover_image: z.string().optional(),
});
export type Page = z.infer<typeof Page>;

/** Loose POST shape */
export const LoosePost = z.object({
  id: z.string(),
  slug: z.string(),
  hero_image: z.string().nullable().optional(),
  site: z.string().optional(),
  meta: metaRecord.optional(),
  tags: z.array(z.string()).optional(),
  published_at: z.string().nullable().optional(),
  translations: z
    .object({
      en: z
        .object({
          title: z.string().optional(),
          body_md: z.string().optional(),
          summary: z.string().optional(),
          seo_title: z.string().optional(),
          seo_desc: z.string().optional(),
        })
        .partial()
        .optional(),
    })
    .partial(),
}).catchall(z.any());
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
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  content_html: z.string().optional(),
  cover_image: z.string().optional(),
  published_at: z.string().nullable().optional(),
  tags: z.array(z.string()),
});
export type Post = z.infer<typeof Post>;
