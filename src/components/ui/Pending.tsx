/**
 * Marca visible para datos que aún no se han verificado con fuentes oficiales.
 * Es intencionadamente llamativa: no debe publicarse contenido con estas marcas.
 */
export function Pending({ children }: { children?: React.ReactNode }) {
  return (
    <span className="not-prose mx-0.5 inline-flex items-center rounded border border-pending/40 bg-pending/10 px-1.5 py-0.5 text-[0.8em] font-semibold text-pending">
      {children ?? "[DATOS PENDIENTES DE VERIFICACIÓN]"}
    </span>
  );
}

export function PendingNotice({ title, items }: { title: string; items?: string[] }) {
  return (
    <div role="note" className="rounded-md border border-pending/40 bg-pending/5 p-4 text-sm">
      <p className="font-semibold text-pending">{title}</p>
      {items && items.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-text">
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
