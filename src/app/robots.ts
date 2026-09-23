import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return {
    // En previews de Vercel se bloquea el rastreo para no indexar contenido duplicado
    rules: isProd ? [{ userAgent: "*", allow: "/", disallow: ["/buscar/", "/api/"] }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
