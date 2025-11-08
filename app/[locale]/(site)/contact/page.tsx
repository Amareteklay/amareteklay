import ContactForm from "@/components/forms/ContactForm";

const contactDetails = [
  { label: "Email", value: "hello@amareteklay.com", href: "mailto:hello@amareteklay.com" },
  { label: "Location", value: "Stockholm / Addis Ababa" },
];

export default function ContactPage() {
  return (
    <section className="container py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="pill">Contact</p>
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Let&apos;s collaborate</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Reach out for research partnerships, implementation support, or editorial collaborations. I typically reply
              within a couple of days.
            </p>
          </div>
          <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            {contactDetails.map((detail) => (
              <li key={detail.label} className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{detail.label}</span>
                {detail.href ? (
                  <a href={detail.href} className="text-lg font-semibold text-slate-900 dark:text-white">
                    {detail.value}
                  </a>
                ) : (
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">{detail.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Share a note</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Tell me about your project, timeline, and how I can help.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
