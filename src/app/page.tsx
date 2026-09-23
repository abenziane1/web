import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { problemGroups } from "@/config/categories";
import { tools } from "@data/tools";
import { taxModels } from "@data/tax-models";
import { getAllArticles, getFeaturedArticles } from "@/lib/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";
import { SearchBox } from "@/components/search/SearchBox";
import { CalculatorCard } from "@/components/calculators/CalculatorCard";
import { ArticleCard } from "@/components/article/ArticleCard";
import { TaxCalendar } from "@/components/tax/TaxCalendar";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/config/categories";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  ...buildMetadata({ title: `${siteConfig.name}: ${siteConfig.tagline}`, description: siteConfig.description, path: "/" }),
  title: { absolute: `${siteConfig.name}: ${siteConfig.tagline}` },
};

const shortcuts: { label: string; href: string; icon: IconName }[] = [
  { label: "Cuota de autónomos", href: "/herramientas/calculadora-cuota-autonomos/", icon: "user" },
  { label: "Calculadora de IVA", href: "/herramientas/calculadora-iva/", icon: "percent" },
  { label: "Factura con IRPF", href: "/herramientas/calculadora-irpf-factura/", icon: "receipt" },
  { label: "Gastos deducibles", href: "/herramientas/comprobador-gastos-deducibles/", icon: "tag" },
  { label: "Calendario fiscal", href: "/calendario-fiscal/", icon: "calendar" },
  { label: "Modelos de Hacienda", href: "/modelos-hacienda/", icon: "file" },
];

function SectionTitle({ id, children, action }: { id: string; children: React.ReactNode; action?: { label: string; href: string } }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 id={id} className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
        {children}
      </h2>
      {action && (
        <Link href={action.href} className="shrink-0 text-sm font-medium text-ink-soft underline underline-offset-4">
          {action.label}
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const featured = getFeaturedArticles(6);
  const latest = getAllArticles().slice(0, 5);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-surface">
        <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <h1 className="max-w-xl text-[2.25rem] font-bold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">
              Fiscalidad para autónomos, explicada fácil
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Calcula tus impuestos, consulta tus obligaciones fiscales y resuelve tus dudas como autónomo.
            </p>
            <div className="mt-8 max-w-xl">
              <SearchBox size="lg" />
            </div>
          </div>

          {/* Pieza característica: una liquidación real, en el formato que usarás en las calculadoras */}
          <figure aria-label="Ejemplo de desglose de una factura" className="rounded-xl border border-line bg-white p-6 shadow-[0_1px_0_rgba(21,49,91,0.06)]">
            <figcaption className="text-sm font-semibold text-muted">Así se desglosa una factura con retención</figcaption>
            <dl className="mt-4 text-[15px]">
              {[
                ["Base imponible", "B"],
                ["IVA", "+ B × tipo IVA"],
                ["Retención IRPF", "− B × tipo IRPF"],
              ].map(([k, v]) => (
                <div key={k} className="ledger-row">
                  <dt>{k}</dt>
                  <span aria-hidden="true" className="leader" />
                  <dd className="tabular text-muted">{v}</dd>
                </div>
              ))}
              <div className="ledger-row ledger-total mt-2 border-t border-ink pt-3 pb-2">
                <dt className="font-semibold text-ink">Importe a cobrar</dt>
                <span aria-hidden="true" className="leader" />
                <dd className="font-bold text-ink">Base + IVA − IRPF</dd>
              </div>
            </dl>
            <Link href="/herramientas/calculadora-irpf-factura/" className="mt-5 inline-block rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-ink-soft">
              Calcular mi factura
            </Link>
          </figure>
        </div>
        <nav aria-label="Accesos directos" className="container-page pb-10">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {shortcuts.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="flex h-full items-center gap-2.5 rounded-lg border border-line bg-white px-3 py-3 text-sm font-medium text-ink hover:border-ink">
                  <Icon name={s.icon} className="h-5 w-5 shrink-0 text-ink-soft" />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* CALCULADORAS */}
      <section aria-labelledby="calculadoras" className="container-page mt-16">
        <SectionTitle id="calculadoras" action={{ label: "Todas las herramientas", href: "/herramientas/" }}>
          Calculadoras para autónomos
        </SectionTitle>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <CalculatorCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* QUÉ NECESITAS RESOLVER */}
      <section aria-labelledby="resolver" className="container-page mt-20">
        <SectionTitle id="resolver">Qué necesitas resolver</SectionTitle>
        <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {problemGroups.map((g) => (
            <div key={g.title}>
              <h3 className="border-b border-ink pb-2 font-semibold text-ink">
                <Link href={`/${g.category}/`} className="hover:underline">
                  {g.title}
                </Link>
              </h3>
              <ul className="mt-2">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="flex items-center justify-between gap-3 border-b border-line py-2.5 text-[15px] text-text hover:text-ink">
                      {l.label}
                      <Icon name="arrow" className="h-4 w-4 shrink-0 text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* GUÍAS MÁS CONSULTADAS */}
      {featured.length > 0 && (
        <section aria-labelledby="guias" className="container-page mt-20">
          <SectionTitle id="guias" action={{ label: "Ver todas las guías", href: "/guias/" }}>
            Guías más consultadas
          </SectionTitle>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((a) => (
              <ArticleCard key={a.href} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* PRÓXIMAS OBLIGACIONES + MODELOS */}
      <section aria-labelledby="obligaciones" className="container-page mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle id="obligaciones">Próximas obligaciones fiscales</SectionTitle>
          <div className="mt-6">
            <TaxCalendar compact />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">Modelos de Hacienda</h2>
          <ul className="mt-6 divide-y divide-line rounded-lg border border-line">
            {taxModels.map((m) => (
              <li key={m.code}>
                {m.href ? (
                  <Link href={m.href} className="grid grid-cols-[4rem_1fr] items-baseline gap-3 p-4 hover:bg-surface">
                    <span className="tabular text-xl font-bold text-ink">{m.code}</span>
                    <span className="text-[15px] text-text">{m.name}</span>
                  </Link>
                ) : (
                  <div className="grid grid-cols-[4rem_1fr] items-baseline gap-3 p-4">
                    <span className="tabular text-xl font-bold text-muted">{m.code}</span>
                    <span className="text-[15px] text-muted">{m.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ÚLTIMOS CONTENIDOS ACTUALIZADOS */}
      <section aria-labelledby="actualizados" className="container-page mt-20">
        <SectionTitle id="actualizados">Últimos contenidos actualizados</SectionTitle>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {latest.map((a) => (
            <li key={a.href}>
              <Link href={a.href} className="flex flex-col gap-1 py-4 hover:text-ink sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="font-medium text-text">{a.title}</span>
                <span className="shrink-0 text-sm text-muted">
                  <time dateTime={a.updated}>{formatDate(a.updated)}</time>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
