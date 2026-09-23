import { Icon } from "@/components/ui/Icon";

/**
 * Formulario GET a /buscar/: funciona sin JavaScript y no añade peso al bundle.
 */
export function SearchBox({
  placeholder = "¿Qué necesitas calcular o consultar?",
  size = "md",
  defaultValue,
  autoFocus,
}: {
  placeholder?: string;
  size?: "md" | "lg";
  defaultValue?: string;
  autoFocus?: boolean;
}) {
  const lg = size === "lg";
  return (
    <form action="/buscar/" method="get" role="search" className="relative w-full">
      <label htmlFor={`q-${size}`} className="sr-only">
        {placeholder}
      </label>
      <Icon name="search" className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted ${lg ? "h-6 w-6" : "h-5 w-5"}`} />
      <input
        id={`q-${size}`}
        name="q"
        type="search"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-line bg-white text-text shadow-[0_1px_0_rgba(21,49,91,0.04)] placeholder:text-muted focus:border-ink-soft focus:outline-none focus:ring-4 focus:ring-ink-soft/15 ${
          lg ? "py-4 pl-13 pr-28 text-lg" : "py-3 pl-12 pr-24 text-base"
        }`}
      />
      <button
        type="submit"
        className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-ink font-medium text-white hover:bg-ink-soft ${lg ? "px-5 py-2.5" : "px-4 py-2 text-sm"}`}
      >
        Buscar
      </button>
    </form>
  );
}
