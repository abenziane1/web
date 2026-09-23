import Link from "next/link";
import { categoryMap } from "@/config/categories";
import type { Article } from "@/lib/content/types";
import { getRelatedArticles } from "@/lib/content/articles";
import { personMap } from "@data/authors";
import { toolMap } from "@data/tools";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, faqSchema } from "@/lib/seo/schema";
import { AdSlot } from "@/components/ads/AdSlot";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Icon } from "@/components/ui/Icon";
import { PendingNotice } from "@/components/ui/Pending";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";
import { formatDate } from "@/lib/format";
import { LastUpdated } from "./LastUpdated";
import { TableOfContents } from "./TableOfContents";
import { FAQ } from "./FAQ";
import { OfficialSources } from "./OfficialSources";
import { RelatedArticles } from "./RelatedArticles";
import { Mdx } from "./Mdx";

/**
 * Plantilla de artículo. Las secciones estructuradas (respuesta rápida, pasos,
 * errores, FAQ, fuentes) vienen del frontmatter; la explicación, el ejemplo y
 * las tablas vienen del cuerpo MDX.
 */
export function ArticleLayout({ article }: { article: Article }) {
  const category = categoryMap[article.category];
  const author = personMap[article.author];
  const reviewer = article.reviewer ? personMap[article.reviewer] : undefined;
  const tool = article.tool ? toolMap[article.tool] : undefined;
  const related = getRelatedArticles(article);
  const hasPending = article.body.includes("<Pendiente") || JSON.stringify(article.faq).includes("PENDIENTES");

  const toc = [
    ...(article.quickAnswer ? [{ id: "respuesta-rapida", text: "Respuesta rápida", level: 2 as const }] : []),
    ...article.headings,
    ...(article.steps.length ? [{ id: "pasos", text: "Paso a paso", level: 2 as const }] : []),
    ...(article.commonMistakes.length ? [{ id: "errores-habituales", text: "Errores habituales", level: 2 as const }] : []),
    ...(article.faq.length ? [{ id: "preguntas-frecuentes", text: "Preguntas frecuentes", level: 2 as const }] : []),
    ...(article.sources.length ? [{ id: "fuentes-oficiales", text: "Fuentes oficiales", level: 2 as const }] : []),
  ];

  return (
    <>
      <TrackOnMount event="article_view" params={{ category: article.category, slug: article.slug }} />
      <JsonLd data={articleSchema(article, author, reviewer)} />
      <JsonLd data={faqSchema(article.faq)} />

      <div className="container-page pt-6 sm:pt-10">
        <Breadcrumbs items={[{ name: category.name, href: `/${category.slug}/` }, { name: article.title, href: article.href }]} />
      </div>

      <div className="container-page mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="min-w-0 max-w-3xl">
          <header>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.15]">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{article.description}</p>
            <div className="mt-5 flex flex-col gap-1 border-y border-line py-3 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
              <LastUpdated updated={article.updated} reviewedAt={article.reviewedAt} />
              <p>
                Publicado el <time dateTime={article.published}>{formatDate(article.published)}</time>
              </p>
              <p>
                Por{" "}
                {author?.url ? (
                  <Link href={author.url} className="underline underline-offset-2">
                    {author.name}
                  </Link>
                ) : (
                  (author?.name ?? article.author)
                )}
                {reviewer && <>, revisado por {reviewer.name}</>}
              </p>
            </div>
          </header>

          {hasPending && (
            <div className="mt-6">
              <PendingNotice title="Este artículo contiene datos pendientes de verificación con fuentes oficiales. No se indexa hasta completarse." />
            </div>
          )}

          <details className="mt-6 rounded-lg border border-line p-4 lg:hidden">
            <summary className="cursor-pointer font-medium text-ink">Índice</summary>
            <div className="mt-3">
              <TableOfContents headings={toc} />
            </div>
          </details>

          {article.quickAnswer && (
            <section aria-labelledby="respuesta-rapida" className="mt-8 rounded-lg border-l-4 border-accent bg-accent/5 p-5">
              <h2 id="respuesta-rapida" className="text-base font-semibold text-accent">
                Respuesta rápida
              </h2>
              <p className="mt-2 text-[17px] leading-relaxed text-text">{article.quickAnswer}</p>
            </section>
          )}

          <AdSlot position="after-intro" />

          <div className="prose prose-slate mt-8 max-w-none prose-headings:tracking-tight prose-headings:text-ink prose-h2:mt-12 prose-h2:text-2xl prose-a:text-ink-soft prose-a:underline-offset-4 prose-th:bg-surface prose-th:px-3 prose-td:px-3 prose-table:text-[15px]">
            <Mdx source={article.body} />
          </div>

          {tool && (
            <aside className="mt-10 flex flex-col gap-4 rounded-xl border border-ink bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-ink text-white">
                  <Icon name={tool.icon} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{tool.name}</p>
                  <p className="text-sm text-muted">{tool.description}</p>
                </div>
              </div>
              <Link href={`/herramientas/${tool.slug}/`} className="shrink-0 rounded-lg bg-ink px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-ink-soft">
                Abrir la calculadora
              </Link>
            </aside>
          )}

          {article.steps.length > 0 && (
            <section aria-labelledby="pasos" className="mt-12">
              <h2 id="pasos" className="text-2xl font-semibold tracking-tight text-ink">
                Paso a paso
              </h2>
              <ol className="mt-5 space-y-5">
                {article.steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span aria-hidden="true" className="tabular grid h-8 w-8 place-items-center rounded-full border border-ink text-sm font-semibold text-ink">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-text">{s.title}</p>
                      <p className="mt-1 leading-relaxed text-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {article.commonMistakes.length > 0 && (
            <section aria-labelledby="errores-habituales" className="mt-12">
              <h2 id="errores-habituales" className="text-2xl font-semibold tracking-tight text-ink">
                Errores habituales
              </h2>
              <ul className="mt-4 space-y-3">
                {article.commonMistakes.map((m) => (
                  <li key={m} className="flex gap-3 leading-relaxed text-text">
                    <Icon name="alert" className="mt-1 h-4 w-4 shrink-0 text-pending" />
                    {m}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <FAQ items={article.faq} />
          <OfficialSources sources={article.sources} />

          <AdSlot position="end-article" />
          <Disclaimer className="mt-10" />
          <RelatedArticles articles={related} />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <TableOfContents headings={toc} />
            <AdSlot position="sidebar" />
          </div>
        </aside>
      </div>
    </>
  );
}
