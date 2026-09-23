import { Suspense } from "react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildSearchIndex } from "@/lib/search/build-index";
import { SearchBox } from "@/components/search/SearchBox";
import { SearchResults } from "@/components/search/SearchResults";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Buscar",
  description: "Busca artículos, modelos de Hacienda, calculadoras y gastos deducibles.",
  path: "/buscar/",
  noindex: true,
});

export default function SearchPage() {
  const index = buildSearchIndex();
  return (
    <div className="container-page max-w-3xl pt-8">
      <Breadcrumbs items={[{ name: "Buscar", href: "/buscar/" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">Buscar</h1>
      <div className="mt-6">
        <SearchBox />
      </div>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Cargando resultados…</p>}>
          <SearchResults index={index} />
        </Suspense>
      </div>
    </div>
  );
}
