// app/[locale]/about/page.tsx
import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api";
import { LoosePage } from "@/lib/types";
import { normalizePage } from "@/lib/normalize";
import type { Locale } from "@/lib/locales";

export const revalidate = 300;

type ParamsObj = { locale: Locale };
type Props = { params: ParamsObj } | { params: Promise<ParamsObj> };

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
  } catch {
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
  <section
    className="col-span-full w-full justify-self-center container max-w-3xl py-20 text-center lg:py-28"
  >
    <div className="mx-auto mb-6 w-fit rounded-full bg-secondary/60 px-4 py-1.5 text-sm text-foreground/80">
      About
    </div>

    <h1 className="mb-10 text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
      {page.title}
    </h1>

    <article className="mx-auto rounded-2xl bg-card/60 p-8 shadow-sm backdrop-blur-sm transition-colors sm:p-10">
      <div className="prose mx-auto max-w-none text-left prose-headings:font-semibold prose-headings:tracking-tight prose-a:underline-offset-2 hover:prose-a:text-primary dark:prose-invert">
        {page.content_html ? (
          <div dangerouslySetInnerHTML={{ __html: page.content_html }} />
        ) : (
          <p className="italic text-muted-foreground text-center">Content coming soon.</p>
        )}
      </div>
    </article>
  </section>
  );
}
