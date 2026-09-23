import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

/** Metadata homogénea: canonical, OpenGraph, Twitter y robots. */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  keywords,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteConfig.social.twitterHandle ? { site: siteConfig.social.twitterHandle } : {}),
    },
  };
}
