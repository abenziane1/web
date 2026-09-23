import { StaticPage, staticPageMetadata } from "@/components/layout/StaticPage";

export const metadata = staticPageMetadata("contacto");

export default function Page() {
  return <StaticPage slug="contacto" />;
}
