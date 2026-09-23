import type { FaqItem } from "@/lib/content/types";

/** Acordeón nativo con <details>: accesible y sin JavaScript. */
export function FAQ({ items, id = "preguntas-frecuentes", title = "Preguntas frecuentes" }: { items: FaqItem[]; id?: string; title?: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="text-xl font-semibold text-ink">
        {title}
      </h2>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-text [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="mt-0.5 text-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
