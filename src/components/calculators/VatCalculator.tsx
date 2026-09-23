"use client";

import { useMemo, useState } from "react";
import { parseAmount } from "@/lib/calculators/money";
import { vatFromBase, vatFromTotal } from "@/lib/calculators/vat";
import { CalculatorShell, EmptyResult, Ledger, NumberField, PresetChips, SegmentedToggle, useCalculatorTracking } from "./primitives";
import type { CalculatorProps } from "./types";

type Mode = "base" | "total";

export default function VatCalculator({ vatRates }: CalculatorProps) {
  const [mode, setMode] = useState<Mode>("base");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");

  const a = parseAmount(amount);
  const r = parseAmount(rate);
  const valid = a !== null && r !== null && a >= 0 && r >= 0 && r <= 100;
  const result = useMemo(() => (valid ? (mode === "base" ? vatFromBase(a, r) : vatFromTotal(a, r)) : null), [valid, mode, a, r]);
  useCalculatorTracking("calculadora-iva", amount !== "" || rate !== "", Boolean(result));

  return (
    <CalculatorShell
      result={
        result ? (
          <Ledger
            title={mode === "base" ? "Factura calculada" : "Desglose del importe"}
            rows={[
              { label: "Base imponible", cents: result.base },
              { label: `IVA (${rate} %)`, cents: result.vat, sign: "+" },
            ]}
            total={{ label: "Total factura", cents: result.total }}
          />
        ) : (
          <EmptyResult>Introduce un importe y el tipo de IVA para ver el desglose.</EmptyResult>
        )
      }
    >
      <SegmentedToggle
        label="Tipo de cálculo"
        value={mode}
        onChange={setMode}
        options={[
          { value: "base", label: "Tengo la base" },
          { value: "total", label: "Tengo el total con IVA" },
        ]}
      />
      <div className="mt-5">
        <NumberField
          label={mode === "base" ? "Base imponible" : "Total con IVA incluido"}
          value={amount}
          onChange={setAmount}
          suffix="€"
        />
        <NumberField label="Tipo de IVA" value={rate} onChange={setRate} suffix="%" placeholder="Ej.: el tipo que aplicas" />
        <PresetChips label="Tipos de IVA vigentes" presets={vatRates} current={rate} onPick={setRate} />
      </div>
    </CalculatorShell>
  );
}
