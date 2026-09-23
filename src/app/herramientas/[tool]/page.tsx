import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { tools, toolMap } from "@data/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { webApplicationSchema, faqSchema } from "@/lib/seo/schema";
import { getArticleByHref } from "@/lib/content/articles";
import { getCalculatorProps } from "@/lib/calculators/props";
import { calculatorRegistry } from "@/components/calculators/registry";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdSlot } from "@/components/ads/AdSlot";
import { FAQ } from "@/components/article/FAQ";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { PendingNotice } from "@/components/ui/Pending";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ tool: t.slug }));
}

type Props = { params: Promise<{ tool: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool } = await params;
  const t = toolMap[tool];
  if (!t) return {};
  return buildMetadata({ title: t.title, description: t.description, path: `/herramientas/${t.slug}/` });
}

export default async function ToolPage({ params }: Props) {
  const { tool: slug } = await params;
  const tool = toolMap[slug];
  const Calculator = calculatorRegistry[slug];
  if (!tool || !Calculator) notFound();

  const props = getCalculatorProps(slug);
  const related = tool.related.map(getArticleByHref).filter((a): a is NonNullable<typeof a> => Boolean(a));
  const usesRates = slug === "calculadora-iva" || slug === "calculadora-irpf-factura";
  const href = `/herramientas/${slug}/`;

  return (
    <>
      <JsonLd data={webApplicationSchema({ name: tool.name, description: tool.description, href })} />
      <JsonLd data={faqSchema(tool.faq)} />
      <PageHeader
        title={tool.name}
        intro={tool.description}
        crumbs={[
          { name: "Herramientas", href: "/herramientas/" },
          { name: tool.name, href },
        ]}
      />
      <div className="container-page mt-8 max-w-5xl">
        {usesRates && props.vatRates.length === 0 && (
          <div className="mb-6">
            <PendingNotice title={`Los tipos oficiales de ${props.taxYear} aún no están verificados. Introduce manualmente el porcentaje que aplicas.`} />
          </div>
        )}
        <Calculator {...props} />
        <p className="mt-3 text-xs text-muted">Los cálculos se hacen en tu navegador. No guardamos los datos que introduces.</p>
        <AdSlot position="after-calculator" />
        <div className="max-w-3xl">
          <FAQ items={tool.faq} />
          <RelatedArticles articles={related} />
          <p className="mt-10 text-sm">
            <Link href="/metodologia/" className="text-ink-soft underline underline-offset-4">
              Cómo calculamos y de dónde salen los datos
            </Link>
          </p>
          <Disclaimer className="mt-6" />
        </div>
      </div>
    </>
  );
}
