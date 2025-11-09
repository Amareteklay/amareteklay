// app/[locale]/(site)/page.tsx
import Link from "next/link";
import type { Locale } from "@/lib/locales";

export const revalidate = 60;

const featureCards = [
  {
    label: "Writing",
    title: "Field notes & essays",
    copy: "Dispatches on outbreaks, behavior, and adaptation—plus working notes and previews.",
    slug: "writing",
  },
  {
    label: "Projects",
    title: "Selected builds",
    copy: "Parallel tracks: epidemic risk work and online experiments; data and software that support both.",
    slug: "projects",
  },
];

type ParamsObj = { locale: Locale };
type Props = { params: ParamsObj } | { params: Promise<ParamsObj> };

export default async function HomePage(props: Props) {
  const { locale } =
    "then" in (props as any).params
      ? await (props as { params: Promise<ParamsObj> }).params
      : (props as { params: ParamsObj }).params;

  const localeHref = (slug?: string) => `/${locale}${slug ? `/${slug}` : ""}`;

  return (
    <main id="main" className="container mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="space-y-12 lg:space-y-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          <section className="space-y-8">
            <header className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
                Amare Teklay — PhD economist & software developer
              </p>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground lg:text-5xl">
                I study how people and systems adapt to change.
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                My work spans two ongoing tracks: one on the evolving risks from{" "}
                <em className="not-italic font-medium">emerging pests and pathogens</em> in a
                polycrisis world, and another exploring{" "}
                <em className="not-italic font-medium">behavior, emotion, and AI</em> through
                online experiments on sustainability and choice.
                <br className="hidden sm:block" />
                <span className="sm:whitespace-nowrap">Homo Adapticus</span> is the idea that links them—how we adapt,
                plan, and sometimes fail to.
              </p>
            </header>

            <div className="flex flex-wrap gap-3">
              <Link
                href={localeHref("writing")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md"
              >
                Read the latest
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">&gt;</span>
              </Link>

              <Link
                href={localeHref("projects")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-secondary/60 hover:shadow-md"
              >
                Explore projects
              </Link>
            </div>
          </section>

          <aside className="surface-card hover-lift rounded-xl border border-border/50 bg-gradient-to-br from-background to-secondary/20 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">Focus areas</p>
            <h2 className="mt-3 text-xl font-semibold leading-snug text-foreground lg:text-2xl">
              Linking risks, behaviors, and tools through adaptation.
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500 ring-2 ring-red-500/20" aria-hidden />
                <span>Emerging pests & pathogens interacting with conflict, climate, and mobility shocks.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" aria-hidden />
                <span>Online experiments on emotion, AI, and sustainable behavior.</span>
              </li>
            </ul>
          </aside>
        </div>

        <section aria-label="Featured sections" className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {featureCards.map((card) => (
            <Link
              key={card.label}
              href={localeHref(card.slug)}
              className="group surface-card hover-lift rounded-xl border border-border/50 bg-background p-5 shadow-sm transition-all hover:border-primary/20 hover:bg-secondary/40 hover:shadow-md"
            >
              <span className="text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground/80">
                {card.label}
              </span>
              <div className="mt-3">
                <h3 className="text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.copy}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                View {card.label.toLowerCase()}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}