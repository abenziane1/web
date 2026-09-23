/**
 * Modelos de Hacienda. Solo se incluyen datos descriptivos básicos (qué es cada
 * modelo). Periodicidad, plazos y obligados deben revisarse con la AEAT.
 */
export interface TaxModel {
  code: string;
  name: string;
  summary: string;
  /** Ruta de la guía, si existe */
  href: string | null;
  periodicity: string | null; // null = pendiente de verificación
  tags: string[];
}

export const taxModels: TaxModel[] = [
  {
    code: "303",
    name: "Autoliquidación del IVA",
    summary: "Declaración periódica en la que se liquida el IVA repercutido menos el IVA soportado deducible.",
    href: "/modelos-hacienda/modelo-303/",
    periodicity: null,
    tags: ["iva", "trimestral"],
  },
  {
    code: "130",
    name: "Pago fraccionado del IRPF",
    summary: "Pago a cuenta del IRPF para actividades económicas en estimación directa.",
    href: "/modelos-hacienda/modelo-130/",
    periodicity: null,
    tags: ["irpf"],
  },
  {
    code: "111",
    name: "Retenciones e ingresos a cuenta",
    summary: "Declaración de las retenciones practicadas a trabajadores y profesionales.",
    href: "/modelos-hacienda/modelo-111/",
    periodicity: null,
    tags: ["irpf", "retenciones"],
  },
  {
    code: "190",
    name: "Resumen anual de retenciones",
    summary: "Resumen anual informativo de las retenciones declaradas en el modelo 111.",
    href: "/modelos-hacienda/modelo-190/",
    periodicity: null,
    tags: ["irpf", "retenciones", "anual"],
  },
  {
    code: "349",
    name: "Operaciones intracomunitarias",
    summary: "Declaración recapitulativa de las operaciones con empresas y profesionales de otros países de la UE.",
    href: "/modelos-hacienda/modelo-349/",
    periodicity: null,
    tags: ["iva", "intracomunitario"],
  },
  {
    code: "390",
    name: "Resumen anual del IVA",
    summary: "Declaración informativa anual que resume las autoliquidaciones de IVA del ejercicio.",
    href: null,
    periodicity: null,
    tags: ["iva", "anual"],
  },
];
