import type { Heading } from "@/lib/content/types";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;
  return (
    <nav aria-labelledby="indice-titulo" className="text-sm">
      <h2 id="indice-titulo" className="font-semibold text-ink">
        En esta página
      </h2>
      <ol className="mt-3 space-y-2 border-l border-line">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-7" : "pl-4"}>
            <a href={`#${h.id}`} className="block text-muted hover:text-ink">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
