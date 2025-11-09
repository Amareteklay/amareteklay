import Link from "next/link";
import type { Locale } from "@/lib/locales";

export const revalidate = 60;

const featureCards = [
  {
    label: "Writing",
    title: "Field notes & essays",
    copy: "Dispatches from adaptation programs, public health pilots, and data stories.",
    slug: "writing",
  },
  {
    label: "Projects",
    title: "Selected builds",
    copy: "Product experiments, research collaborations, and analytics work.",
    slug: "projects",
  },
];

type Props = { params: Promise<{ locale: Locale }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const localeHref = (slug?: string) => `/${locale}${slug ? `/${slug}` : ""}`;

  return (
    <section className="container space-y-12 py-16 lg:space-y-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-8">
          <div className="pill w-fit">Public health / Adaptation / Data</div>

          <div className="space-y-5">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
              Research, writing, and product work for resilient systems.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              I help teams translate field insight into clear narratives and tools—bridging climate adaptation,
              epidemiology, and data platforms.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Primary CTA */}
            <Link
              href={localeHref("writing")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Read the latest
              <span aria-hidden>&gt;</span>
            </Link>

            {/* Secondary / Outline CTA */}
            <Link
              href={localeHref("projects")}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary/60"
            >
              Explore projects
            </Link>
          </div>
        </div>

        {/* Right card */}
        <div className="surface-card hover-lift p-8">
          <p className="text-sm uppercase tracking-[0.4em] text-primary">Focus</p>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            Working across research, implementation, and storytelling.
          </h2>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
              Mixed-methods research for climate resilience and public health programs.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Product strategy for civic data tools and decision dashboards.
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
              Essays, briefs, and workshops to surface insight across teams.
            </li>
          </ul>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {featureCards.map((card) => (
          <Link
            key={card.label}
            href={localeHref(card.slug)}
            className="surface-card hover-lift flex flex-col gap-4 p-6 transition-colors hover:bg-secondary/60"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{card.label}</span>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-muted-foreground">{card.copy}</p>
            </div>
            <span className="text-sm font-semibold text-primary">View {card.label.toLowerCase()}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
