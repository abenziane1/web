import Link from "next/link";
import type { TaxModel } from "@data/tax-models";

export function TaxModelCard({ model }: { model: TaxModel }) {
  const inner = (
    <>
      <span className="tabular text-3xl font-bold tracking-tight text-ink">{model.code}</span>
      <span className="mt-1 block font-semibold text-text">{model.name}</span>
      <span className="mt-1.5 block text-sm leading-relaxed text-muted">{model.summary}</span>
      {!model.href && <span className="mt-3 block text-xs text-muted">Guía en preparación</span>}
    </>
  );
  const cls = "block h-full rounded-lg border border-line bg-white p-5";
  return model.href ? (
    <Link href={model.href} className={`${cls} hover:border-ink-soft`} aria-label={`Modelo ${model.code}: ${model.name}`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
