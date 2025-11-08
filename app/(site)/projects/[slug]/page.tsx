import { api } from "@/lib/api";
import { LoosePage } from "@/lib/types";
import { normalizePage } from "@/lib/normalize";

type Props = { params: { slug: string } };
export const revalidate = 300;

export async function generateMetadata({ params }: Props) {
  const raw = await api<unknown>(`/content/pages/${params.slug}/`, { next: { revalidate } });
  const page = normalizePage(LoosePage.parse(raw));
  return { title: page.title };
}

export default async function ProjectPage({ params }: Props) {
  const raw = await api<unknown>(`/content/pages/${params.slug}/`, { next: { revalidate } });
  const page = normalizePage(LoosePage.parse(raw));

  return (
    <article className="container prose dark:prose-invert py-12">
      <h1>{page.title}</h1>
      {page.content_html ? (
        <div dangerouslySetInnerHTML={{ __html: page.content_html }} />
      ) : (
        <p className="opacity-70">Details coming soon.</p>
      )}
    </article>
  );
}
