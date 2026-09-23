import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { CookieSettingsLink } from "@/components/analytics/CookieSettingsLink";
import { analyticsConfig } from "@/lib/analytics";

const groups: { title: string; items: { label: string; href: string }[] }[] = [
  { title: "Temas", items: footerNav.temas },
  { title: "Herramientas", items: footerNav.herramientas },
  { title: "Sobre la web", items: footerNav.confianza },
  { title: "Legal", items: footerNav.legal },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm leading-relaxed text-muted">{siteConfig.description}</p>
        </div>
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2 className="text-sm font-semibold text-ink">{g.title}</h2>
            <ul className="mt-3 space-y-2">
              {g.items.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-sm text-muted hover:text-ink hover:underline">
                    {i.label}
                  </Link>
                </li>
              ))}
              {g.title === "Legal" && analyticsConfig.adsenseClient && (
                <li>
                  <CookieSettingsLink className="text-left text-sm text-muted hover:text-ink hover:underline" />
                </li>
              )}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 text-xs leading-relaxed text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Contenido informativo. No sustituye el asesoramiento
          profesional adaptado a tu situación.
        </p>
      </div>
    </footer>
  );
}
