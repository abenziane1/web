/**
 * Registro de años fiscales. Para añadir un año nuevo:
 *  1. Copia /data/tax/<año anterior>/ a /data/tax/<año nuevo>/
 *  2. Actualiza los valores con fuentes oficiales
 *  3. Añade el año a este registro
 */
import meta2026 from "@data/tax/2026/meta.json";
import vat2026 from "@data/tax/2026/vat.json";
import irpf2026 from "@data/tax/2026/irpf.json";
import autonomos2026 from "@data/tax/2026/autonomos.json";
import deadlines2026 from "@data/tax/2026/deadlines.json";
import meta2027 from "@data/tax/2027/meta.json";
import vat2027 from "@data/tax/2027/vat.json";
import irpf2027 from "@data/tax/2027/irpf.json";
import autonomos2027 from "@data/tax/2027/autonomos.json";
import deadlines2027 from "@data/tax/2027/deadlines.json";
import type { TaxParam, TaxYearData } from "./types";

const registry: Record<number, TaxYearData> = {
  2026: {
    meta: meta2026,
    vat: vat2026 as TaxYearData["vat"],
    irpf: irpf2026 as TaxYearData["irpf"],
    autonomos: autonomos2026 as TaxYearData["autonomos"],
    deadlines: deadlines2026 as TaxYearData["deadlines"],
  },
  2027: {
    meta: meta2027,
    vat: vat2027 as TaxYearData["vat"],
    irpf: irpf2027 as TaxYearData["irpf"],
    autonomos: autonomos2027 as TaxYearData["autonomos"],
    deadlines: deadlines2027 as TaxYearData["deadlines"],
  },
};

export const availableTaxYears = Object.keys(registry).map(Number).sort();

export function getTaxYear(year: number): TaxYearData | null {
  return registry[year] ?? null;
}

/** Devuelve solo los parámetros verificados y con valor numérico */
export function verifiedParams(params: TaxParam[]): (TaxParam & { value: number })[] {
  return params.filter((p): p is TaxParam & { value: number } => p.verified && typeof p.value === "number");
}

/** Lista legible de parámetros que faltan por completar en un año */
export function missingTaxData(year: number): string[] {
  const d = getTaxYear(year);
  if (!d) return [`No existe configuración para ${year}`];
  const missing: string[] = [];
  const check = (group: string, p: TaxParam) => {
    if (!p.verified || p.value === null) missing.push(`${group}: ${p.label}`);
  };
  d.vat.rates.forEach((p) => check("IVA", p));
  d.vat.equivalenceSurcharge.forEach((p) => check("IVA", p));
  d.irpf.withholdingRates.forEach((p) => check("IRPF", p));
  check("IRPF", d.irpf.fractionalPayment);
  check("Cuota autónomos", d.autonomos.contributionRate);
  check("Cuota autónomos", d.autonomos.genericExpenseDeduction);
  if (d.autonomos.brackets.length === 0) missing.push("Cuota autónomos: tramos de rendimientos y bases");
  if (!d.autonomos.flatRate.verified) missing.push("Cuota autónomos: tarifa plana");
  d.deadlines.deadlines.forEach((dl) => {
    if (!dl.verified || !dl.start || !dl.end) missing.push(`Calendario: ${dl.label}`);
  });
  return missing;
}
