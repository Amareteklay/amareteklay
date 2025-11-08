import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link href="/" className="mt-6 inline-block rounded-xl border px-4 py-2">
        Go home
      </Link>
    </main>
  );
}
