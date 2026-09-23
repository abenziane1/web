import type { Metadata } from "next";
import { categoryMap } from "@/config/categories";
import { tools } from "@data/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { CalculatorCard } from "@/components/calculators/CalculatorCard";
import { Disclaimer } from "@/components/ui/Disclaimer";

const c = categoryMap.herramientas;
export const metadata: Metadata = buildMetadata({ title: c.title, description: c.description, path: "/herramientas/" });

export default function ToolsPage() {
  return (
    <>
      <PageHeader title={c.title} intro={c.intro} crumbs={[{ name: c.name, href: "/herramientas/" }]} />
      <div className="container-page mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <CalculatorCard key={t.slug} tool={t} />
          ))}
        </div>
        <Disclaimer className="mt-12" />
      </div>
    </>
  );
}
