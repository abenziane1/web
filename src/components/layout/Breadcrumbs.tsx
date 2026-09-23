import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Inicio", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Ruta de navegación" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-text">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:text-ink hover:underline">
                      {c.name}
                    </Link>
                    <span aria-hidden="true" className="text-line">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
