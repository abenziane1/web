import { normalize } from "@/lib/content/slugify";
import type { SearchItem, SearchProvider, SearchResult } from "./types";

const STOP = new Set(["de", "la", "el", "en", "y", "a", "los", "las", "un", "una", "que", "como", "para", "por", "con", "del", "al", "mi", "me", "se", "es", "lo", "soy", "siendo"]);

const typeBoost: Record<SearchItem["type"], number> = {
  herramienta: 1.3,
  modelo: 1.2,
  categoria: 1.1,
  articulo: 1,
  gasto: 0.9,
};

export function tokenize(q: string): string[] {
  return normalize(q)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t));
}

/** Búsqueda local ponderada: título > palabras clave > descripción. */
export function createLocalSearch(items: SearchItem[]): SearchProvider {
  const prepared = items.map((item) => ({
    item,
    title: normalize(item.title),
    keywords: normalize(item.keywords.join(" ")),
    description: normalize(item.description),
  }));
  return {
    search(query: string, limit = 30): SearchResult[] {
      const tokens = tokenize(query);
      if (!tokens.length) return [];
      const results: SearchResult[] = [];
      for (const p of prepared) {
        let score = 0;
        let matched = 0;
        for (const t of tokens) {
          let s = 0;
          if (p.title.includes(t)) s += 5;
          if (p.keywords.includes(t)) s += 3;
          if (p.description.includes(t)) s += 1;
          if (s > 0) matched++;
          score += s;
        }
        if (matched === 0) continue;
        // Penaliza coincidencias parciales de la consulta
        score *= (matched / tokens.length) ** 2 * typeBoost[p.item.type];
        if (p.title.includes(normalize(query.trim()))) score += 4;
        results.push({ ...p.item, score });
      }
      return results.sort((a, b) => b.score - a.score).slice(0, limit);
    },
  };
}
