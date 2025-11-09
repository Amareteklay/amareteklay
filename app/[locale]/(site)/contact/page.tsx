import { Suspense } from "react";
import ClientContactForm from "./ClientContactForm";
export const dynamic = 'force-dynamic'
export const dynamicParams = true

const contactDetails = [
  { label: "Email", value: "hello@amareteklay.com", href: "mailto:hello@amareteklay.com" },
  { label: "Location", value: "Stockholm / Addis Ababa" },
];

export default function ContactPage() {
  return (
    <section className="container py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          <p className="pill">Contact</p>
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Let&apos;s collaborate</h1>
            <p className="mt-3 text-muted-foreground">
              Reach out for research partnerships, implementation support, or editorial collaborations. I typically reply
              within a couple of days.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-muted-foreground">
            {contactDetails.map((detail) => (
              <li key={detail.label} className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                  {detail.label}
                </span>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
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
        <div className="surface-card p-8">
          <h2 className="text-xl font-semibold text-foreground">Share a note</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell me about your project, timeline, and how I can help.
          </p>
          <div className="mt-6">
            {/* Client-only wrapper; renders nothing on the server */}
            <Suspense fallback={null}>
              <ClientContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
