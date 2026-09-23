import Link from "next/link";
import { getTaxYear } from "@/lib/tax";
import { siteConfig } from "@/config/site";
import { formatShortDate } from "@/lib/format";
import { Pending } from "@/components/ui/Pending";

/**
 * Calendario de obligaciones fiscales. Lee /data/tax/<año>/deadlines.json.
 * Las fechas sin verificar se muestran como pendientes.
 */
export function TaxCalendar({
  year = siteConfig.defaultTaxYear,
  compact = false,
  today = new Date().toISOString().slice(0, 10),
}: {
  year?: number;
  compact?: boolean;
  today?: string;
}) {
  const data = getTaxYear(year);
  if (!data) return <p className="text-muted">No hay calendario configurado para {year}.</p>;

  const all = data.deadlines.deadlines;
  const dated = all.filter((d) => d.verified && d.start && d.end);
  const upcoming = dated.filter((d) => (d.end as string) >= today).sort((a, b) => (a.end as string).localeCompare(b.end as string));
  const items = compact ? (upcoming.length ? upcoming.slice(0, 3) : all.slice(0, 4)) : all;

  return (
    <div>
      <ol className="divide-y divide-line rounded-lg border border-line bg-white">
        {items.map((d) => {
          const ok = d.verified && d.start && d.end;
          return (
            <li key={d.id} className="grid grid-cols-[5.5rem_1fr] gap-4 p-4 sm:grid-cols-[7rem_1fr]">
              <div className="tabular text-sm">
                {ok ? (
                  <>
                    <span className="block font-semibold text-ink">{formatShortDate(d.start as string)}</span>
                    <span className="block text-muted">al {formatShortDate(d.end as string)}</span>
                  </>
                ) : (
                  <span className="block font-semibold text-pending">Fecha pendiente</span>
                )}
              </div>
              <div>
                <p className="font-medium text-text">{d.label}</p>
                <p className="mt-1 flex flex-wrap gap-1.5">
                  {d.models.map((m) => (
                    <span key={m} className="tabular rounded border border-line px-1.5 py-0.5 text-xs text-muted">
                      Modelo {m}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      {!data.deadlines.verified && (
        <p className="mt-3 text-sm text-muted">
          <Pending>Fechas de {year} pendientes de verificación</Pending> Consulta siempre el calendario oficial de la
          Agencia Tributaria.
        </p>
      )}
      {compact && (
        <p className="mt-3 text-sm">
          <Link href="/calendario-fiscal/" className="font-medium text-ink-soft underline underline-offset-4">
            Ver el calendario fiscal completo
          </Link>
        </p>
      )}
    </div>
  );
}
