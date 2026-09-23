import { type Cents, percentOf, toCents } from "./money.ts";

export interface InvoiceResult {
  base: Cents;
  vat: Cents;
  withholding: Cents;
  /** Base + IVA */
  totalInvoice: Cents;
  /** Base + IVA − retención: lo que efectivamente cobras */
  netToReceive: Cents;
}

export function invoiceWithWithholding(
  baseEuros: number,
  vatPercent: number,
  withholdingPercent: number,
): InvoiceResult {
  const base = toCents(baseEuros);
  const vat = percentOf(base, vatPercent);
  const withholding = percentOf(base, withholdingPercent);
  const totalInvoice = base + vat;
  return { base, vat, withholding, totalInvoice, netToReceive: totalInvoice - withholding };
}
