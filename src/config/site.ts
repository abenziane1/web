/**
 * CONFIGURACIÓN DE MARCA
 * Cambia aquí el nombre, dominio, logo y colores. Ningún componente
 * tiene la marca escrita a mano: todos leen de este archivo.
 */
export const siteConfig = {
  name: "FiscalAutónomo",
  shortName: "FiscalAutónomo",
  /** Letras que se muestran en el logotipo tipográfico si no hay logo SVG */
  logoMark: "FA",
  /** Ruta a un logo en /public (opcional). Si es null se usa el logotipo tipográfico. */
  logoSrc: null as string | null,
  tagline: "Fiscalidad para autónomos, explicada fácil",
  description:
    "Calcula tus impuestos, consulta tus obligaciones fiscales y resuelve tus dudas como autónomo en España.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "es_ES",
  language: "es",
  country: "ES",
  /** Datos del titular del sitio web. */
  organization: {
    legalName: "Amin Benziane",
    email: "info@agency-ia.es",
    sameAs: [] as string[],
  },
  social: {
    twitterHandle: "" as string,
  },
  /**
   * Colores principales. Se inyectan como variables CSS en <html>,
   * así que cambiarlos aquí recolorea toda la web.
   */
  colors: {
    ink: "#15315B", // color de marca principal (texto destacado, botones)
    inkSoft: "#2B4C7E",
    accent: "#0E7A5F", // resultados, confirmaciones
    pending: "#A35A00", // SOLO para marcar datos pendientes de verificación
    surface: "#F4F6F9",
    line: "#D9E0E8",
  },
  /**
   * Si es false, los contenidos marcados como draft (con datos pendientes de
   * verificación) se sirven con noindex y no aparecen en el sitemap.
   */
  indexDrafts: false,
  /** Año fiscal por defecto que usan calculadoras y calendario */
  defaultTaxYear: 2026,
} as const;

export type SiteConfig = typeof siteConfig;
