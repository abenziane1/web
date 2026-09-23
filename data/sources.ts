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
];

export const sourceMap = Object.fromEntries(officialSources.map((s) => [s.id, s])) as Record<string, OfficialSource>;
