// app/[locale]/writing/page.tsx
import Link from "next/link";
import { apiGet } from "@/lib/api";
import { PaginatedPostsLoose } from "@/lib/types";
import { normalizePost } from "@/lib/normalize";
import type { Locale } from "@/lib/locales";

export const revalidate = 60;

type ParamsObj = { locale: Locale };
type Props = { params: ParamsObj } | { params: Promise<ParamsObj> };

export default async function WritingPage(props: Props) {
  const { locale } =
    "then" in (props as any).params
      ? await (props as { params: Promise<ParamsObj> }).params
      : (props as { params: ParamsObj }).params;

  const data = await apiGet<unknown>("/content/posts/", locale, {
    revalidate,
    addQueryParam: true,
  });

  const parsed = (() => {
    try {
      return PaginatedPostsLoose.parse(data);
    } catch (err) {
      const preview = JSON.stringify(data, null, 2).slice(0, 800);
      throw new Error(
        `Post list response failed validation.\n\nZod error: ${String(
          err
        )}\n\nResponse preview:\n${preview}`
      );
    }
  })();

  const posts = parsed.results.map((raw) => normalizePost(raw, locale));

  const withLocale = (slug: string) =>
    `/${locale}${slug.startsWith("/") ? "" : "/"}${slug}`;

  return (
    <section className="container mx-auto max-w-6xl space-y-12 py-16 text-center lg:py-20">
      {/* Header */}
      <div className="mx-auto max-w-3xl space-y-4">
        <p className="pill mx-auto">Writing</p>
        <h1 className="text-3xl font-semibold text-foreground lg:text-4xl">
           Notes from <span className="italic">Homo Adapticus</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Reflections at the intersection of adaptation, emotion, and technology—
          tracing how change unfolds across systems, behaviors, and data.
        </p>
      </div>

      {/* Grid of posts */}
      <ul className="mx-auto grid max-w-5xl justify-items-center gap-10 sm:grid-cols-2 lg:gap-12">
        {posts.map((p) => (
          <li key={p.id} className="w-full max-w-sm">
            <Link
              href={withLocale(`/writing/${p.slug}`)}
              className="group block h-full rounded-2xl bg-card/60 p-6 text-left shadow-sm ring-1 ring-border/40 transition-all hover:-translate-y-1 hover:bg-secondary/50 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                <span>Writing</span>
                {p.published_at && (
                  <time
                    dateTime={p.published_at}
                    className="tracking-normal text-muted-foreground/70"
                  >
                    {new Date(p.published_at).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>

              <div className="mt-3 space-y-2">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h2>
                {p.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {p.excerpt}
                  </p>
                )}
              </div>

              <p className="mt-4 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                Read more →
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
