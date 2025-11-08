import type { Locale } from "./locales";

const RAW_API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? process.env.API_BASE;
const REVALIDATE = 300;

if (!RAW_API_BASE) {
  throw new Error("API base URL is not configured (API_BASE / NEXT_PUBLIC_API_BASE)");
}

const API_BASE = normalizeBase(RAW_API_BASE);

type ApiGetInit = RequestInit & {
  revalidate?: number;
  addQueryParam?: boolean;
};

export async function apiGet<T>(
  path: string,
  locale: Locale,
  init?: ApiGetInit
): Promise<T> {
  const url = buildUrl(path);

  if (init?.addQueryParam && !url.searchParams.has("lang")) {
    url.searchParams.set("lang", locale);
  }

  const response = await fetch(url.toString(), {
    ...init,
    next: { revalidate: init?.revalidate ?? REVALIDATE },
    headers: {
      Accept: "application/json",
      "Accept-Language": locale,
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch failed (${response.status}) ${url.toString()}`);
  }

  return (await response.json()) as T;
}

function normalizeBase(raw: string): URL {
  const normalized = raw.endsWith("/") ? raw : `${raw}/`;

  try {
    return new URL(normalized);
  } catch {
    throw new Error(`Invalid API base URL: ${raw}`);
  }
}

function buildUrl(path: string): URL {
  if (!path) throw new Error("Path must be provided");

  if (/^https?:\/\//i.test(path)) {
    return new URL(path);
  }

  const cleanedPath = path.startsWith("/") ? path.slice(1) : path;
  return new URL(cleanedPath, API_BASE);
}
