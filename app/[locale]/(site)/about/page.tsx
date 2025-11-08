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
    <section className="container max-w-3xl space-y-10 py-16 lg:py-24">
  <div className="pill w-fit bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-sm font-medium text-blue-600 dark:text-emerald-400">
    About
  </div>

  <article className="rounded-2xl border border-slate-200/60 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-slate-900/80">
    <div className="prose prose-slate max-w-none prose-h1:mt-0 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-invert dark:prose-a:text-emerald-400">
      <h1 className="mb-6 text-4xl font-bold tracking-tight">{page.title}</h1>
      {page.content_html ? (
        <div dangerouslySetInnerHTML={{ __html: page.content_html }} />
      ) : (
        <p className="italic text-slate-500 dark:text-slate-400">
          Content coming soon.
        </p>
      )}
    </div>
  </article>
</section>
  );
}
