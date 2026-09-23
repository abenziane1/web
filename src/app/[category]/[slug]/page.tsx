import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { genericCategorySlugs } from "@/config/categories";
import { getAllArticles, getArticle, isIndexable } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";
import { ArticleLayout } from "@/components/article/ArticleLayout";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles()
    .filter((a) => (genericCategorySlugs as string[]).includes(a.category))
    .map((a) => ({ category: a.category, slug: a.slug }));
}

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const a = getArticle(category, slug);
  if (!a) return {};
  return buildMetadata({
    title: a.title,
    description: a.description,
    path: a.href,
    type: "article",
    noindex: !isIndexable(a),
    publishedTime: a.published,
    modifiedTime: a.updated,
    keywords: a.keywords,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();
  return <ArticleLayout article={article} />;
}
