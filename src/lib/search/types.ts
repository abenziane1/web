export type SearchItemType = "herramienta" | "articulo" | "modelo" | "gasto" | "categoria";

export interface SearchItem {
  type: SearchItemType;
  title: string;
  description: string;
  href: string;
  keywords: string[];
}

export interface SearchResult extends SearchItem {
  score: number;
}

/**
 * Contrato de un motor de búsqueda. La implementación actual es local
 * (localSearch). Para evolucionar a búsqueda semántica o con IA basta con
 * crear otro proveedor que cumpla esta interfaz (p. ej. llamando a un endpoint).
 */
export interface SearchProvider {
  search(query: string, limit?: number): SearchResult[] | Promise<SearchResult[]>;
}
