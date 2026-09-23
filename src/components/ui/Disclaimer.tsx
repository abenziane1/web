export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`rounded-md border border-line bg-surface px-4 py-3 text-sm text-muted ${className}`}>
      Contenido informativo. No sustituye el asesoramiento profesional adaptado a tu situación.
    </p>
  );
}
