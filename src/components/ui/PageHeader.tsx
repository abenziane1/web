import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

export function PageHeader({
  title,
  intro,
  crumbs,
  children,
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-line bg-surface">
      <div className="container-page py-8 sm:py-12">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
