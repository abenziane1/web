import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Texto editorial opcional que acompaña a una landing (categoría, herramienta,
 * calendario...). Vive en content/secciones/<clave>.mdx. Si no existe, null.
 */
export function getSectionText(key: string): string | null {
  const file = path.join(process.cwd(), "content", "secciones", `${key}.mdx`);
  if (!fs.existsSync(file)) return null;
  return matter(fs.readFileSync(file, "utf8")).content.trim() || null;
}
