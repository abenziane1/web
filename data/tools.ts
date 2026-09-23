import type { IconName } from "@/config/categories";

/**
 * Registro de herramientas. Para añadir una calculadora nueva:
 *  1. Lógica pura en src/lib/calculators/<nombre>.ts (+ test)
 *  2. Componente cliente en src/components/calculators/<Nombre>Calculator.tsx
 *  3. Entrada aquí y en src/components/calculators/registry.tsx
 */
export interface Tool {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  icon: IconName;
  /** Artículos relacionados (ruta /categoria/slug) */
  related: string[];
  /** Preguntas frecuentes propias de la herramienta */
  faq: { q: string; a: string }[];
  featured: boolean;
}

export const tools: Tool[] = [
  {
    slug: "calculadora-iva",
    name: "Calculadora de IVA",
    shortName: "IVA",
    title: "Calculadora de IVA: base, IVA y total de una factura",
    description:
      "Calcula el IVA y el total de una factura a partir de la base imponible, o saca la base y el IVA de un importe con IVA incluido.",
    icon: "percent",
    related: ["/modelos-hacienda/modelo-303/", "/iva/recargo-de-equivalencia/"],
    faq: [
      {
        q: "¿Cómo se calcula la base imponible a partir de un total con IVA?",
        a: "Se divide el total entre (1 + tipo de IVA / 100). Por ejemplo, con un tipo del X %, base = total / (1 + X/100). La calculadora lo hace en modo inverso.",
      },
    ],
    featured: true,
  },
  {
    slug: "calculadora-irpf-factura",
    name: "Calculadora de factura con IRPF",
    shortName: "Factura con IRPF",
    title: "Calculadora de factura con retención de IRPF",
    description:
      "Calcula la retención de IRPF, el IVA, el total de la factura y el importe neto que vas a cobrar.",
    icon: "invoice",
    related: ["/irpf/retencion-irpf-factura-autonomo/", "/modelos-hacienda/modelo-111/"],
    faq: [
      {
        q: "¿La retención se calcula sobre la base o sobre el total?",
        a: "La retención de IRPF se aplica sobre la base imponible, no sobre el total con IVA.",
      },
    ],
    featured: true,
  },
  {
    slug: "calculadora-cuota-autonomos",
    name: "Calculadora de cuota de autónomos",
    shortName: "Cuota de autónomos",
    title: "Calculadora de cuota de autónomos",
    description:
      "Estima tu cuota mensual de autónomos a partir de tus rendimientos netos previstos, según los tramos vigentes.",
    icon: "user",
    related: ["/autonomos/cuota-autonomos-2026/", "/autonomos/tarifa-plana-autonomos/"],
    faq: [],
    featured: true,
  },
  {
    slug: "calculadora-iva-trimestral",
    name: "Calculadora de IVA trimestral",
    shortName: "IVA trimestral",
    title: "Calculadora de IVA trimestral (modelo 303)",
    description:
      "Estima el resultado de tu liquidación trimestral de IVA a partir del IVA repercutido, el soportado y las cuotas a compensar.",
    icon: "calculator",
    related: ["/modelos-hacienda/modelo-303/"],
    faq: [
      {
        q: "¿Qué son las cuotas a compensar de periodos anteriores?",
        a: "Son importes de IVA a favor del contribuyente que salieron en liquidaciones anteriores y no se solicitaron como devolución, por lo que pueden restarse en periodos posteriores.",
      },
    ],
    featured: true,
  },
  {
    slug: "comprobador-gastos-deducibles",
    name: "Comprobador de gastos deducibles",
    shortName: "Gastos deducibles",
    title: "Comprobador de gastos deducibles para autónomos",
    description:
      "Busca un gasto y consulta si suele ser deducible para un autónomo, en qué condiciones y qué justificantes necesitas.",
    icon: "tag",
    related: ["/gastos-deducibles/que-puedo-deducir-siendo-autonomo/"],
    faq: [],
    featured: true,
  },
];

export const toolMap = Object.fromEntries(tools.map((t) => [t.slug, t])) as Record<string, Tool>;
