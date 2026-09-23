import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getArticle, getArticlesByCategory, isIndexable } from "@/lib/content/articles";
import { expenseMap, expensesWithPage, expenseCategories } from "@data/expenses";
import { buildMetadata } from "@/lib/seo/metadata";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { OfficialSources } from "@/components/article/OfficialSources";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Pending, PendingNotice } from "@/components/ui/Pending";
import { Mdx } from "@/components/article/Mdx";

export const dynamicParams = false;

/**
 * Esta ruta sirve dos tipos de página:
 *  - artículos MDX de la categoría gastos-deducibles
 *  - fichas programáticas de gastos, SOLO si tienen contenido propio (body)
 */
export function generateStaticParams() {
  const articles = getArticlesByCategory("gastos-deducibles").map((a) => ({ slug: a.slug }));
  const taken = new Set(articles.map((a) => a.slug));
  const expensePages = expensesWithPage.filter((e) => !taken.has(e.slug)).map((e) => ({ slug: e.slug }));
  return [...articles, ...expensePages];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle("gastos-deducibles", slug);
  if (a)
    return buildMetadata({ title: a.title, description: a.description, path: a.href, type: "article", noindex: !isIndexable(a), keywords: a.keywords });
  const e = expenseMap[slug];
  if (!e) return {};
  return buildMetadata({
    title: `¿Es deducible el gasto de ${e.name.toLowerCase()} para un autónomo?`,
    description: e.summary,
    path: `/gastos-deducibles/${e.slug}/`,
    noindex: e.status !== "verificado",
  });
}

export default async function ExpenseOrArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle("gastos-deducibles", slug);
  if (article) return <ArticleLayout article={article} />;

  const e = expenseMap[slug];
  if (!e || !e.body) notFound();
  const catLabel = expenseCategories.find((c) => c.id === e.category)?.label ?? e.category;
  const href = `/gastos-deducibles/${e.slug}/`;

  return (
    <>
      <PageHeader
        title={`¿Es deducible el gasto de ${e.name.toLowerCase()}?`}
        intro={e.summary}
        crumbs={[
          { name: "Gastos deducibles", href: "/gastos-deducibles/" },
          { name: e.name, href },
        ]}
      />
      <div className="container-page mt-8 max-w-3xl">
        {e.status !== "verificado" && <PendingNotice title="Ficha pendiente de verificación con fuentes oficiales." />}
        <p className="mt-6 text-sm text-muted">Categoría: {catLabel}</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-line p-4">
            <dt className="font-semibold text-ink">IRPF</dt>
            <dd className="mt-1 text-text">{e.irpf ?? <Pending />}</dd>
          </div>
          <div className="rounded-md border border-line p-4">
            <dt className="font-semibold text-ink">IVA</dt>
            <dd className="mt-1 text-text">{e.iva ?? <Pending />}</dd>
          </div>
        </dl>
        <div className="prose prose-slate mt-8 max-w-none">
          <Mdx source={e.body.replace(/\[DATOS PENDIENTES DE VERIFICACIÓN(:[^\]]*)?\]/g, (m) => `<Pendiente>${m}</Pendiente>`)} />
          <h2>Condiciones habituales</h2>
          <ul>
            {e.conditions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <h2>Justificantes</h2>
          <ul>
            {e.documents.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        {e.article && (
          <p className="mt-8">
            <Link href={e.article} className="font-medium text-ink-soft underline underline-offset-4">
              Leer la guía completa
            </Link>
          </p>
        )}
        <OfficialSources sources={e.sources} />
        <Disclaimer className="mt-10" />
      </div>
    </>
  );
}
