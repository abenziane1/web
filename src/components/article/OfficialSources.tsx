import { sourceMap } from "@data/sources";
import type { SourceInput } from "@/lib/content/types";
import { Icon } from "@/components/ui/Icon";

export function resolveSources(sources: SourceInput[]) {
  return sources
    .map((s) => (typeof s === "string" ? sourceMap[s] : { id: s.url, title: s.title, url: s.url, publisher: "" }))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
}

export function OfficialSources({ sources, id = "fuentes-oficiales" }: { sources: SourceInput[]; id?: string }) {
  const list = resolveSources(sources);
  if (!list.length) return null;
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="text-xl font-semibold text-ink">
        Fuentes oficiales
      </h2>
      <ul className="mt-4 space-y-2">
        {list.map((s) => (
          <li key={s.url}>
            <a href={s.url} rel="noopener" target="_blank" className="inline-flex items-start gap-2 text-ink-soft underline decoration-line underline-offset-4 hover:decoration-ink-soft">
              <Icon name="external" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {s.title}
                {s.publisher && <span className="text-muted no-underline"> ({s.publisher})</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
