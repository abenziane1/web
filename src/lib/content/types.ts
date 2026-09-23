import type { CategorySlug } from "@/config/categories";

export interface FaqItem {
  q: string;
  a: string;
}

export type SourceInput = string | { title: string; url: string };

export interface ArticleFrontmatter {
  title: string;
  description: string;
  slug: string;
  category: CategorySlug;
  published: string;
  updated: string;
  /** Fecha de la última revisión profesional. null = sin revisar */
  reviewedAt: string | null;
  author: string;
  reviewer: string | null;
  sources: SourceInput[];
  keywords: string[];
  featured: boolean;
  /** slug de herramienta relacionada */
  tool: string | null;
  /** true = contiene datos pendientes de verificación → noindex */
  draft: boolean;
  quickAnswer: string | null;
  steps: { title: string; text: string }[];
  commonMistakes: string[];
  faq: FaqItem[];
  related: string[];
}

export interface Article extends ArticleFrontmatter {
  href: string;
  body: string;
  headings: Heading[];
  readingMinutes: number;
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}
