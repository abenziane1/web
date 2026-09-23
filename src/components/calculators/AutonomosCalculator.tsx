"use client";

import { useMemo, useState } from "react";
import { formatCents, parseAmount } from "@/lib/calculators/money";
import { autonomosFee } from "@/lib/calculators/autonomos";
import { PendingNotice } from "@/components/ui/Pending";
import { CalculatorShell, EmptyResult, Ledger, NumberField, useCalculatorTracking } from "./primitives";
import type { CalculatorProps } from "./types";

export default function AutonomosCalculator({ autonomos, taxYear }: CalculatorProps) {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");

  const inc = parseAmount(income);
  const exp = expenses === "" ? 0 : parseAmount(expenses);
  const valid = inc !== null && exp !== null && inc >= 0 && exp >= 0;
  const result = useMemo(() => (valid && autonomos ? autonomosFee(autonomos, inc, exp) : null), [valid, autonomos, inc, exp]);
  useCalculatorTracking("calculadora-cuota-autonomos", income !== "", result?.status === "ok");

  const missingConfig = !autonomos || autonomosFee(autonomos, 0, 0).status === "missing_config";

  return (
    <CalculatorShell
      result={
        missingConfig ? (
          <PendingNotice
            title={`Faltan los parámetros oficiales de ${taxYear}`}
            items={
              autonomos
                ? (autonomosFee(autonomos, 0, 0) as { missing: string[] }).missing
                : ["No existe configuración para este año"]
            }
          />
        ) : result && result.status === "ok" ? (
          <Ledger
            title={`Estimación ${taxYear}`}
            rows={[
              { label: "Rendimiento neto mensual", cents: result.monthlyNetIncome },
              { label: "Base de cotización (mínima del tramo)", cents: result.chosenBase },
            ]}
            total={{ label: "Cuota mensual estimada", cents: result.monthlyFee }}
            note={`Tramo ${result.bracketIndex + 1}. Base entre ${formatCents(result.minBase)} y ${formatCents(result.maxBase)}. Cuota anual estimada: ${formatCents(result.yearlyFee)}.`}
          />
        ) : (
          <EmptyResult>Introduce tus ingresos y gastos previstos para el año.</EmptyResult>
        )
      }
    >
      <NumberField label="Ingresos previstos en el año" value={income} onChange={setIncome} suffix="€" />
      <NumberField label="Gastos deducibles previstos en el año" value={expenses} onChange={setExpenses} suffix="€" />
      <p className="mt-5 text-xs leading-relaxed text-muted">
        La cuota se calcula con los tramos de rendimientos netos y el tipo de cotización configurados para {taxYear}. La
        Seguridad Social regulariza la cotización cuando conoce tus rendimientos reales.
      </p>
    </CalculatorShell>
  );
}
