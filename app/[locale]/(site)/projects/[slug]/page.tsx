import { apiGet } from "@/lib/api";
import { LoosePage } from "@/lib/types";
import { normalizePage } from "@/lib/normalize";
import type { Locale } from "@/lib/locales";

type Props = { params: Promise<{ slug: string; locale: Locale }> };
export const revalidate = 300;

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const raw = await apiGet<unknown>(`/content/pages/${slug}/`, locale, {
    revalidate,
    addQueryParam: true,
  });
  const page = normalizePage(LoosePage.parse(raw));
  return { title: page.title, description: page.content_html?.replace(/<[^>]+>/g, "").slice(0, 120) };
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params;
  const raw = await apiGet<unknown>(`/content/pages/${slug}/`, locale, {
    revalidate,
    addQueryParam: true,
  });
  const page = normalizePage(LoosePage.parse(raw));

  return (
    <article className="container prose dark:prose-invert py-12">
      <h1>{page.title}</h1>
      {page.content_html ? (
        <div dangerouslySetInnerHTML={{ __html: page.content_html }} />
      ) : (
        <p className="opacity-70">Details coming soon.</p>
      )}
    </article>
  );
}
