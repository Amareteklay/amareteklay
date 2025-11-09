// app/[locale]/writing/page.tsx
import Link from "next/link";
import { apiGet } from "@/lib/api";
import { PaginatedPostsLoose } from "@/lib/types";
import { normalizePost } from "@/lib/normalize";
import type { Locale } from "@/lib/locales";

export const revalidate = 60;

type ParamsObj = { locale: Locale };
type Props =
  | { params: ParamsObj }
  | { params: Promise<ParamsObj> }; // supports the Promise-params variant

export default async function WritingPage(props: Props) {
  // Support both current and “Promise params” behavior
  const { locale } =
    "then" in (props as any).params
      ? await (props as { params: Promise<ParamsObj> }).params
      : (props as { params: ParamsObj }).params;

  // Fetch raw -> validate with Zod -> normalize
  const data = await apiGet<unknown>("/content/posts/", locale, {
    revalidate,
    addQueryParam: true, // appends ?lang=<locale> if missing
  });

  const parsed = (() => {
    try {
      return PaginatedPostsLoose.parse(data);
    } catch (err) {
      // Bubble up with helpful context while keeping a concise stack
      const preview = JSON.stringify(data, null, 2).slice(0, 800);
      throw new Error(
        `Post list response failed validation.\n\nZod error: ${String(err)}\n\nResponse preview:\n${preview}`
      );
    }
  })();

  const posts = parsed.results.map((raw) => normalizePost(raw, locale));

  const withLocale = (slug: string) =>
    `/${locale}${slug.startsWith("/") ? "" : "/"}${slug}`;

  return (
    <section className="container space-y-10 py-12 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <p className="pill">Writing</p>
        <div>
          <h1 className="text-3xl font-semibold text-foreground">
            Dispatches &amp; field notes
          </h1>
          <p className="mt-2 text-muted-foreground">
            Essays, briefings, and field reflections on adaptation, health systems, and data-led programs.
          </p>
        </div>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <li key={p.id}>
            <Link
              href={withLocale(`/writing/${p.slug}`)}
              className="surface-card hover-lift block h-full space-y-3 p-5 transition hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                <span>Writing</span>
                {p.published_at && (
                  <time
                    dateTime={p.published_at}
                    className="tracking-normal text-muted-foreground/80"
                  >
                    {new Date(p.published_at).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground">{p.title}</h2>
                {p.excerpt && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
                    {p.excerpt}
                  </p>
                )}
              </div>

              <p className="text-sm font-medium text-primary">Read more →</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
