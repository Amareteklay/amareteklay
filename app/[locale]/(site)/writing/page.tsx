import Link from "next/link";
import { apiGet } from "@/lib/api";
import { PaginatedPostsLoose } from "@/lib/types";
import { normalizePost } from "@/lib/normalize";
import type { Locale } from "@/lib/locales";

export const revalidate = 60;

type Props = { params: Promise<{ locale: Locale }> };

export default async function WritingPage({ params }: Props) {
  // ⬇️ Unwrap the params Promise (Next 15 behavior for segment pages)
  const { locale } = await params;

  const data = await apiGet<unknown>("/content/posts/", locale, {
    revalidate,
    addQueryParam: true,
  });

  const parsed = PaginatedPostsLoose.parse(data);
  const posts = parsed.results.map(normalizePost);

  const withLocale = (slug: string) =>
    `/${locale}${slug.startsWith("/") ? "" : "/"}${slug}`;

  return (
    <section className="container space-y-10 py-12 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <p className="pill">Writing</p>
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Dispatches &amp; field notes</h1>
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
                    {new Date(p.published_at).toLocaleDateString(undefined, {
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
