import { StaticPage, staticPageMetadata } from "@/components/layout/StaticPage";

export const metadata = staticPageMetadata("sobre-nosotros");

export default function Page() {
  return <StaticPage slug="sobre-nosotros" />;
}
