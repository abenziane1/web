import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categoryMap, genericCategorySlugs, isCategorySlug } from "@/config/categories";
import { getArticlesByCategory } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { CategoryListing, PAGE_SIZE, paginate, pageHref } from "@/components/category/CategoryListing";

export const dynamicParams = false;

/** Solo genera páginas 2..n cuando realmente hay más de PAGE_SIZE artículos. */
export function generateStaticParams() {
  return genericCategorySlugs.flatMap((category) => {
    const total = Math.ceil(getArticlesByCategory(category).length / PAGE_SIZE);
    return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ category, page: String(i + 2) }));
  });
}

type Props = { params: Promise<{ category: string; page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, page } = await params;
  if (!isCategorySlug(category)) return {};
  const c = categoryMap[category];
  return buildMetadata({ title: `${c.title} (página ${page})`, description: c.description, path: pageHref(c, Number(page)) });
}

export default async function CategoryPaginatedPage({ params }: Props) {
  const { category, page } = await params;
  const n = Number(page);
  if (!isCategorySlug(category) || !Number.isInteger(n) || n < 2) notFound();
  const c = categoryMap[category];
  const { items, totalPages } = paginate(getArticlesByCategory(category), n);
  if (n > totalPages) notFound();
  return (
    <>
      <PageHeader title={`${c.title} (página ${n})`} crumbs={[{ name: c.name, href: `/${c.slug}/` }, { name: `Página ${n}`, href: pageHref(c, n) }]} />
      <div className="container-page mt-10">
        <CategoryListing category={c} articles={items} page={n} totalPages={totalPages} />
      </div>
    </>
  );
}
