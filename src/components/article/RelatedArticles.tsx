import type { Article } from "@/lib/content/types";
import { ArticleCard } from "./ArticleCard";

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;
  return (
    <section aria-labelledby="relacionados" className="mt-16">
      <h2 id="relacionados" className="text-xl font-semibold text-ink">
        Artículos relacionados
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {articles.map((a) => (
          <ArticleCard key={a.href} article={a} track="related_article_click" />
        ))}
      </div>
    </section>
  );
}
