import { apiGet } from "@/lib/api";
import { LoosePage } from "@/lib/types";
import { normalizePage } from "@/lib/normalize";
import type { Locale } from "@/lib/locales";

export const revalidate = 300;

type Props = { params: Promise<{ locale: Locale }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const raw = await apiGet<unknown>("/content/pages/about/", locale, { revalidate, addQueryParam: true });
  const page = normalizePage(LoosePage.parse(raw));

  return (
    <section className="container space-y-8 py-12 lg:py-16">
      <div className="pill w-fit">About</div>
      <article className="surface-card prose max-w-none dark:prose-invert">
        <div className="prose-h1:mt-0 prose-headings:tracking-tight prose-p:text-slate-600 dark:prose-p:text-slate-200">
          <h1>{page.title}</h1>
          {page.content_html ? (
            <div dangerouslySetInnerHTML={{ __html: page.content_html }} />
          ) : (
            <p className="opacity-70">Content coming soon.</p>
          )}
        </div>
      </article>
    </section>
  );
}
