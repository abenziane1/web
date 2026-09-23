import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface StaticPageData {
  slug: string;
  title: string;
  description: string;
  updated: string;
  noindex: boolean;
  body: string;
}

export function getStaticPage(slug: string): StaticPageData {
  const file = path.join(process.cwd(), "content", "pages", `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    updated: data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : String(data.updated ?? ""),
    noindex: Boolean(data.noindex),
    body: content,
  };
}
