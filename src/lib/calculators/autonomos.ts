import type { AutonomosData } from "../tax/types.ts";
import { type Cents, percentOf, toCents } from "./money.ts";

export type AutonomosResult =
  | { status: "missing_config"; missing: string[] }
  | {
      status: "ok";
      monthlyNetIncome: Cents;
      bracketIndex: number;
      minBase: Cents;
      maxBase: Cents;
      chosenBase: Cents;
      monthlyFee: Cents;
      yearlyFee: Cents;
    };

/**
 * Cálculo genérico de la cuota según rendimientos netos. Toda la normativa
 * (tramos, bases, tipo y deducción por gastos genéricos) viene de la
 * configuración anual; aquí no hay ninguna cifra fiscal escrita.
 */
export function autonomosFee(
  config: AutonomosData,
  yearlyIncomeEuros: number,
  yearlyExpensesEuros: number,
  chosenBaseEuros?: number,
): AutonomosResult {
  const missing: string[] = [];
  if (!config.contributionRate.verified || config.contributionRate.value === null) missing.push(config.contributionRate.label);
  if (!config.genericExpenseDeduction.verified || config.genericExpenseDeduction.value === null)
    missing.push(config.genericExpenseDeduction.label);
  if (!config.verified || config.brackets.length === 0) missing.push("Tramos de rendimientos y bases de cotización");
  if (missing.length > 0) return { status: "missing_config", missing };

  const rate = config.contributionRate.value as number;
  const genericDeduction = config.genericExpenseDeduction.value as number;

  const yearlyNet = toCents(yearlyIncomeEuros - yearlyExpensesEuros);
  const afterGeneric = yearlyNet - percentOf(yearlyNet, genericDeduction);
  const monthlyNetIncome = Math.round(afterGeneric / 12);
  const monthlyEuros = monthlyNetIncome / 100;

  const bracketIndex = config.brackets.findIndex(
    (b) => (b.from === null || monthlyEuros >= b.from) && (b.to === null || monthlyEuros <= b.to),
  );
  const bracket = config.brackets[bracketIndex === -1 ? config.brackets.length - 1 : bracketIndex];
  if (!bracket) return { status: "missing_config", missing: ["Tramos de rendimientos y bases de cotización"] };

  const minBase = toCents(bracket.minBase);
  const maxBase = toCents(bracket.maxBase);
  const requested = chosenBaseEuros !== undefined ? toCents(chosenBaseEuros) : minBase;
  const chosenBase = Math.min(maxBase, Math.max(minBase, requested));
  const monthlyFee = percentOf(chosenBase, rate);

  return {
    status: "ok",
    monthlyNetIncome,
    bracketIndex: bracketIndex === -1 ? config.brackets.length - 1 : bracketIndex,
    minBase,
    maxBase,
    chosenBase,
    monthlyFee,
    yearlyFee: monthlyFee * 12,
  };
}
