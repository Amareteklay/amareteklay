import { api } from "@/lib/api";
import { LoosePage } from "@/lib/types";
import { normalizePage } from "@/lib/normalize";

export const revalidate = 300;

export default async function AboutPage() {
  const raw = await api<unknown>("/content/pages/about/", { next: { revalidate } });
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
