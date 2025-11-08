import { api } from "@/lib/api";
import { PaginatedPagesLoose } from "@/lib/types";
import { normalizePage } from "@/lib/normalize";

export const revalidate = 300;

export default async function ProjectsPage() {
  let projects: Array<ReturnType<typeof normalizePage>> = [];
  let errorMessage: string | null = null;

  try {
    const data = await api<unknown>("/content/pages/", { next: { revalidate } });
    const parsed = PaginatedPagesLoose.parse(data);
    const pages = parsed.results.map(normalizePage);
    const blacklist = new Set(["about"]);
    projects = pages.filter((p) => !blacklist.has(p.slug));
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Unknown error";
  }

  if (errorMessage) {
    return (
      <section className="container py-12">
        <div className="surface-card p-6">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">Couldn&apos;t load projects.</p>
          <pre className="mt-3 whitespace-pre-wrap text-xs text-slate-500 dark:text-slate-400">{errorMessage}</pre>
        </div>
      </section>
    );
  }

  return (
    <section className="container space-y-10 py-12 lg:py-16">
      <div className="space-y-4">
        <p className="pill">Projects</p>
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Selected work</h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
            Research collaborations, product experiments, and implementation work for climate resilience and public
            health systems.
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="surface-card p-6 text-slate-600 dark:text-slate-300">
          <p className="font-semibold text-slate-900 dark:text-white">No projects yet</p>
          <p className="mt-1 text-sm">New case studies will appear here soon.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <a key={p.id} href={`/projects/${p.slug}`} className="surface-card hover-lift flex h-full flex-col gap-3 p-6">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Project</span>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{p.title}</h3>
              <p className="text-sm font-semibold text-indigo-500">Open case study</p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
