"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { createLocalSearch } from "@/lib/search/local";
import type { SearchItem, SearchItemType } from "@/lib/search/types";
import { trackEvent } from "@/lib/analytics";

const typeLabel: Record<SearchItemType, string> = {
  herramienta: "Herramienta",
  articulo: "Artículo",
  modelo: "Modelo de Hacienda",
  gasto: "Gasto deducible",
  categoria: "Sección",
};

export function SearchResults({ index }: { index: SearchItem[] }) {
  const params = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const engine = useMemo(() => createLocalSearch(index), [index]);
  const list = useMemo(() => {
    const r = engine.search(q);
    return Array.isArray(r) ? r : [];
  }, [engine, q]);
  const tracked = useRef("");

  useEffect(() => {
    if (q && tracked.current !== q) {
      tracked.current = q;
      trackEvent("search_used", { search_term: q, results: list.length });
    }
  }, [q, list]);

  if (!q) return <p className="text-muted">Escribe lo que necesitas: un impuesto, un modelo, un gasto o una calculadora.</p>;
  return (
    <div>
      <p className="text-sm text-muted" aria-live="polite">
        {list.length === 0 ? `Sin resultados para «${q}».` : `${list.length} resultados para «${q}»`}
      </p>
      {list.length === 0 ? (
        <p className="mt-4 text-text">
          Prueba con otras palabras, como «IVA», «modelo 130» o «ordenador», o consulta las{" "}
          <Link href="/herramientas/" className="underline">
            calculadoras
          </Link>
          .
        </p>
      ) : (
        <ol className="mt-4 divide-y divide-line border-y border-line">
          {list.map((r) => (
            <li key={`${r.type}-${r.href}-${r.title}`} className="py-4">
              <p className="text-xs font-medium text-accent">{typeLabel[r.type]}</p>
              <Link href={r.href} className="mt-1 block text-lg font-semibold text-ink hover:underline">
                {r.title}
              </Link>
              <p className="mt-1 text-sm leading-relaxed text-muted">{r.description}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
