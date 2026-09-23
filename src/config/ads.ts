import type { AdPosition } from "@/components/ads/AdSlot";

/**
 * IDs de bloque de anuncios de AdSense (data-ad-slot) por ubicación.
 * Déjalos vacíos hasta tener IDs reales: los huecos no se muestran.
 */
export const adSlots: Record<AdPosition, string> = {
  "after-intro": "6934532790",
  "mid-article": "6934532790",
  "after-calculator": "6934532790",
  "end-article": "6934532790",
  sidebar: "",
};
