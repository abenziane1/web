import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { isCategorySlug, type CategorySlug } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { slugify } from "./slugify";
import type { Article, ArticleFrontmatter, Heading } from "./types";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function extractHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  let inCode = false;
  for (const line of body.split("\n")) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (m && m[1] && m[2]) {
      const text = m[2].replace(/[*_`]/g, "");
      headings.push({ id: slugify(text), text, level: m[1].length as 2 | 3 });
    }
  }
  return headings;
}

function toArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

function parseFile(filePath: string, category: CategorySlug): Article {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fileSlug = path.basename(filePath).replace(/\.mdx?$/, "");
  const d = data as Partial<ArticleFrontmatter> & Record<string, unknown>;

  if (!d.title || !d.description) {
    throw new Error(`Artículo sin title/description: ${filePath}`);
  }
  const dateStr = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v) : "");

  const fm: ArticleFrontmatter = {
    title: d.title,
    description: d.description,
    slug: d.slug ?? fileSlug,
    category,
    published: dateStr(d.published),
    updated: dateStr(d.updated ?? d.published),
    reviewedAt: d.reviewedAt ? dateStr(d.reviewedAt) : null,
    author: d.author ?? "redaccion",
    reviewer: d.reviewer ?? null,
    sources: toArray(d.sources),
    keywords: toArray(d.keywords),
    featured: Boolean(d.featured),
    tool: d.tool ?? null,
    draft: d.draft !== false,
    quickAnswer: d.quickAnswer ?? null,
    steps: toArray(d.steps),
    commonMistakes: toArray(d.commonMistakes),
    faq: toArray(d.faq),
    related: toArray(d.related),
  };
  const words = content.split(/\s+/).length;
  return {
    ...fm,
    href: `/${category}/${fm.slug}/`,
    body: content,
    headings: extractHeadings(content),
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
}

export const getAllArticles = cache((): Article[] => {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const articles: Article[] = [];
  for (const dir of fs.readdirSync(ARTICLES_DIR)) {
    if (!isCategorySlug(dir)) continue;
    const full = path.join(ARTICLES_DIR, dir);
    for (const file of fs.readdirSync(full)) {
      if (!/\.mdx?$/.test(file)) continue;
      articles.push(parseFile(path.join(full, file), dir));
    }
  }
  const seen = new Set<string>();
  for (const a of articles) {
    if (seen.has(a.href)) throw new Error(`URL duplicada: ${a.href}`);
    seen.add(a.href);
  }
  return articles.sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title));
});

export function getArticle(category: string, slug: string): Article | null {
  return getAllArticles().find((a) => a.category === category && a.slug === slug) ?? null;
}

export function getArticleByHref(href: string): Article | null {
  return getAllArticles().find((a) => a.href === href) ?? null;
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticles(limit = 6): Article[] {
  return getAllArticles()
    .filter((a) => a.featured)
    .slice(0, limit);
}

export function getRelatedArticles(article: Article, limit = 4): Article[] {
  const all = getAllArticles().filter((a) => a.href !== article.href);
  const explicit = article.related
    .map((href) => all.find((a) => a.href === href))
    .filter((a): a is Article => Boolean(a));
  const sameCategory = all.filter((a) => a.category === article.category && !explicit.includes(a));
  return [...explicit, ...sameCategory].slice(0, limit);
}

/** ¿Debe indexarse? Los borradores con datos pendientes no se indexan salvo configuración. */
export function isIndexable(article: Pick<Article, "draft">): boolean {
  return !article.draft || siteConfig.indexDrafts;
}
