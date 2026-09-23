import Link from "next/link";
import { SearchBox } from "@/components/search/SearchBox";

export default function NotFound() {
  return (
    <div className="container-page max-w-2xl py-20">
      <p className="tabular text-sm font-semibold text-muted">Error 404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">Esta página no existe</h1>
      <p className="mt-3 text-lg text-muted">Puede que la dirección haya cambiado. Busca lo que necesitas o vuelve al inicio.</p>
      <div className="mt-8">
        <SearchBox />
      </div>
      <p className="mt-6">
        <Link href="/" className="font-medium text-ink-soft underline underline-offset-4">
          Ir al inicio
        </Link>
      </p>
    </div>
  );
}
