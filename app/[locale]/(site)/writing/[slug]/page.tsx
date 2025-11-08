// app/[locale]/(site)/writing/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { apiGet } from "@/lib/api";
import type { Locale } from "@/lib/locales";

export const revalidate = 300;

type Post = {
  slug: string;
  title: string;
  content_html?: string;
  body?: string;
  published_at?: string;
  excerpt?: string;
  summary?: string;
};

type Props = { params: { locale: Locale; slug: string } };

function plainText(html?: string) {
  return html ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";
}

async function fetchPost(slug: string, locale: string) {
  // Option A: detail-by-slug
  // return apiGet<Post>(`/content/posts/${encodeURIComponent(slug)}/`, locale, {
  //   revalidate,
  //   addQueryParam: true,
  // });

  // Option B: query-by-slug (works with paginated list APIs)
  const res = await apiGet<{ results: Post[] }>(
    `/content/posts/?slug=${encodeURIComponent(slug)}`,
    locale,
    { revalidate, addQueryParam: true }
  );
  return res.results?.[0] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = params;
  const post = await fetchPost(slug, locale);
  if (!post) return { title: "Not found" };

  const description =
    post.excerpt || post.summary || plainText(post.content_html || post.body)?.slice(0, 140) || undefined;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `/${locale}/writing/${post.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `/${locale}/writing/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug, locale } = params;
  const post = await fetchPost(slug, locale);
  if (!post) return notFound();

  const html = post.content_html || post.body || "";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{post.title}</h1>
      <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        {post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}
      </p>
      <article
        className="prose max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
