"use client";
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-slate-600">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-xl border px-4 py-2">
          Try again
        </button>
      </body>
    </html>
  );
}
