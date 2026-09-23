"use client";

import { useEffect, useId, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { formatCents } from "@/lib/calculators/money";

/** Envía calculator_started en la primera interacción y calculator_completed al primer resultado válido. */
export function useCalculatorTracking(slug: string, hasInput: boolean, hasResult: boolean) {
  const started = useRef(false);
  const completed = useRef(false);
  useEffect(() => {
    if (hasInput && !started.current) {
      started.current = true;
      trackEvent("calculator_started", { calculator: slug });
    }
  }, [hasInput, slug]);
  useEffect(() => {
    if (!hasResult || completed.current) return;
    const t = setTimeout(() => {
      completed.current = true;
      trackEvent("calculator_completed", { calculator: slug });
    }, 1200);
    return () => clearTimeout(t);
  }, [hasResult, slug]);
}

export function CalculatorShell({ children, result }: { children: React.ReactNode; result: React.ReactNode }) {
  return (
    <div className="grid overflow-hidden rounded-xl border border-line bg-white md:grid-cols-2">
      <div className="p-5 sm:p-7">{children}</div>
      <div className="border-t border-line bg-surface p-5 sm:p-7 md:border-l md:border-t-0" aria-live="polite">
        {result}
      </div>
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  suffix,
  hint,
  placeholder = "0,00",
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix: "€" | "%";
  hint?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="mt-5 first:mt-0">
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="field-input pr-10 disabled:bg-surface disabled:text-muted"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-muted">
          {suffix}
        </span>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

export function PresetChips({
  label,
  presets,
  current,
  onPick,
}: {
  label: string;
  presets: { id: string; label: string; value: number }[];
  current: string;
  onPick: (v: string) => void;
}) {
  if (!presets.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={label}>
      {presets.map((p) => {
        const v = String(p.value).replace(".", ",");
        const active = current === v;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onPick(v)}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1 text-sm ${active ? "border-ink bg-ink text-white" : "border-line text-text hover:border-ink-soft"}`}
          >
            {p.label} · <span className="tabular">{v} %</span>
          </button>
        );
      })}
    </div>
  );
}

export function SegmentedToggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-lg border border-line bg-surface p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${value === o.value ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Resultado con formato de liquidación: concepto ..... importe, total con doble raya. */
export function Ledger({
  title,
  rows,
  total,
  note,
}: {
  title: string;
  rows: { label: string; cents: number; sign?: "+" | "−" }[];
  total: { label: string; cents: number };
  note?: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted">{title}</h3>
      <dl className="mt-3">
        {rows.map((r) => (
          <div key={r.label} className="ledger-row">
            <dt className="text-text">{r.label}</dt>
            <span aria-hidden="true" className="leader" />
            <dd className="tabular text-right text-text">
              {r.sign && <span className="mr-1 text-muted">{r.sign}</span>}
              {formatCents(r.cents)}
            </dd>
          </div>
        ))}
        <div className="ledger-row ledger-total mt-2 border-t border-ink pt-3 pb-2">
          <dt className="font-semibold text-ink">{total.label}</dt>
          <span aria-hidden="true" className="leader" />
          <dd className="tabular text-right text-2xl font-bold text-ink">{formatCents(total.cents)}</dd>
        </div>
      </dl>
      {note && <div className="mt-4 text-sm text-muted">{note}</div>}
    </div>
  );
}

export function EmptyResult({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-muted">{children}</p>;
}
