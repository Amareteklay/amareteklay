import Link from "next/link";

export const revalidate = 60;

const featureCards = [
  {
    label: "Writing",
    title: "Field notes & essays",
    copy: "Dispatches from adaptation programs, public health pilots, and data stories.",
    href: "/writing",
  },
  {
    label: "Projects",
    title: "Selected builds",
    copy: "Product experiments, research collaborations, and analytics work.",
    href: "/projects",
  },
];

export default function HomePage() {
  return (
    <section className="container space-y-12 py-16 lg:space-y-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-8">
          <div className="pill w-fit">Public health · Adaptation · Data</div>
          <div className="space-y-5">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white lg:text-5xl">
              Research, writing, and product work for resilient systems.
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              I help teams translate field insight into clear narratives and tools--bridging climate adaptation,
              epidemiology, and data platforms.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Read the latest
              <span aria-hidden>&gt;</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900/30 dark:border-white/20 dark:text-white dark:hover:border-white/50"
            >
              Explore projects
            </Link>
          </div>
        </div>
        <div className="surface-card hover-lift p-8">
          <p className="text-sm uppercase tracking-[0.4em] text-indigo-500">Focus</p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
            Working across research, implementation, and storytelling.
          </h2>
          <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
              Mixed-methods research for climate resilience and public health programs.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              Product strategy for civic data tools and decision dashboards.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
              Essays, briefs, and workshops to surface insight across teams.
            </li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {featureCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="surface-card hover-lift flex flex-col gap-4 p-6 transition-colors hover:bg-white"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-slate-500">{card.label}</span>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{card.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{card.copy}</p>
            </div>
            <span className="text-sm font-semibold text-indigo-500">View {card.label.toLowerCase()}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
