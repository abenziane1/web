import Link from "next/link";
import type { Tool } from "@data/tools";
import { Icon } from "@/components/ui/Icon";

export function CalculatorCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/herramientas/${tool.slug}/`}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 hover:border-ink"
    >
      <span className="grid h-10 w-10 place-items-center rounded-md bg-ink text-white">
        <Icon name={tool.icon} />
      </span>
      <span className="mt-4 font-semibold text-ink group-hover:underline">{tool.name}</span>
      <span className="mt-1.5 text-sm leading-relaxed text-muted">{tool.description}</span>
    </Link>
  );
}
