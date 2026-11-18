import { getSectionText } from "@/lib/content/sections";
import { Mdx } from "@/components/article/Mdx";

/** Bloque de texto editorial de una landing, leído de content/secciones/<clave>.mdx */
export function SectionText({ sectionKey, className = "" }: { sectionKey: string; className?: string }) {
  const body = getSectionText(sectionKey);
  if (!body) return null;
  return (
    <section className={`max-w-3xl ${className}`}>
      <div className="prose prose-slate max-w-none prose-headings:text-ink prose-a:text-ink-soft">
        <Mdx source={body} />
      </div>
    </section>
  );
}
