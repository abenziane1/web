import type { MetadataRoute } from "next";
import { categories } from "@/config/categories";
import { getAllArticles, isIndexable } from "@/lib/content/articles";
import { tools } from "@data/tools";
import { expensesWithPage } from "@data/expenses";
import { absoluteUrl } from "@/lib/seo/metadata";

/** Sitemap dinámico. Excluye páginas noindex (borradores, legales y buscador). */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const indexable = articles.filter(isIndexable);
  const latest = articles[0]?.updated;

  const staticPages = ["/", "/sobre-nosotros/", "/metodologia/", "/politica-editorial/", "/fuentes/", "/contacto/"];

  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p), lastModified: latest, changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.3 })),
    ...categories.map((c) => ({ url: absoluteUrl(`/${c.slug}/`), lastModified: latest, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...tools.map((t) => ({ url: absoluteUrl(`/herramientas/${t.slug}/`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...indexable.map((a) => ({ url: absoluteUrl(a.href), lastModified: a.updated, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...expensesWithPage
      .filter((e) => e.status === "verificado")
      .map((e) => ({ url: absoluteUrl(`/gastos-deducibles/${e.slug}/`), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
