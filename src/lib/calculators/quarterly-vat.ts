import { type Cents, toCents } from "./money.ts";

export type QuarterlyOutcome = "a_ingresar" | "a_compensar_o_devolver" | "cero";

export interface QuarterlyVatResult {
  output: Cents; // IVA repercutido
  input: Cents; // IVA soportado deducible
  carriedForward: Cents; // cuotas a compensar de periodos anteriores
  difference: Cents;
  result: Cents;
  outcome: QuarterlyOutcome;
}

/**
 * Estimación simplificada de la liquidación trimestral:
 * resultado = repercutido − soportado − compensaciones de periodos anteriores.
 * No contempla regularizaciones, prorrata ni regímenes especiales.
 */
export function quarterlyVat(outputEuros: number, inputEuros: number, carriedEuros: number): QuarterlyVatResult {
  const output = toCents(outputEuros);
  const input = toCents(inputEuros);
  const carriedForward = toCents(Math.max(0, carriedEuros));
  const difference = output - input;
  const result = difference - carriedForward;
  const outcome: QuarterlyOutcome = result > 0 ? "a_ingresar" : result < 0 ? "a_compensar_o_devolver" : "cero";
  return { output, input, carriedForward, difference, result, outcome };
}
