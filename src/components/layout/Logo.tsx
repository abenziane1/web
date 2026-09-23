import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-semibold text-ink" aria-label={`${siteConfig.name}, inicio`}>
      {siteConfig.logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={siteConfig.logoSrc} alt="" width={32} height={32} className="h-8 w-8" />
      ) : (
        <span
          aria-hidden="true"
          className="grid h-8 w-8 place-items-center rounded-[6px] bg-ink text-[13px] font-bold tracking-tight text-white"
        >
          {siteConfig.logoMark}
        </span>
      )}
      <span className="text-[17px] tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}
