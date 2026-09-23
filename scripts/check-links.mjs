/**
 * Rastrea el sitio desde la home y comprueba:
 *  - enlaces internos rotos (status != 200)
 *  - <title>, meta description, canonical y un único <h1> por página
 *  - atributo lang, imágenes sin alt, JSON-LD válido
 * Uso: npm run build && npm start (en otra terminal) && npm run check:links
 *      BASE_URL=https://mi-dominio.es npm run check:links
 */
const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const seen = new Set();
const queue = ["/", "/sitemap.xml", "/robots.txt", "/pagina-que-no-existe/"];
const problems = [];
let pages = 0;

const attr = (tag, name) => new RegExp(`${name}="([^"]*)"`).exec(tag)?.[1];

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await fetch(BASE + path, { redirect: "manual" });
  if (path === "/pagina-que-no-existe/") {
    if (res.status !== 404) problems.push(`404 personalizada devuelve ${res.status}`);
    continue;
  }
  if (res.status !== 200) {
    problems.push(`${res.status} ${path}`);
    continue;
  }
  const type = res.headers.get("content-type") ?? "";
  const body = await res.text();
  if (!type.includes("text/html")) continue;
  pages++;

  const title = /<title>([^<]*)<\/title>/.exec(body)?.[1];
  const desc = /<meta name="description" content="([^"]*)"/.exec(body)?.[1];
  const canonical = /<link rel="canonical" href="([^"]*)"/.exec(body)?.[1];
  const h1s = (body.match(/<h1[\s>]/g) ?? []).length;
  if (!title) problems.push(`sin <title>: ${path}`);
  else if (title.length > 70) problems.push(`title largo (${title.length}): ${path}`);
  if (!desc) problems.push(`sin meta description: ${path}`);
  else if (desc.length > 170) problems.push(`description larga (${desc.length}): ${path}`);
  if (!canonical) problems.push(`sin canonical: ${path}`);
  if (h1s !== 1) problems.push(`${h1s} <h1> en ${path}`);
  if (!/<html lang="es"/.test(body)) problems.push(`sin lang: ${path}`);
  for (const img of body.match(/<img [^>]*>/g) ?? []) if (attr(img, "alt") === undefined) problems.push(`img sin alt: ${path}`);
  for (const m of body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { problems.push(`JSON-LD inválido: ${path}`); }
  }
  for (const m of body.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
    const href = m[1];
    if (href.startsWith("/_next") || /\.(css|js|svg|png|ico|woff2)$/.test(href)) continue;
    if (!seen.has(href)) queue.push(href);
  }
}

console.log(`Páginas HTML revisadas: ${pages}`);
if (problems.length) {
  console.log(`\n${problems.length} problemas:`);
  for (const p of problems) console.log(" - " + p);
  process.exit(1);
}
console.log("Sin problemas.");
