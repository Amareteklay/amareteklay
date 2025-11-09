// app/[locale]/about/page.tsx
import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api";
import { LoosePage } from "@/lib/types";
import { normalizePage } from "@/lib/normalize";
import type { Locale } from "@/lib/locales";

export const revalidate = 300;

type ParamsObj = { locale: Locale };
type Props =
  | { params: ParamsObj }
  | { params: Promise<ParamsObj> };

export default async function AboutPage(props: Props) {
  const { locale } =
    "then" in (props as any).params
      ? await (props as { params: Promise<ParamsObj> }).params
      : (props as { params: ParamsObj }).params;

  let raw: unknown;
  try {
    raw = await apiGet<unknown>("/content/pages/about/?site=amare", locale, {
      revalidate,
      addQueryParam: true,
    });
  } catch (e) {
    // If the API 404s, surface a proper 404 page
    return notFound();
  }

  const pageLoose = (() => {
    try {
      return LoosePage.parse(raw);
    } catch (err) {
      const preview = JSON.stringify(raw, null, 2).slice(0, 800);
      throw new Error(
        `About page response failed validation.\n\nZod error: ${String(
          err
        )}\n\nResponse preview:\n${preview}`
      );
    }
  })();

  const page = normalizePage(pageLoose, locale);

  return (
    <section className="container max-w-3xl space-y-10 py-16 lg:py-24">
      <div className="pill w-fit bg-secondary/60 text-foreground">About</div>

      <article className="surface-card p-8 transition hover:shadow-md">
        <div className="prose max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:underline-offset-2 hover:prose-a:text-primary dark:prose-invert">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground">
            {page.title}
          </h1>

          {page.content_html ? (
            <div dangerouslySetInnerHTML={{ __html: page.content_html }} />
          ) : (
            <p className="italic text-muted-foreground">Content coming soon.</p>
          )}
        </div>
      </article>
    </section>
  );
}
