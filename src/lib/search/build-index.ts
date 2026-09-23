import "server-only";
import { categories } from "@/config/categories";
import { getAllArticles } from "@/lib/content/articles";
import { tools } from "@data/tools";
import { taxModels } from "@data/tax-models";
import { expenses } from "@data/expenses";
import type { SearchItem } from "./types";

export function buildSearchIndex(): SearchItem[] {
  const articles = getAllArticles();
  const articleHrefs = new Set(articles.map((a) => a.href));
  return [
    ...tools.map<SearchItem>((t) => ({
      type: "herramienta",
      title: t.name,
      description: t.description,
      href: `/herramientas/${t.slug}/`,
      keywords: ["calculadora", "calcular", t.shortName],
    })),
    ...taxModels
      .filter((m) => !m.href || !articleHrefs.has(m.href))
      .map<SearchItem>((m) => ({
        type: "modelo",
        title: `Modelo ${m.code}: ${m.name}`,
        description: m.summary,
        href: m.href ?? "/modelos-hacienda/",
        keywords: [m.code, `modelo ${m.code}`, ...m.tags],
      })),
    ...articles.map<SearchItem>((a) => ({
      type: a.category === "modelos-hacienda" ? "modelo" : "articulo",
      title: a.title,
      description: a.description,
      href: a.href,
      keywords: a.keywords,
    })),
    ...expenses.map<SearchItem>((e) => ({
      type: "gasto",
      title: `Gasto deducible: ${e.name}`,
      description: e.summary,
      href: e.body ? `/gastos-deducibles/${e.slug}/` : `/herramientas/comprobador-gastos-deducibles/`,
      keywords: ["deducir", "deducible", ...e.synonyms],
    })),
    ...categories.map<SearchItem>((c) => ({
      type: "categoria",
      title: c.title,
      description: c.description,
      href: `/${c.slug}/`,
      keywords: [c.name],
    })),
  ];
}
