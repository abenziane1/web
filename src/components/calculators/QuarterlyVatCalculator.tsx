"use client";

import { useMemo, useState } from "react";
import { parseAmount } from "@/lib/calculators/money";
import { quarterlyVat } from "@/lib/calculators/quarterly-vat";
import { CalculatorShell, EmptyResult, Ledger, NumberField, useCalculatorTracking } from "./primitives";

const outcomeLabel = {
  a_ingresar: "Resultado a ingresar",
  a_compensar_o_devolver: "Resultado a compensar o devolver",
  cero: "Resultado",
} as const;

export default function QuarterlyVatCalculator() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [carried, setCarried] = useState("");

  const o = parseAmount(output);
  const i = parseAmount(input);
  const c = carried === "" ? 0 : parseAmount(carried);
  const valid = o !== null && i !== null && c !== null && o >= 0 && i >= 0 && c >= 0;
  const r = useMemo(() => (valid ? quarterlyVat(o, i, c) : null), [valid, o, i, c]);
  useCalculatorTracking("calculadora-iva-trimestral", output !== "", Boolean(r));

  return (
    <CalculatorShell
      result={
        r ? (
          <Ledger
            title="Estimación de la liquidación"
            rows={[
              { label: "IVA repercutido", cents: r.output },
              { label: "IVA soportado deducible", cents: r.input, sign: "−" },
              { label: "Cuotas a compensar", cents: r.carriedForward, sign: "−" },
            ]}
            total={{ label: outcomeLabel[r.outcome], cents: Math.abs(r.result) }}
            note={
              r.outcome === "a_compensar_o_devolver"
                ? "Un resultado negativo normalmente se compensa en periodos siguientes; la devolución solo puede pedirse en determinados periodos."
                : "Estimación simplificada: no incluye prorrata, regularizaciones ni regímenes especiales."
            }
          />
        ) : (
          <EmptyResult>Introduce el IVA repercutido y el soportado del trimestre.</EmptyResult>
        )
      }
    >
      <NumberField label="IVA repercutido" hint="El IVA de las facturas que has emitido." value={output} onChange={setOutput} suffix="€" />
      <NumberField label="IVA soportado deducible" hint="El IVA de tus facturas de gastos deducibles." value={input} onChange={setInput} suffix="€" />
      <NumberField label="Cuotas a compensar de periodos anteriores" hint="Opcional." value={carried} onChange={setCarried} suffix="€" />
    </CalculatorShell>
  );
}
