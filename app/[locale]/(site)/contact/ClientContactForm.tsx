"use client";

import dynamic from "next/dynamic";

// Load the real form only on the client
const ContactForm = dynamic(() => import("@/components/forms/ContactForm"), {
  ssr: false,
});

export default function ClientContactForm() {
  return <ContactForm />;
}
