import Link from "next/link";
import type { Category } from "@/config/categories";
import type { Article } from "@/lib/content/types";
import { ArticleCard } from "@/components/article/ArticleCard";

export const PAGE_SIZE = 24;

export function paginate<T>(items: T[], page: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  return { items: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), totalPages };
}

export function pageHref(category: Category, page: number) {
  return page <= 1 ? `/${category.slug}/` : `/${category.slug}/pagina/${page}/`;
}

export function CategoryListing({
  category,
  articles,
  page,
  totalPages,
}: {
  category: Category;
  articles: Article[];
  page: number;
  totalPages: number;
}) {
  if (!articles.length) {
    return <p className="text-muted">Estamos preparando los contenidos de esta sección.</p>;
  }
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.href} article={a} />
        ))}
      </div>
      {totalPages > 1 && (
        <nav aria-label="Paginación" className="mt-10 flex flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={pageHref(category, n)}
              aria-current={n === page ? "page" : undefined}
              className={`tabular grid h-10 min-w-10 place-items-center rounded-md border px-3 text-sm ${n === page ? "border-ink bg-ink text-white" : "border-line hover:border-ink-soft"}`}
            >
              {n}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
