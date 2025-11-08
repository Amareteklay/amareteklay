import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { apiGet } from "@/lib/api";
import { isLocale, type Locale } from "@/lib/locales";

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

type RouteParams = { params: { locale: string; slug: string } };

function plainText(html?: string) {
  return html ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";
}

async function fetchPost(slug: string, locale: Locale) {
  const qs = new URLSearchParams({ slug });
  const res = await apiGet<{ results: Post[] }>(`/content/posts/?${qs}`, locale, {
    revalidate,
    addQueryParam: true,
  });
  return res.results?.[0] ?? null;
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { locale: rawLocale, slug } = params;
  if (!isLocale(rawLocale)) return { title: "Not found" };
  const locale = rawLocale as Locale;

  const post = await fetchPost(slug, locale);
  if (!post) return { title: "Not found" };

  const description =
    post.excerpt ||
    post.summary ||
    plainText(post.content_html || post.body)?.slice(0, 140) ||
    undefined;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/${locale}/writing/${post.slug}`,
    },
    alternates: {
      canonical: `/${locale}/writing/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: RouteParams) {
  const { locale: rawLocale, slug } = params;
  if (!isLocale(rawLocale)) return notFound();
  const locale = rawLocale as Locale;

  const post = await fetchPost(slug, locale);
  if (!post) return notFound();

  const html = post.content_html || post.body || "";

  // Optional: JSON-LD Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.published_at || undefined,
    description:
      post.excerpt ||
      post.summary ||
      plainText(post.content_html || post.body)?.slice(0, 200) ||
      undefined,
    mainEntityOfPage: `/${locale}/writing/${post.slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{post.title}</h1>
      <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        {post.published_at
          ? new Date(post.published_at).toLocaleDateString()
          : ""}
      </p>
      <article
        className="prose max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
