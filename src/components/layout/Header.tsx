import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { Icon } from "@/components/ui/Icon";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[15px] font-medium text-muted hover:bg-surface hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <Link
            href="/buscar/"
            className="grid h-10 w-10 place-items-center rounded-md text-muted hover:bg-surface hover:text-ink"
            aria-label="Buscar"
          >
            <Icon name="search" />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
