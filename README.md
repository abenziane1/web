# FiscalAutónomo

Portal de contenidos, herramientas y calculadoras de fiscalidad para autónomos, freelancers y microempresas en España.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · MDX · desplegable en Vercel.

> **Estado:** primera versión funcional. Todos los parámetros fiscales están vacíos y todos los artículos son borradores (`draft: true`, `noindex`). Antes de publicar hay que completar los datos marcados como pendientes: ejecuta `npm run check:pending` para ver la lista.

---

## Instalación

Requisitos: Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local   # opcional en local
npm run dev                  # http://localhost:3000
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (genera todas las páginas estáticas) |
| `npm start` | Sirve el build de producción |
| `npm run typecheck` | Comprobación de TypeScript |
| `npm test` | Tests de la lógica de las calculadoras |
| `npm run check:links` | Rastrea el sitio (requiere `npm start` en otra terminal): enlaces rotos, title, description, canonical, h1, alt, JSON-LD y 404 |
| `npm run check:pending` | Lista todo lo que falta verificar antes de publicar |

## Producción (Vercel)

1. Sube el repositorio a GitHub/GitLab e impórtalo en Vercel (detecta Next.js automáticamente).
2. En *Settings → Environment Variables* define al menos `NEXT_PUBLIC_SITE_URL` con el dominio final, sin barra al final.
3. Despliega. Las URLs de *preview* de Vercel se bloquean en `robots.txt` para no indexarse.

Fuera de Vercel: `npm run build && npm start` en cualquier servidor con Node.

---

## Estructura del proyecto

```
content/
  articles/<categoria>/<slug>.mdx   Artículos (una carpeta por categoría)
  pages/*.mdx                       Páginas de confianza y legales
data/
  tax/<año>/                        Parámetros fiscales por año (JSON)
    meta.json vat.json irpf.json autonomos.json deadlines.json
  expenses/                         Fichas de gastos deducibles (un JSON por categoría)
  tools.ts                          Registro de herramientas/calculadoras
  tax-models.ts                     Modelos de Hacienda (303, 130, 111...)
  sources.ts                        Fuentes oficiales citables
  authors.ts                        Autores y revisores
scripts/                            check-links.mjs, report-pending.mjs
tests/                              Tests de calculadoras
src/
  config/                           site.ts (marca), categories.ts, navigation.ts, redirects.ts, ads.ts
  app/                              Rutas (App Router)
  components/                       layout, ui, article, calculators, tax, search, ads, analytics, seo
  lib/
    calculators/                    Lógica pura de cálculo (sin React, testeable)
    tax/                            Registro de años fiscales
    content/                        Carga de MDX y frontmatter
    seo/                            Metadata y JSON-LD
    search/                         Índice y proveedor de búsqueda
```

## Cambiar marca, dominio, logo y colores

Todo está en `src/config/site.ts`: nombre, `logoMark` (logotipo tipográfico) o `logoSrc` (SVG en `/public`), colores (se inyectan como variables CSS en toda la web), razón social y email. El dominio se toma de `NEXT_PUBLIC_SITE_URL`.

---

## Cómo añadir un artículo

1. Crea `content/articles/<categoria>/<slug>.mdx`. La categoría es la carpeta y debe existir en `src/config/categories.ts`.
2. Usa este frontmatter (copia uno existente como base):

```yaml
---
title: "Título (máx. ~60 caracteres)"
description: "Meta description (120-160 caracteres)"
slug: "mi-articulo"
published: "2026-09-23"
updated: "2026-09-23"
reviewedAt: null            # fecha de revisión profesional: "2026-10-01"
author: "redaccion"         # id de data/authors.ts
reviewer: null              # id de data/authors.ts
draft: true                 # true = noindex y fuera del sitemap
featured: false             # aparece en "Guías más consultadas"
tool: null                  # slug de herramienta relacionada, p. ej. "calculadora-iva"
keywords: ["..."]
sources: ["aeat-sede"]      # ids de data/sources.ts
quickAnswer: "Respuesta rápida en 2-3 frases."
steps: [{ "title": "Paso", "text": "Detalle" }]
commonMistakes: ["..."]
faq: [{ "q": "Pregunta", "a": "Respuesta" }]   # genera FAQPage schema
related: ["/iva/otro-articulo/"]
---
```

3. Escribe el cuerpo en Markdown. Los `##` y `###` forman el índice automáticamente. Componentes disponibles:
   - `<Pendiente />` marca visible de dato pendiente de verificación.
   - `<Nota>…</Nota>` caja de aviso.
   - `<ToolLink slug="calculadora-iva" />` enlace destacado a una herramienta.
   - `<AdSlot position="mid-article" />` hueco publicitario.
   - Tablas GFM normales.

