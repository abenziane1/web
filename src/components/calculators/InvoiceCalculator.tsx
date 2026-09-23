"use client";

import { useMemo, useState } from "react";
import { parseAmount } from "@/lib/calculators/money";
import { invoiceWithWithholding } from "@/lib/calculators/invoice";
import { CalculatorShell, EmptyResult, Ledger, NumberField, PresetChips, useCalculatorTracking } from "./primitives";
import type { CalculatorProps } from "./types";

export default function InvoiceCalculator({ vatRates, withholdingRates }: CalculatorProps) {
  const [base, setBase] = useState("");
  const [vat, setVat] = useState("");
  const [withholding, setWithholding] = useState("");

  const b = parseAmount(base);
  const v = parseAmount(vat);
  const w = parseAmount(withholding);
  const valid = b !== null && v !== null && w !== null && b >= 0 && v >= 0 && w >= 0 && v <= 100 && w <= 100;
  const result = useMemo(() => (valid ? invoiceWithWithholding(b, v, w) : null), [valid, b, v, w]);
  useCalculatorTracking("calculadora-irpf-factura", base !== "", Boolean(result));

  return (
    <CalculatorShell
      result={
        result ? (
          <Ledger
            title="Tu factura"
            rows={[
              { label: "Base imponible", cents: result.base },
              { label: `IVA (${vat} %)`, cents: result.vat, sign: "+" },
              { label: "Total factura", cents: result.totalInvoice },
              { label: `Retención IRPF (${withholding} %)`, cents: result.withholding, sign: "−" },
            ]}
            total={{ label: "Importe a cobrar", cents: result.netToReceive }}
            note="La retención se calcula sobre la base imponible. Tu cliente la ingresa en Hacienda a tu nombre."
          />
        ) : (
          <EmptyResult>Introduce la base, el IVA y la retención. Si tu factura no lleva IVA o retención, escribe 0.</EmptyResult>
        )
      }
    >
      <NumberField label="Base imponible" value={base} onChange={setBase} suffix="€" />
      <NumberField label="Tipo de IVA" value={vat} onChange={setVat} suffix="%" placeholder="0" />
      <PresetChips label="Tipos de IVA vigentes" presets={vatRates} current={vat} onPick={setVat} />
      <NumberField label="Retención de IRPF" value={withholding} onChange={setWithholding} suffix="%" placeholder="0" />
      <PresetChips label="Retenciones habituales" presets={withholdingRates} current={withholding} onPick={setWithholding} />
    </CalculatorShell>
  );
}
