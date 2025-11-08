import { apiGet } from "@/lib/api";
import { PaginatedPostsLoose } from "@/lib/types";
import { normalizePost } from "@/lib/normalize";
import type { Locale } from "@/lib/locales";

export const revalidate = 60;

type Props = { params: Promise<{ locale: Locale }> };

export default async function WritingPage({ params }: Props) {
  const { locale } = await params;
  const data = await apiGet<unknown>("/content/posts/", locale, { revalidate, addQueryParam: true });
  const parsed = PaginatedPostsLoose.parse(data);
  const posts = parsed.results.map(normalizePost);

  return (
    <section className="container space-y-10 py-12 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <p className="pill">Writing</p>
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Dispatches & field notes</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Essays, briefings, and field reflections on adaptation, health systems, and data-led programs.
          </p>
        </div>
      </div>

      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.id}>
            <a className="surface-card hover-lift block space-y-3 p-6" href={`/${locale}/writing/${p.slug}`}>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-500">
                <span>Writing</span>
                {p.published_at && (
                  <time
                    dateTime={p.published_at}
                    className="tracking-normal text-slate-400 dark:text-slate-500"
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
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{p.title}</h2>
                {p.excerpt && <p className="mt-2 text-slate-600 dark:text-slate-300">{p.excerpt}</p>}
              </div>
              <p className="text-sm font-semibold text-indigo-500">Read more</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
