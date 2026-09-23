import type { AutonomosData } from "@/lib/tax/types";
import type { Expense } from "@data/expenses";

export interface Preset {
  id: string;
  label: string;
  value: number;
}

/** Datos que el servidor pasa a cualquier calculadora (solo parámetros verificados). */
export interface CalculatorProps {
  taxYear: number;
  vatRates: Preset[];
  withholdingRates: Preset[];
  autonomos: AutonomosData | null;
  expenses: Expense[];
  expenseCategories: { id: string; label: string }[];
}
