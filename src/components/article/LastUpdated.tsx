import { formatDate } from "@/lib/format";

export function LastUpdated({ updated, reviewedAt }: { updated: string; reviewedAt: string | null }) {
  return (
    <p className="text-sm text-muted">
      {reviewedAt ? (
        <>
          Última revisión: <time dateTime={reviewedAt}>{formatDate(reviewedAt)}</time>
        </>
      ) : (
        <>
          Última actualización: <time dateTime={updated}>{formatDate(updated)}</time>
        </>
      )}
    </p>
  );
}
