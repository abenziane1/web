import type { Metadata } from "next";
import { getStaticPage } from "@/lib/content/pages";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Mdx } from "@/components/article/Mdx";
import { formatDate } from "@/lib/format";

export function staticPageMetadata(slug: string): Metadata {
  const p = getStaticPage(slug);
  return buildMetadata({ title: p.title, description: p.description, path: `/${slug}/`, noindex: p.noindex });
}

export function StaticPage({ slug }: { slug: string }) {
  const p = getStaticPage(slug);
  return (
    <>
      <PageHeader title={p.title} intro={p.description} crumbs={[{ name: p.title, href: `/${slug}/` }]} />
      <div className="container-page mt-10 max-w-3xl">
        <div className="prose prose-slate max-w-none prose-headings:text-ink prose-a:text-ink-soft">
          <Mdx source={p.body} />
        </div>
        {p.updated && <p className="mt-10 text-sm text-muted">Última actualización: {formatDate(p.updated)}</p>}
      </div>
    </>
  );
}
