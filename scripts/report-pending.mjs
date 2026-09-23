/**
 * Informe de todo lo que requiere datos reales antes de publicar.
 * Uso: npm run check:pending
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
let total = 0;
const out = (s) => console.log(s);

out("== Parámetros fiscales (/data/tax) ==");
for (const year of fs.readdirSync(path.join(root, "data/tax")).sort()) {
  const dir = path.join(root, "data/tax", year);
  const missing = [];
  const walk = (obj, trail) => {
    if (Array.isArray(obj)) return obj.forEach((o, i) => walk(o, `${trail}[${o?.id ?? i}]`));
    if (obj && typeof obj === "object") {
      if ("verified" in obj && obj.verified !== true && ("value" in obj || "start" in obj || "monthlyAmount" in obj)) missing.push(`${trail} ${obj.label ? `(${obj.label})` : ""}`);
      for (const [k, v] of Object.entries(obj)) if (k !== "_schema") walk(v, `${trail}.${k}`);
    }
  };
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "meta.json")) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    walk(data, f.replace(".json", ""));
    if (Array.isArray(data.brackets) && data.brackets.length === 0) missing.push(`${f}: brackets vacío (tramos de cotización)`);
  }
  out(`\n${year}: ${missing.length} parámetros sin verificar`);
  missing.forEach((m) => out(`  - ${m}`));
  total += missing.length;
}

out("\n== Contenidos con marcas pendientes o en borrador ==");
const scan = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p);
    else if (/\.mdx?$/.test(e.name)) {
      const s = fs.readFileSync(p, "utf8");
      const marks = (s.match(/<Pendiente|PENDIENTE/g) ?? []).length;
      const draft = /^draft: true/m.test(s);
      if (marks || draft) {
        out(`  - ${path.relative(root, p)}: ${marks} marcas${draft ? ", draft" : ""}`);
        total += marks;
      }
    }
  }
};
scan(path.join(root, "content"));

out("\n== Fichas de gastos sin verificar ==");
const exDir = path.join(root, "data/expenses");
let pendingExpenses = 0;
for (const f of fs.readdirSync(exDir).filter((f) => f.endsWith(".json"))) {
  for (const e of JSON.parse(fs.readFileSync(path.join(exDir, f), "utf8"))) if (e.status !== "verificado") pendingExpenses++;
}
out(`  ${pendingExpenses} fichas con status pendiente_verificacion`);

out("\n== Otros ==");
out("  - data/authors.ts: autores y revisores son placeholders");
out("  - src/config/site.ts: organization.legalName / email");
out("  - data/tax-models.ts: periodicity = null en todos los modelos");
out(`\nTotal de elementos pendientes: ${total + pendingExpenses}`);
