import { StaticPage, staticPageMetadata } from "@/components/layout/StaticPage";

export const metadata = staticPageMetadata("fuentes");

export default function Page() {
  return <StaticPage slug="fuentes" />;
}
