import { env } from "./env";

type Init = RequestInit & { next?: { revalidate?: number } };

function join(base: string, path: string) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return b + p;
}

export async function api<T>(path: string, init?: Init): Promise<T> {
  const url = join(env.NEXT_PUBLIC_API_BASE, path);
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
    next: init?.next,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${url}\n${msg}`);
  }
  return res.json() as Promise<T>;
}
