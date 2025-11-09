// app/not-found.tsx
import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/locales";
import { Suspense } from "react";
import LocaleHomeLink from "./_notfound/LocaleHomeLink";

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-foreground">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        The page you’re looking for doesn’t exist or may have moved.
      </p>

      {/* Client-only logic (uses usePathname) sits behind Suspense */}
      <Suspense fallback={
        <Link
          href={`/${DEFAULT_LOCALE}`}
          className="mt-8 inline-block rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Go home
        </Link>
      }>
        <LocaleHomeLink />
      </Suspense>
    </main>
  );
}
