import Script from "next/script";
import { analyticsConfig } from "@/lib/analytics";
import { ClickTracker } from "./ClickTracker";
import { ConsentBanner } from "./ConsentBanner";

/**
 * Carga GA4 y AdSense solo si hay IDs en las variables de entorno.
 * Usa Google Consent Mode v2 con todo denegado por defecto hasta que el
 * usuario acepta en el banner.
 */
export function Analytics() {
  const { gaId, adsenseClient } = analyticsConfig;
  if (!gaId && !adsenseClient) return null;

  return (
    <>
      <Script id="consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{var c=localStorage.getItem('consent-v1');if(c==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}`}
      </Script>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {adsenseClient && (
        <Script
          id="adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      )}
      <ClickTracker />
      <ConsentBanner />
    </>
  );
}
