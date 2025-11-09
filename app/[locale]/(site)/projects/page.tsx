import Link from "next/link";
import { apiGet } from "@/lib/api";
import { PaginatedPagesLoose } from "@/lib/types";
import { normalizePage } from "@/lib/normalize";
import type { Locale } from "@/lib/locales";

export const revalidate = 300;

type Props = { params: Promise<{ locale: Locale }> };

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;

  let projects: Array<ReturnType<typeof normalizePage>> = [];
  let errorMessage: string | null = null;

  try {
    const data = await apiGet<unknown>("/content/pages/", locale, { revalidate, addQueryParam: true });
    const parsed = PaginatedPagesLoose.parse(data);
    const pages = parsed.results.map((raw) => normalizePage(raw, locale));
    const blacklist = new Set(["about"]);
    projects = pages.filter((p) => !blacklist.has(p.slug));
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Unknown error";
  }

  if (errorMessage) {
    return (
      <section className="container py-12">
        <div className="surface-card p-6">
          <p className="text-lg font-semibold text-foreground">Couldn&apos;t load projects.</p>
          <pre className="mt-3 whitespace-pre-wrap text-xs text-muted-foreground">{errorMessage}</pre>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto max-w-6xl space-y-12 py-16 text-center lg:py-20">
      <div className="mx-auto max-w-3xl space-y-4">
        <p className="pill">Projects</p>
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Selected work</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Research collaborations, product experiments, and implementation work for climate resilience and public
            health systems.
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="surface-card p-6 text-muted-foreground">
          <p className="font-semibold text-foreground">No projects yet</p>
          <p className="mt-1 text-sm">New case studies will appear here soon.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/${locale}/projects/${p.slug}`}
              className="surface-card hover-lift flex h-full flex-col gap-3 p-6 transition hover:shadow-md"
            >
              <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Project</span>
              <h3 className="text-xl font-semibold text-foreground">{p.title}</h3>
              <p className="text-sm font-semibold text-primary">Open case study</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
