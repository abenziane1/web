import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentProps, ReactNode } from "react";
import { slugify } from "@/lib/content/slugify";
import { Pending } from "@/components/ui/Pending";
import { AdSlot } from "@/components/ads/AdSlot";
import { toolMap } from "@data/tools";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) return textOf((node as { props: { children?: ReactNode } }).props.children);
  return "";
}

function A({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener" target="_blank" {...rest}>
      {children}
    </a>
  );
}

/** Enlace a una herramienta del registro: <ToolLink slug="calculadora-iva">texto</ToolLink> */
function ToolLink({ slug, children }: { slug: string; children?: ReactNode }) {
  const tool = toolMap[slug];
  if (!tool) throw new Error(`ToolLink: herramienta desconocida "${slug}"`);
  return <Link href={`/herramientas/${slug}/`}>{children ?? tool.name}</Link>;
}

function Nota({ children }: { children: ReactNode }) {
  return <div className="not-prose my-6 rounded-md border-l-4 border-ink-soft bg-surface px-4 py-3 text-[15px] leading-relaxed text-text">{children}</div>;
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  h3: ({ children }: { children?: ReactNode }) => <h3 id={slugify(textOf(children))}>{children}</h3>,
  a: A,
  Pendiente: Pending,
  Pending,
  ToolLink,
  Nota,
  AdSlot,
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, blockJS: true, blockDangerousJS: true }}
    />
  );
}