El artículo aparece automáticamente en su categoría, en el buscador, en el sitemap (cuando `draft: false`) y con su JSON-LD (Article, BreadcrumbList y FAQPage si tiene `faq`). Las categorías paginan a partir de 24 artículos (`/categoria/pagina/2/`).

**Publicar:** quita todas las marcas `<Pendiente />` y `[DATOS PENDIENTES DE VERIFICACIÓN]`, rellena `reviewer` y `reviewedAt`, y pon `draft: false`. Si quieres indexar borradores temporalmente, `indexDrafts` en `site.ts` (no recomendado).

## Cómo añadir un gasto deducible

Añade un objeto al JSON de su categoría en `data/expenses/` (ver tipo `Expense` en `data/expenses/types.ts`). Aparece en el comprobador y en el buscador. Solo se genera página propia `/gastos-deducibles/<slug>/` si el campo `body` tiene contenido propio, para no crear páginas vacías. Deja `irpf`/`iva` en `null` y `status: "pendiente_verificacion"` hasta verificarlo.

## Cómo añadir una calculadora

1. Lógica pura en `src/lib/calculators/<nombre>.ts` (trabaja en céntimos enteros con `money.ts`) y un test en `tests/`.
2. Componente cliente en `src/components/calculators/<Nombre>Calculator.tsx` usando las primitivas de `primitives.tsx` (campos, resultado en formato liquidación) y los eventos `calculator_started` / `calculator_completed`.
3. Regístrala en `data/tools.ts` (título, descripción, FAQ, artículos relacionados) y en `src/components/calculators/registry.tsx`.

La página `/herramientas/<slug>/` se genera sola, con WebApplication schema. Cada calculadora se carga en su propio chunk.

## Cómo actualizar parámetros fiscales

Los componentes no contienen ningún tipo, tramo ni fecha: todo se lee de `data/tax/<año>/`.

- Cada valor tiene `value`, `verified` y `source`. **Una calculadora solo usa un valor si `verified: true` y `value` es numérico.** Si falta, muestra el aviso de datos pendientes.
- Porcentajes como número (`21` = 21 %). Fechas en ISO (`"2026-04-01"`).
- Rellena `source` con la URL oficial (BOE, AEAT, Seguridad Social) y `meta.json` con `lastReviewed` y `reviewedBy`.
- Esquema de tramos de autónomos: ver `_schema` en `autonomos.json`.

Año nuevo: copia la carpeta del año anterior, actualiza los valores, regístrala en `src/lib/tax/index.ts` y cambia `defaultTaxYear` en `site.ts`.

---

## Analytics y Search Console

Variables de entorno (en `.env.local` o en Vercel):

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GSC_VERIFICATION=valor-del-meta
```

GA4 se carga solo si hay ID, con Consent Mode v2 (denegado por defecto hasta que el usuario acepta en el banner de cookies). Eventos enviados: `calculator_started`, `calculator_completed`, `search_used`, `article_view`, `related_article_click`, `outbound_click`. Se definen en `src/lib/analytics.ts`.

Search Console: con la variable anterior se añade el meta de verificación; después envía `https://tu-dominio/sitemap.xml`.

## AdSense

1. Define `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX`.
2. Pon los IDs de bloque en `src/config/ads.ts`. Un hueco sin ID no se renderiza.
3. Crea `public/ads.txt` con la línea que te indique AdSense.
4. Ubicaciones disponibles: `after-intro`, `mid-article`, `after-calculator`, `end-article`, `sidebar` (solo desktop).

Cada hueco reserva su alto (sin CLS) y lleva la etiqueta "Publicidad". Para maquetar sin anuncios: `NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true`.

**Importante:** para servir anuncios en el EEE Google exige una CMP certificada compatible con TCF v2.2. El banner incluido gestiona Consent Mode para GA4, pero antes de activar AdSense debes sustituirlo o complementarlo con una CMP certificada.

## Buscador

Índice local generado en build (`src/lib/search/build-index.ts`) sobre artículos, modelos, herramientas y gastos. `/buscar/?q=` funciona sin JavaScript. La interfaz `SearchProvider` (`src/lib/search/types.ts`) permite cambiarlo por Algolia, Meilisearch o búsqueda semántica sin tocar los componentes.

## Redirecciones

En `src/config/redirects.ts` (301 permanentes).
