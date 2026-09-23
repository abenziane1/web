"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/navigation";
import { Icon } from "@/components/ui/Icon";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu-movil"
        className="grid h-10 w-10 place-items-center rounded-md text-muted hover:bg-surface hover:text-ink"
      >
        <Icon name={open ? "close" : "menu"} />
        <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
      </button>
      {open && (
        <nav id="menu-movil" aria-label="Menú móvil" className="absolute inset-x-0 top-16 border-b border-line bg-white shadow-sm">
          <ul className="container-page py-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block rounded-md px-2 py-3 text-base font-medium text-text hover:bg-surface">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
