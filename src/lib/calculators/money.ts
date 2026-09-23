/**
 * Utilidades monetarias. Todos los cálculos se hacen en céntimos enteros
 * para evitar errores de coma flotante (0,1 + 0,2 ≠ 0,3).
 */
export type Cents = number;

export function toCents(euros: number): Cents {
  return Math.round((euros + Number.EPSILON) * 100);
}

export function fromCents(cents: Cents): number {
  return cents / 100;
}

/** Aplica un porcentaje a un importe en céntimos, redondeando al céntimo (half away from zero). */
export function percentOf(cents: Cents, percent: number): Cents {
  const raw = (cents * percent) / 100;
  return Math.sign(raw) * Math.round(Math.abs(raw) + Number.EPSILON);
}

/** Convierte texto introducido por el usuario ("1.234,56", "1234.56", "1 234") a número. */
export function parseAmount(input: string): number | null {
  const s = input.trim().replace(/\s|€|%/g, "");
  if (s === "") return null;
  let normalized = s;
  if (s.includes(",") && s.includes(".")) {
    // El último separador es el decimal
    normalized = s.lastIndexOf(",") > s.lastIndexOf(".")
      ? s.replace(/\./g, "").replace(",", ".")
      : s.replace(/,/g, "");
  } else if (s.includes(",")) {
    normalized = s.replace(",", ".");
  } else if ((s.match(/\./g) ?? []).length > 1) {
    normalized = s.replace(/\./g, "");
  }
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

const eur = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  // En es-ES los números de 4 cifras no se agrupan por defecto; en importes queremos "1.250,50 €"
  useGrouping: "always",
} as Intl.NumberFormatOptions);
const pct = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 });

export function formatEUR(euros: number): string {
  return eur.format(euros);
}

export function formatCents(cents: Cents): string {
  return eur.format(fromCents(cents));
}

export function formatPercent(value: number): string {
  return `${pct.format(value)} %`;
}
