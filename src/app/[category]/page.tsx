import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categoryMap, genericCategorySlugs, isCategorySlug } from "@/config/categories";
import { getArticlesByCategory } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { CategoryListing, paginate } from "@/components/category/CategoryListing";
import { TaxModelCard } from "@/components/tax/TaxModelCard";
import { taxModels } from "@data/tax-models";
import { Disclaimer } from "@/components/ui/Disclaimer";

export const dynamicParams = false;

export function generateStaticParams() {
  return genericCategorySlugs.map((category) => ({ category }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isCategorySlug(category)) return {};
  const c = categoryMap[category];
  return buildMetadata({ title: c.title, description: c.description, path: `/${c.slug}/` });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();
  const c = categoryMap[category];
  const { items, totalPages } = paginate(getArticlesByCategory(category), 1);

  return (
    <>
      <PageHeader title={c.title} intro={c.intro} crumbs={[{ name: c.name, href: `/${c.slug}/` }]} />
      <div className="container-page mt-10">
        {category === "modelos-hacienda" && (
          <section aria-labelledby="todos-modelos" className="mb-14">
            <h2 id="todos-modelos" className="text-xl font-semibold text-ink">
              Modelos
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {taxModels.map((m) => (
                <TaxModelCard key={m.code} model={m} />
              ))}
            </div>
          </section>
        )}
        <h2 className="sr-only">Artículos</h2>
        <CategoryListing category={c} articles={items} page={1} totalPages={totalPages} />
        <Disclaimer className="mt-12" />
      </div>
    </>
  );
}
