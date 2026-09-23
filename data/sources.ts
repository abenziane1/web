/**
 * Registro de fuentes oficiales. Los artículos las referencian por id en su
 * frontmatter (sources: [aeat-sede, boe-ley-iva]). Verificar las URLs antes de publicar.
 */
export interface OfficialSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
}

export const officialSources: OfficialSource[] = [
  { id: "aeat-sede", title: "Sede electrónica de la Agencia Tributaria", publisher: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es/" },
  { id: "aeat-web", title: "Agencia Tributaria", publisher: "Agencia Tributaria", url: "https://www.agenciatributaria.es/" },
  { id: "seg-social", title: "Seguridad Social", publisher: "Seguridad Social", url: "https://www.seg-social.es/" },
  { id: "import-sede-ss", title: "Sede electrónica de la Seguridad Social (Import@ss)", publisher: "Seguridad Social", url: "https://portal.seg-social.gob.es/" },
  { id: "boe", title: "Boletín Oficial del Estado", publisher: "BOE", url: "https://www.boe.es/" },
  { id: "boe-ley-iva", title: "Ley 37/1992, del Impuesto sobre el Valor Añadido", publisher: "BOE", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740" },
  { id: "boe-ley-irpf", title: "Ley 35/2006, del Impuesto sobre la Renta de las Personas Físicas", publisher: "BOE", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764" },
  { id: "boe-reglamento-irpf", title: "Real Decreto 439/2007, Reglamento del IRPF", publisher: "BOE", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-6820" },
  { id: "boe-reglamento-facturacion", title: "Real Decreto 1619/2012, Reglamento de facturación", publisher: "BOE", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2012-14696" },
  { id: "boe-leta", title: "Ley 20/2007, del Estatuto del trabajo autónomo", publisher: "BOE", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-13409" },
  { id: "boe-orden-cotizacion-2026", title: "Orden PJC/297/2026, normas de cotización a la Seguridad Social para 2026", publisher: "BOE", url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-7296" },
  { id: "ss-guia-autonomos", title: "Guía práctica de trabajo autónomo", publisher: "Seguridad Social", url: "https://portal.seg-social.gob.es/wps/portal/importass/importass/Colectivos/Trabajo+Autonomo/guia" },
  { id: "aeat-calendario-2026", title: "Calendario del contribuyente 2026", publisher: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026.html" },
  { id: "aeat-retenciones", title: "Manual de actividades económicas: retenciones", publisher: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/folleto-actividades-economicas/7-otras-obligaciones-fiscales-retenciones.html" },
  { id: "aeat-pagos-fraccionados", title: "Manual de actividades económicas: pagos fraccionados", publisher: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/folleto-actividades-economicas/3-impuesto-sobre-renta-personas-fisicas/3_7-pagos-fraccionados.html" },
  { id: "aeat-tipos-iva", title: "Tipos impositivos de IVA", publisher: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html" },
  { id: "aeat-recargo-equivalencia", title: "Régimen especial del recargo de equivalencia", publisher: "Agencia Tributaria", url: "https://sede.agenciatributaria.gob.es/Sede/iva/regimenes-tributacion-iva/regimen-especial-recargo-equivalencia/que-consiste-regimen-especial-recargo-equivalencia.html" },
  { id: "boe-lgt", title: "Ley 58/2003, General Tributaria", publisher: "BOE", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186" },
];

export const sourceMap = Object.fromEntries(officialSources.map((s) => [s.id, s])) as Record<string, OfficialSource>;
