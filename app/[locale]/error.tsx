// app/[locale]/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl border px-4 py-2 hover:bg-secondary/60"
      >
        Try again
      </button>
    </div>
  );
}
