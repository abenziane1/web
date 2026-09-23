export type ExpenseCategory =
  | "vehiculo"
  | "telefono-internet"
  | "equipos"
  | "software"
  | "local"
  | "suministros"
  | "dietas-viajes"
  | "formacion"
  | "seguros"
  | "servicios-profesionales"
  | "marketing"
  | "otros";

/** Estado editorial de la ficha. Solo "verificado" puede mostrarse sin aviso. */
export type ExpenseStatus = "verificado" | "pendiente_verificacion";

export interface Expense {
  slug: string;
  name: string;
  category: ExpenseCategory;
  /** Sinónimos para el buscador ("móvil", "smartphone"...) */
  synonyms: string[];
  /** Resumen breve y prudente. Nada de porcentajes sin verificar. */
  summary: string;
  /** Condiciones generales que suelen exigirse */
  conditions: string[];
  /** Justificantes recomendados */
  documents: string[];
  /** Tratamiento en IRPF / IVA. null = pendiente de verificación */
  irpf: string | null;
  iva: string | null;
  status: ExpenseStatus;
  /** Artículo en profundidad, si existe */
  article: string | null;
  /**
   * Genera la página /gastos-deducibles/<slug>/ SOLO si hay contenido propio
   * y diferenciado (campo body). Evita páginas vacías.
   */
  body: string | null;
  sources: string[];
}
