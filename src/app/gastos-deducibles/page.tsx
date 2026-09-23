import type { Metadata } from "next";
import { categoryMap } from "@/config/categories";
import { getArticlesByCategory } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCalculatorProps } from "@/lib/calculators/props";
import { PageHeader } from "@/components/ui/PageHeader";
import { CategoryListing, paginate } from "@/components/category/CategoryListing";
import ExpenseChecker from "@/components/calculators/ExpenseChecker";
import { Disclaimer } from "@/components/ui/Disclaimer";

const c = categoryMap["gastos-deducibles"];
export const metadata: Metadata = buildMetadata({ title: c.title, description: c.description, path: "/gastos-deducibles/" });

export default function ExpensesPage() {
  const { items, totalPages } = paginate(getArticlesByCategory("gastos-deducibles"), 1);
  return (
    <>
      <PageHeader title={c.title} intro={c.intro} crumbs={[{ name: c.name, href: "/gastos-deducibles/" }]} />
      <div className="container-page mt-10">
        <section aria-labelledby="comprobador">
          <h2 id="comprobador" className="sr-only">
            Comprobador de gastos
          </h2>
          <ExpenseChecker {...getCalculatorProps("comprobador-gastos-deducibles")} />
        </section>
        <section aria-labelledby="guias-gastos" className="mt-16">
          <h2 id="guias-gastos" className="text-2xl font-bold tracking-tight text-ink">
            Guías sobre gastos deducibles
          </h2>
          <div className="mt-6">
            <CategoryListing category={c} articles={items} page={1} totalPages={totalPages} />
          </div>
        </section>
        <Disclaimer className="mt-12" />
      </div>
    </>
  );
}
