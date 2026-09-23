"use client";

import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { normalize } from "@/lib/content/slugify";
import { Pending } from "@/components/ui/Pending";
import { useCalculatorTracking } from "./primitives";
import type { CalculatorProps } from "./types";
import type { Expense } from "@data/expenses";

function matches(e: Expense, q: string) {
  if (!q) return true;
  const hay = normalize([e.name, e.summary, ...e.synonyms].join(" "));
  return normalize(q)
    .split(/\s+/)
    .filter(Boolean)
    .every((t) => hay.includes(t));
}

export default function ExpenseChecker({ expenses, expenseCategories }: CalculatorProps) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("todas");
  const deferred = useDeferredValue(query);
  const inputId = useId();

  const results = useMemo(
    () => expenses.filter((e) => (cat === "todas" || e.category === cat) && matches(e, deferred)),
    [expenses, cat, deferred],
  );
  useCalculatorTracking("comprobador-gastos-deducibles", query !== "" || cat !== "todas", query.length > 2 && results.length > 0);

  const labelOf = (id: string) => expenseCategories.find((c) => c.id === id)?.label ?? id;

  return (
    <div className="rounded-xl border border-line bg-white">
      <div className="border-b border-line p-5 sm:p-7">
        <label htmlFor={inputId} className="block text-sm font-medium text-text">
          ¿Qué gasto quieres comprobar?
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej.: móvil, gasolina, portátil, coworking"
          className="field-input mt-1.5 text-base"
        />
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {[{ id: "todas", label: "Todas" }, ...expenseCategories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={cat === c.id}
              onClick={() => setCat(c.id)}
              className={`rounded-full border px-3 py-1 text-sm ${cat === c.id ? "border-ink bg-ink text-white" : "border-line text-text hover:border-ink-soft"}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5 sm:p-7">
        <p className="text-sm text-muted" aria-live="polite">
          {results.length === 1 ? "1 gasto" : `${results.length} gastos`}
        </p>
        {results.length === 0 ? (
          <p className="mt-4 text-text">
            No hay fichas para esa búsqueda. Prueba con un término más general o revisa la guía{" "}
            <Link href="/gastos-deducibles/que-puedo-deducir-siendo-autonomo/" className="underline">
              qué puedo deducir siendo autónomo
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-line">
            {results.map((e) => (
              <li key={e.slug}>
                <details className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block font-semibold text-ink">{e.name}</span>
                      <span className="mt-0.5 block text-xs text-muted">{labelOf(e.category)}</span>
                    </span>
                    <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed">
                    <p className="text-text">{e.summary}</p>
                    <dl className="grid gap-2 sm:grid-cols-2">
                      <div className="rounded-md bg-surface p-3">
                        <dt className="font-medium text-ink">IRPF</dt>
                        <dd className="mt-1">{e.irpf ?? <Pending />}</dd>
                      </div>
                      <div className="rounded-md bg-surface p-3">
                        <dt className="font-medium text-ink">IVA</dt>
                        <dd className="mt-1">{e.iva ?? <Pending />}</dd>
                      </div>
                    </dl>
                    <div>
                      <p className="font-medium text-ink">Condiciones habituales</p>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-text">
                        {e.conditions.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-muted">Justificantes: {e.documents.join(", ")}.</p>
                    {(e.article || e.body) && (
                      <p>
                        <Link
                          href={e.body ? `/gastos-deducibles/${e.slug}/` : (e.article as string)}
                          className="font-medium text-ink-soft underline underline-offset-4"
                        >
                          Ver la guía completa
                        </Link>
                      </p>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
