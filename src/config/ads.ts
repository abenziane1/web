import type { AdPosition } from "@/components/ads/AdSlot";

/**
 * IDs de bloque de anuncios de AdSense (data-ad-slot) por ubicación.
 * Déjalos vacíos hasta tener IDs reales: los huecos no se muestran.
 */
export const adSlots: Record<AdPosition, string> = {
  "after-intro": "",
  "mid-article": "",
  "after-calculator": "",
  "end-article": "",
  sidebar: "",
};
