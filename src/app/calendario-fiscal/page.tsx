import type { Metadata } from "next";
import { categoryMap } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { TaxCalendar } from "@/components/tax/TaxCalendar";
import { OfficialSources } from "@/components/article/OfficialSources";
import { Disclaimer } from "@/components/ui/Disclaimer";

/** Se regenera cada día para que las próximas obligaciones fiscales estén al día. */
export const revalidate = 86400;

const c = categoryMap["calendario-fiscal"];
const year = siteConfig.defaultTaxYear;

export const metadata: Metadata = buildMetadata({
  title: `Calendario fiscal ${year} para autónomos`,
  description: c.description,
  path: "/calendario-fiscal/",
});

export default function TaxCalendarPage() {
  return (
    <>
      <PageHeader title={`Calendario fiscal ${year} para autónomos`} intro={c.intro} crumbs={[{ name: c.name, href: "/calendario-fiscal/" }]} />
      <div className="container-page mt-10 max-w-3xl">
        <TaxCalendar year={year} />
        <OfficialSources sources={["aeat-sede"]} />
        <Disclaimer className="mt-10" />
      </div>
    </>
  );
}
