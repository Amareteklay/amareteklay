"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Tell me a bit more"),
});
type FormData = z.infer<typeof Schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(Schema) });

  async function onSubmit(data: FormData) {
    setStatus("idle");
    setStatusMessage(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      reset();
      setStatus("success");
      setStatusMessage("Thanks for the note! I'll get back to you soon.");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMessage("Unable to send right now. Please try again.");
    }
  }

  function fieldClasses(hasError?: boolean) {
    return [
      "mt-2 w-full rounded-2xl border px-4 py-3 text-base shadow-sm outline-none transition",
      "bg-white/70 text-slate-900 placeholder:text-slate-400 dark:bg-white/5 dark:text-white",
      "focus:ring-4 focus:ring-indigo-500/20",
      hasError ? "border-rose-400" : "border-black/10 dark:border-white/15 focus:border-indigo-400",
    ].join(" ");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="text-sm font-semibold text-slate-600 dark:text-slate-200">Name</label>
        <input
          className={fieldClasses(Boolean(errors.name))}
          placeholder="How should I address you?"
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-sm text-rose-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-600 dark:text-slate-200">Email</label>
        <input
          className={fieldClasses(Boolean(errors.email))}
          placeholder="you@example.org"
          aria-invalid={Boolean(errors.email)}
          type="email"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-sm text-rose-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-600 dark:text-slate-200">Message</label>
        <textarea
          className={fieldClasses(Boolean(errors.message))}
          placeholder="Share context, timelines, or collaborators."
          rows={5}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-sm text-rose-500">{errors.message.message}</p>}
      </div>
      <div className="space-y-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          {isSubmitting && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white dark:border-slate-900/30 dark:border-t-slate-900" />
          )}
          {isSubmitting ? "Sending" : "Send message"}
        </button>
        {statusMessage && (
          <p
            role="status"
            aria-live="polite"
            className={
              status === "success"
                ? "text-sm font-medium text-emerald-500"
                : "text-sm font-medium text-rose-500"
            }
          >
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  );
}
