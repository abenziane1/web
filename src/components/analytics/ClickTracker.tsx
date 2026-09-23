"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Un único listener delegado para clics: enlaces externos (outbound_click) y
 * enlaces marcados con data-track="related_article_click". Así los enlaces
 * pueden seguir siendo Server Components.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const track = a.getAttribute("data-track");
      if (track === "related_article_click") {
        trackEvent("related_article_click", { href: a.getAttribute("href") ?? "" });
        return;
      }
      if (a.host && a.host !== window.location.host) {
        trackEvent("outbound_click", { url: a.href });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
