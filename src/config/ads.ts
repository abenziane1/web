import type { AdPosition } from "@/components/ads/AdSlot";

/**
 * IDs de bloque de anuncios de AdSense (data-ad-slot) por ubicación.
 * Déjalos vacíos hasta tener IDs reales: los huecos no se muestran.
 */
/**
 * Desactivados hasta que AdSense apruebe el sitio: mostrar huecos vacíos
 * durante la revisión perjudica. ID del bloque creado: 6934532790.
 * Para activarlos, vuelve a poner el ID en cada ubicación.
 */
export const adSlots: Record<AdPosition, string> = {
  "after-intro": "",
  "mid-article": "",
  "after-calculator": "",
  "end-article": "",
  sidebar: "",
};
