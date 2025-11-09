import { apiGet } from "@/lib/api";
import { LoosePage } from "@/lib/types";
import { normalizePage } from "@/lib/normalize";
import type { Locale } from "@/lib/locales";

export const revalidate = 300;

type Props = { params: Promise<{ locale: Locale }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const raw = await apiGet<unknown>("/content/pages/about/", locale, {
    revalidate,
    addQueryParam: true,
  });
  const page = normalizePage(LoosePage.parse(raw));

  return (
    <section className="container max-w-3xl space-y-10 py-16 lg:py-24">
      {/* Section pill */}
      <div className="pill w-fit bg-secondary/60 text-foreground">
        About
      </div>

      {/* Content card */}
      <article className="surface-card p-8 transition hover:shadow-md">
        <div className="prose max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:underline-offset-2 hover:prose-a:text-primary">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground">
            {page.title}
          </h1>

          {page.content_html ? (
            <div dangerouslySetInnerHTML={{ __html: page.content_html }} />
          ) : (
            <p className="italic text-muted-foreground">
              Content coming soon.
            </p>
          )}
        </div>
      </article>
    </section>
  );
}
