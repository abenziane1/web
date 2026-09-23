"use client";

type GoogleFC = { callbackQueue?: unknown[]; showRevocationMessage?: () => void };

/**
 * Reabre el mensaje de consentimiento de la CMP de Google para que el usuario
 * pueda cambiar o retirar su consentimiento en cualquier momento.
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  const open = () => {
    const w = window as unknown as { googlefc?: GoogleFC };
    w.googlefc = w.googlefc || {};
    w.googlefc.callbackQueue = w.googlefc.callbackQueue || [];
    w.googlefc.callbackQueue.push(() => w.googlefc?.showRevocationMessage?.());
  };
  return (
    <button type="button" onClick={open} className={className}>
      Configurar cookies
    </button>
  );
}
