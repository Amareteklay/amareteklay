// app/[locale]/(site)/contact/page.tsx
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("@/components/forms/ContactForm"), {
  ssr: false, // ✅ avoids CSR bailout requirement
});

const contactDetails = [
  { label: "Email", value: "hello@amareteklay.com", href: "mailto:hello@amareteklay.com" },
  { label: "Location", value: "Stockholm / Addis Ababa" },
];

export default function ContactPage() {
  return (
    <section className="container py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* left column ... */}

        <div className="surface-card p-8">
          <h2 className="text-xl font-semibold text-foreground">Share a note</h2>
          <p className="mt-2 text-sm text-muted-foreground">
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
