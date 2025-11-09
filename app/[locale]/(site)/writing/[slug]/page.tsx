import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/api";
import { isLocale, type Locale } from "@/lib/locales";

export const revalidate = 300;

type RouteParams = { params: Promise<{ locale: string; slug: string }> };

function toPlainText(html?: string) {
  return html ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";
}

async function fetchPost(locale: Locale, slug: string) {
  try {
    return await getPostBySlug(slug, locale, { revalidate });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return { title: "Not found" };
  const locale = rawLocale as Locale;

  const post = await fetchPost(locale, slug);
  if (!post) return { title: "Not found" };

  const description = toPlainText(post.content_html)?.slice(0, 140) || undefined;

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
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return notFound();
  const locale = rawLocale as Locale;

  const post = await fetchPost(locale, slug);
  if (!post) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: toPlainText(post.content_html)?.slice(0, 200) || undefined,
    mainEntityOfPage: `/${locale}/writing/${post.slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{post.title}</h1>
      <article
        className="prose max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content_html ?? "<p>(No content)</p>" }}
      />
    </main>
  );
}
