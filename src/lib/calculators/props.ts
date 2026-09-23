import "server-only";
import { siteConfig } from "@/config/site";
import { getTaxYear, verifiedParams } from "@/lib/tax";
import { expenses, expenseCategories } from "@data/expenses";
import type { CalculatorProps } from "@/components/calculators/types";

/** Construye en servidor los datos de una calculadora (solo parámetros verificados). */
export function getCalculatorProps(slug: string, year = siteConfig.defaultTaxYear): CalculatorProps {
  const data = getTaxYear(year);
  const toPreset = (p: { id?: string; label: string; value: number }) => ({ id: p.id ?? p.label, label: p.label, value: p.value });
  const needsExpenses = slug === "comprobador-gastos-deducibles";
  return {
    taxYear: year,
    vatRates: data ? verifiedParams(data.vat.rates).map(toPreset) : [],
    withholdingRates: data ? verifiedParams(data.irpf.withholdingRates).map(toPreset) : [],
    autonomos: slug === "calculadora-cuota-autonomos" ? (data?.autonomos ?? null) : null,
    expenses: needsExpenses ? expenses : [],
    expenseCategories: needsExpenses ? expenseCategories : [],
  };
}
