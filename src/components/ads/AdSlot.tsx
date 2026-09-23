"use client";

import { useEffect, useRef } from "react";
import { analyticsConfig } from "@/lib/analytics";
import { adSlots } from "@/config/ads";

export type AdPosition = "after-intro" | "mid-article" | "after-calculator" | "end-article" | "sidebar";

/**
 * Hueco publicitario. El alto se reserva de antemano (min-height) para evitar
 * CLS. Sin NEXT_PUBLIC_ADSENSE_CLIENT no se renderiza nada, salvo que se active
 * NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS para maquetar.
 *
 * Los IDs de bloque se configuran en src/config/ads.ts.
 */

const heights: Record<AdPosition, string> = {
  "after-intro": "min-h-[280px] sm:min-h-[120px]",
  "mid-article": "min-h-[280px]",
  "after-calculator": "min-h-[280px] sm:min-h-[120px]",
  "end-article": "min-h-[280px]",
  sidebar: "min-h-[600px]",
};

export function AdSlot({ position }: { position: AdPosition }) {
  const ref = useRef<HTMLModElement>(null);
  const { adsenseClient, showAdPlaceholders } = analyticsConfig;
  const slotId = adSlots[position];

  useEffect(() => {
    if (!adsenseClient || !slotId || !ref.current) return;
    if (ref.current.getAttribute("data-adsbygoogle-status")) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [adsenseClient, slotId]);

  if (!adsenseClient || !slotId) {
    if (!showAdPlaceholders) return null;
    return (
      <aside aria-label="Publicidad" className={`not-prose my-8 ${heights[position]} grid place-items-center rounded-md border border-dashed border-line bg-surface text-xs text-muted`}>
        Espacio publicitario ({position})
      </aside>
    );
  }

  return (
    <aside aria-label="Publicidad" className="not-prose my-8">
      <p className="mb-1 text-[11px] text-muted">Publicidad</p>
      <div className={heights[position]}>
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={adsenseClient}
          data-ad-slot={slotId}
          data-ad-format={position === "sidebar" ? "vertical" : "auto"}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
