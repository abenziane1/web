"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "consent-v1";

function update(granted: boolean) {
  const v = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  });
}

/**
 * Banner básico de consentimiento. Para servir anuncios de AdSense en el EEE,
 * Google exige una CMP certificada compatible con TCF: sustituir este banner
 * por una CMP certificada antes de activar AdSense en producción.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {}
    update(granted);
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div role="dialog" aria-live="polite" aria-label="Preferencias de cookies" className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-4 shadow-[0_-4px_16px_rgba(21,49,91,0.08)]">
      <div className="container-page flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text">
          Usamos cookies de analítica y publicidad solo si las aceptas.{" "}
          <Link href="/cookies/" className="underline">
            Más información
          </Link>
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => choose(false)} className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-surface">
            Rechazar
          </button>
          <button type="button" onClick={() => choose(true)} className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink-soft">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
