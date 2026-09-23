import { type Cents, percentOf, toCents } from "./money.ts";

export interface VatResult {
  base: Cents;
  vat: Cents;
  total: Cents;
}

/** Base imponible → IVA y total */
export function vatFromBase(baseEuros: number, ratePercent: number): VatResult {
  const base = toCents(baseEuros);
  const vat = percentOf(base, ratePercent);
  return { base, vat, total: base + vat };
}

/** Total con IVA incluido → base e IVA (cálculo inverso) */
export function vatFromTotal(totalEuros: number, ratePercent: number): VatResult {
  const total = toCents(totalEuros);
  const base = Math.round(total / (1 + ratePercent / 100));
  return { base, vat: total - base, total };
}
