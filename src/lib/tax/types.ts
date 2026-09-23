export interface SourceRef {
  title: string;
  url: string;
}

export interface TaxParam {
  id?: string;
  label: string;
  value: number | null;
  verified: boolean;
  source: SourceRef | null;
}

export interface VatData {
  verified: boolean;
  sources: SourceRef[];
  rates: TaxParam[];
  equivalenceSurcharge: TaxParam[];
}

export interface IrpfData {
  verified: boolean;
  sources: SourceRef[];
  withholdingRates: TaxParam[];
  fractionalPayment: TaxParam;
}

export interface AutonomosBracket {
  from: number | null;
  to: number | null;
  minBase: number;
  maxBase: number;
}

export interface AutonomosData {
  verified: boolean;
  sources: SourceRef[];
  contributionRate: TaxParam;
  genericExpenseDeduction: TaxParam;
  brackets: AutonomosBracket[];
  flatRate: {
    label: string;
    monthlyAmount: number | null;
    months: number | null;
    verified: boolean;
    source: SourceRef | null;
  };
}

export interface Deadline {
  id: string;
  models: string[];
  label: string;
  period: string;
  start: string | null; // ISO yyyy-mm-dd
  end: string | null;
  verified: boolean;
  source: SourceRef | null;
}

export interface DeadlinesData {
  verified: boolean;
  sources: SourceRef[];
  deadlines: Deadline[];
}

export interface TaxMeta {
  year: number;
  lastReviewed: string | null;
  reviewedBy: string | null;
  notes: string;
}

export interface TaxYearData {
  meta: TaxMeta;
  vat: VatData;
  irpf: IrpfData;
  autonomos: AutonomosData;
  deadlines: DeadlinesData;
}
