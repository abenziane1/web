import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { CalculatorProps } from "./types";

/**
 * Mapa slug → componente. Cada calculadora se carga en su propio chunk, así
 * una página solo descarga el JavaScript de su herramienta.
 */
export const calculatorRegistry: Record<string, ComponentType<CalculatorProps>> = {
  "calculadora-iva": dynamic(() => import("./VatCalculator")),
  "calculadora-irpf-factura": dynamic(() => import("./InvoiceCalculator")),
  "calculadora-cuota-autonomos": dynamic(() => import("./AutonomosCalculator")),
  "calculadora-iva-trimestral": dynamic(() => import("./QuarterlyVatCalculator")),
  "comprobador-gastos-deducibles": dynamic(() => import("./ExpenseChecker")),
};
