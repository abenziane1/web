import Link from "next/link";
import type { Category } from "@/config/categories";
import { Icon } from "./Icon";

export function CategoryCard({ category, count }: { category: Category; count?: number }) {
  return (
    <Link href={`/${category.slug}/`} className="flex items-start gap-3 rounded-lg border border-line bg-white p-4 hover:border-ink-soft">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-surface text-ink">
        <Icon name={category.icon} />
      </span>
      <span>
        <span className="block font-semibold text-ink">{category.name}</span>
        <span className="mt-0.5 block text-sm leading-snug text-muted">{category.intro}</span>
        {typeof count === "number" && <span className="mt-2 block text-xs text-muted">{count} artículos</span>}
      </span>
    </Link>
  );
}
