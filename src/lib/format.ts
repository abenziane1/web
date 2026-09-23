const dateFmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const shortFmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", timeZone: "UTC" });

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

export function formatShortDate(iso: string): string {
  return shortFmt.format(new Date(`${iso}T00:00:00Z`));
}
