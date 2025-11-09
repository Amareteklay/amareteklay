import { Suspense } from "react";
import ClientContactForm from "./ClientContactForm";

const contactDetails = [
  { label: "Email", value: "hello@amareteklay.com", href: "mailto:hello@amareteklay.com" },
  { label: "Location", value: "Stockholm" },
];

export default function ContactPage() {
  return (
    <section className="container mx-auto max-w-5xl py-16 text-center lg:py-20">
      {/* Header */}
      <div className="mx-auto max-w-2xl space-y-4">
        <p className="pill mx-auto">Contact</p>
        <h1 className="text-3xl font-semibold text-foreground lg:text-4xl">
          Let&apos;s collaborate
        </h1>
        <p className="text-lg text-muted-foreground">
          Research partnerships, implementation support, or editorial collaborations.
          I typically reply within a couple of days.
        </p>
      </div>

      {/* Content */}
      <div className="mx-auto mt-12 grid gap-10 text-left lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">
        {/* Left column */}
        <div className="mx-auto w-full max-w-md space-y-6">
          <ul className="space-y-5 text-sm text-muted-foreground">
            {contactDetails.map((detail) => (
              <li key={detail.label} className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                  {detail.label}
                </span>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-lg font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="text-lg font-semibold text-foreground">{detail.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right column (form) */}
        <div className="rounded-2xl bg-card/60 p-8 shadow-sm ring-1 ring-border/40 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-foreground">Share a note</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell me about your project, timeline, and how I can help.
          </p>
          <div className="mt-6">
            <Suspense fallback={null}>
              <ClientContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
