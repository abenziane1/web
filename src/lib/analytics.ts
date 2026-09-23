/**
 * Eventos de analítica. Si GA4 no está configurado o el usuario no ha dado
 * consentimiento, las llamadas no hacen nada.
 */
export type AnalyticsEvent =
  | "calculator_started"
  | "calculator_completed"
  | "search_used"
  | "article_view"
  | "related_article_click"
  | "outbound_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    adsbygoogle?: unknown[];
  }
}

export function trackEvent(name: AnalyticsEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  showAdPlaceholders: process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true",
};
