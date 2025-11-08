import { api } from "@/lib/api";
import { LoosePage } from "@/lib/types";
import { normalizePage } from "@/lib/normalize";

type Props = { params: { slug: string } };
export const revalidate = 300;

function plainText(html?: string) {
  return html ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";
}

export async function generateMetadata({ params }: Props) {
  const raw = await api<unknown>(`/content/pages/${params.slug}/`, { next: { revalidate } });
  const page = normalizePage(LoosePage.parse(raw));
  const description = plainText(page.content_html).slice(0, 140) || undefined;
  return { title: page.title, description };
}

export default async function PostPage({ params }: Props) {
  const raw = await api<unknown>(`/content/pages/${params.slug}/`, { next: { revalidate } });
  const page = normalizePage(LoosePage.parse(raw));

  return (
    <article className="container py-12 lg:py-16">
      <div className="surface-card prose max-w-none dark:prose-invert">
        <header className="not-prose border-b border-white/10 pb-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Writing</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{page.title}</h1>
        </header>
        {page.content_html ? (
          <div
            className="prose-headings:tracking-tight prose-p:text-slate-600 dark:prose-p:text-slate-200"
            dangerouslySetInnerHTML={{ __html: page.content_html }}
          />
        ) : (
          <p className="opacity-70">Post content coming soon.</p>
        )}
      </div>
    </article>
  );
}
