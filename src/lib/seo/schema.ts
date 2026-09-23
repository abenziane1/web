import { siteConfig } from "@/config/site";
import { absoluteUrl } from "./metadata";
import type { Article, FaqItem } from "@/lib/content/types";
import type { Person } from "@data/authors";

type Json = Record<string, unknown>;

const orgId = `${siteConfig.url}/#organization`;
const siteId = `${siteConfig.url}/#website`;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    ...(siteConfig.organization.sameAs.length ? { sameAs: siteConfig.organization.sameAs } : {}),
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteId,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    publisher: { "@id": orgId },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}/buscar/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

export function articleSchema(article: Article, author: Person | undefined, reviewer: Person | undefined): Json {
  const person = (p: Person | undefined) =>
    p && !p.placeholder
      ? { "@type": "Person", name: p.name, ...(p.url ? { url: absoluteUrl(p.url) } : {}) }
      : { "@type": "Organization", name: siteConfig.name, "@id": orgId };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: absoluteUrl(article.href),
    mainEntityOfPage: absoluteUrl(article.href),
    datePublished: article.published,
    dateModified: article.updated,
    inLanguage: siteConfig.language,
    author: person(author),
    ...(reviewer && !reviewer.placeholder ? { reviewedBy: person(reviewer) } : {}),
    publisher: { "@id": orgId },
    keywords: article.keywords.join(", "),
  };
}

export function faqSchema(faq: FaqItem[]): Json | null {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webApplicationSchema(tool: { name: string; description: string; href: string }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: absoluteUrl(tool.href),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@id": orgId },
  };
}
