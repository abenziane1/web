import { test } from "node:test";
import assert from "node:assert/strict";
import { parseAmount, percentOf, toCents } from "../src/lib/calculators/money.ts";
import { vatFromBase, vatFromTotal } from "../src/lib/calculators/vat.ts";
import { invoiceWithWithholding } from "../src/lib/calculators/invoice.ts";
import { quarterlyVat } from "../src/lib/calculators/quarterly-vat.ts";
import { autonomosFee } from "../src/lib/calculators/autonomos.ts";

// Los porcentajes de estos tests son valores de prueba arbitrarios, no parámetros fiscales.

test("parseAmount acepta formatos españoles e ingleses", () => {
  assert.equal(parseAmount("1.234,56"), 1234.56);
  assert.equal(parseAmount("1234.56"), 1234.56);
  assert.equal(parseAmount("1,5"), 1.5);
  assert.equal(parseAmount("1.000.000"), 1000000);
  assert.equal(parseAmount("abc"), null);
  assert.equal(parseAmount(""), null);
});

test("redondeo en céntimos", () => {
  assert.equal(toCents(0.1 + 0.2), 30);
  assert.equal(percentOf(1005, 50), 503);
});

test("IVA directo e inverso son coherentes", () => {
  const a = vatFromBase(100, 20);
  assert.deepEqual(a, { base: 10000, vat: 2000, total: 12000 });
  const b = vatFromTotal(120, 20);
  assert.deepEqual(b, { base: 10000, vat: 2000, total: 12000 });
  const c = vatFromTotal(99.99, 7);
  assert.equal(c.base + c.vat, c.total);
});

test("factura con retención", () => {
  const r = invoiceWithWithholding(1000, 20, 10);
  assert.equal(r.vat, 20000);
  assert.equal(r.withholding, 10000);
  assert.equal(r.totalInvoice, 120000);
  assert.equal(r.netToReceive, 110000);
});

test("IVA trimestral", () => {
  assert.equal(quarterlyVat(1000, 400, 100).result, 50000);
  assert.equal(quarterlyVat(100, 400, 0).outcome, "a_compensar_o_devolver");
  assert.equal(quarterlyVat(100, 100, 0).outcome, "cero");
});

test("cuota de autónomos sin configuración informa de datos pendientes", () => {
  const empty = {
    verified: false,
    sources: [],
    contributionRate: { label: "tipo", value: null, verified: false, source: null },
    genericExpenseDeduction: { label: "gastos", value: null, verified: false, source: null },
    brackets: [],
    flatRate: { label: "tp", monthlyAmount: null, months: null, verified: false, source: null },
  };
  const r = autonomosFee(empty, 30000, 5000);
  assert.equal(r.status, "missing_config");
});

test("cuota de autónomos con configuración ficticia de prueba", () => {
  const fake = {
    verified: true,
    sources: [],
    contributionRate: { label: "tipo", value: 10, verified: true, source: null },
    genericExpenseDeduction: { label: "gastos", value: 0, verified: true, source: null },
    brackets: [
      { from: null, to: 1000, minBase: 500, maxBase: 800 },
      { from: 1000.01, to: null, minBase: 900, maxBase: 2000 },
    ],
    flatRate: { label: "tp", monthlyAmount: null, months: null, verified: false, source: null },
  };
  const r = autonomosFee(fake, 24000, 0);
  assert.equal(r.status, "ok");
  if (r.status === "ok") {
    assert.equal(r.bracketIndex, 1);
    assert.equal(r.monthlyFee, 9000);
  }
});
