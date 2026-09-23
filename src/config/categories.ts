export type CategorySlug =
  | "autonomos"
  | "iva"
  | "irpf"
  | "modelos-hacienda"
  | "facturacion"
  | "gastos-deducibles"
  | "contabilidad"
  | "calendario-fiscal"
  | "herramientas"
  | "guias";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Título H1 de la landing */
  title: string;
  /** Meta description */
  description: string;
  /** Introducción visible de la landing */
  intro: string;
  icon: IconName;
}

export type IconName =
  | "user"
  | "percent"
  | "receipt"
  | "file"
  | "invoice"
  | "tag"
  | "book"
  | "calendar"
  | "calculator"
  | "guide"
  | "search"
  | "check"
  | "alert"
  | "arrow"
  | "menu"
  | "close"
  | "external";

export const categories: Category[] = [
  {
    slug: "autonomos",
    name: "Autónomos",
    title: "Autónomos: alta, baja, cuota y obligaciones",
    description:
      "Todo lo que necesitas saber para darte de alta, pagar la cuota y cumplir tus obligaciones como trabajador autónomo en España.",
    intro:
      "Alta y baja en Hacienda y en la Seguridad Social, cuota mensual, tarifa plana y figuras como el autónomo societario o colaborador.",
    icon: "user",
  },
  {
    slug: "iva",
    name: "IVA",
    title: "IVA para autónomos",
    description:
      "Cómo funciona el IVA para autónomos: tipos, IVA repercutido y soportado, liquidaciones trimestrales y operaciones intracomunitarias.",
    intro:
      "Qué IVA aplicar en tus facturas, qué IVA puedes deducir y cómo se liquida con Hacienda cada periodo.",
    icon: "percent",
  },
  {
    slug: "irpf",
    name: "IRPF",
    title: "IRPF para autónomos",
    description:
      "Retenciones en factura, pagos fraccionados y declaración de la renta para autónomos en estimación directa.",
    intro: "Retenciones, pagos fraccionados y cómo tributan los rendimientos de tu actividad.",
    icon: "receipt",
  },
  {
    slug: "modelos-hacienda",
    name: "Modelos de Hacienda",
    title: "Modelos de Hacienda para autónomos",
    description:
      "Qué modelos fiscales tiene que presentar un autónomo, para qué sirve cada uno y cómo se rellenan paso a paso.",
    intro: "Guías de cada modelo: quién lo presenta, para qué sirve y cómo se rellena.",
    icon: "file",
  },
  {
    slug: "facturacion",
    name: "Facturación",
    title: "Facturación para autónomos",
    description:
      "Cómo emitir facturas correctamente siendo autónomo: datos obligatorios, IVA, retenciones y casos especiales.",
    intro: "Requisitos de una factura, retenciones, recargo de equivalencia y casos especiales.",
    icon: "invoice",
  },
  {
    slug: "gastos-deducibles",
    name: "Gastos deducibles",
    title: "Gastos deducibles para autónomos",
    description:
      "Qué gastos puede deducir un autónomo en IRPF e IVA y qué requisitos deben cumplir: vehículo, teléfono, suministros, ordenador y más.",
    intro:
      "Busca un gasto concreto para ver si suele ser deducible, en qué condiciones y qué justificantes necesitas.",
    icon: "tag",
  },
  {
    slug: "contabilidad",
    name: "Contabilidad",
    title: "Contabilidad para autónomos y microempresas",
    description:
      "Libros registro, amortizaciones y contabilización de gastos para autónomos y microempresas.",
    intro: "Libros registro obligatorios, amortizaciones y cómo registrar cada operación.",
    icon: "book",
  },
  {
    slug: "calendario-fiscal",
    name: "Calendario fiscal",
    title: "Calendario fiscal del autónomo",
    description:
      "Fechas de presentación de los modelos trimestrales y anuales que afectan a autónomos y microempresas.",
    intro: "Plazos de presentación de los modelos trimestrales y anuales.",
    icon: "calendar",
  },
  {
    slug: "herramientas",
    name: "Herramientas",
    title: "Calculadoras y herramientas para autónomos",
    description:
      "Calculadoras gratuitas de IVA, IRPF, cuota de autónomos y liquidación trimestral, y buscador de gastos deducibles.",
    intro: "Calculadoras gratuitas que funcionan en tu navegador. No guardamos los datos que introduces.",
    icon: "calculator",
  },
  {
    slug: "guias",
    name: "Guías",
    title: "Guías fiscales para autónomos",
    description:
      "Guías paso a paso sobre situaciones fiscales concretas de autónomos, freelancers y microempresas.",
    intro: "Casos concretos explicados paso a paso.",
    icon: "guide",
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<
  CategorySlug,
  Category
>;

export function isCategorySlug(value: string): value is CategorySlug {
  return value in categoryMap;
}

/** Categorías que se renderizan con la ruta genérica /[category]/ */
export const genericCategorySlugs = categories
  .map((c) => c.slug)
  .filter((s) => !["herramientas", "gastos-deducibles", "calendario-fiscal"].includes(s));

/** Agrupación por problemas que se muestra en la home */
export const problemGroups: { title: string; category: CategorySlug; links: { label: string; href: string }[] }[] = [
  {
    title: "IVA",
    category: "iva",
    links: [
      { label: "Modelo 303 explicado", href: "/modelos-hacienda/modelo-303/" },
      { label: "IVA intracomunitario en servicios digitales", href: "/iva/iva-intracomunitario-servicios-digitales/" },
      { label: "Recargo de equivalencia", href: "/iva/recargo-de-equivalencia/" },
    ],
  },
  {
    title: "IRPF",
    category: "irpf",
    links: [
      { label: "Retención de IRPF en la factura", href: "/irpf/retencion-irpf-factura-autonomo/" },
      { label: "Modelo 130: cómo se rellena", href: "/modelos-hacienda/modelo-130/" },
      { label: "Declarar ingresos de Google AdSense", href: "/guias/declarar-ingresos-google-adsense/" },
    ],
  },
  {
    title: "Facturación",
    category: "facturacion",
    links: [
      { label: "Facturar sin ser autónomo", href: "/facturacion/facturar-sin-ser-autonomo/" },
      { label: "Calculadora de factura con IRPF", href: "/herramientas/calculadora-irpf-factura/" },
    ],
  },
  {
    title: "Gastos deducibles",
    category: "gastos-deducibles",
    links: [
      { label: "Qué puedo deducir siendo autónomo", href: "/gastos-deducibles/que-puedo-deducir-siendo-autonomo/" },
      { label: "Gastos deducibles en teletrabajo", href: "/gastos-deducibles/gastos-deducibles-teletrabajo-autonomo/" },
      { label: "Deducir el coche", href: "/gastos-deducibles/deducir-coche-autonomo/" },
    ],
  },
  {
    title: "Modelos fiscales",
    category: "modelos-hacienda",
    links: [
      { label: "Modelo 111", href: "/modelos-hacienda/modelo-111/" },
      { label: "Modelo 190", href: "/modelos-hacienda/modelo-190/" },
      { label: "Modelo 349", href: "/modelos-hacienda/modelo-349/" },
    ],
  },
  {
    title: "Contabilidad",
    category: "contabilidad",
    links: [{ label: "Amortizar un ordenador", href: "/contabilidad/amortizar-ordenador-autonomo/" }],
  },
  {
    title: "Alta y baja de autónomos",
    category: "autonomos",
    links: [
      { label: "Alta de autónomo paso a paso", href: "/autonomos/alta-autonomo-paso-a-paso/" },
      { label: "Darse de baja como autónomo", href: "/autonomos/darse-de-baja-autonomo/" },
      { label: "Tarifa plana", href: "/autonomos/tarifa-plana-autonomos/" },
    ],
  },
];
