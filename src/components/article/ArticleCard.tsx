import Link from "next/link";
import { categoryMap } from "@/config/categories";
import type { Article } from "@/lib/content/types";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article, track }: { article: Article; track?: "related_article_click" }) {
  return (
    <article className="group relative flex flex-col rounded-lg border border-line bg-white p-5 hover:border-ink-soft">
      <p className="text-xs font-medium text-accent">{categoryMap[article.category].name}</p>
      <h3 className="mt-2 text-[17px] font-semibold leading-snug text-ink">
        <Link href={article.href} data-track={track} className="after:absolute after:inset-0 group-hover:underline">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{article.description}</p>
      <p className="mt-auto pt-4 text-xs text-muted">
        Actualizado el <time dateTime={article.updated}>{formatDate(article.updated)}</time>
      </p>
    </article>
  );
}
