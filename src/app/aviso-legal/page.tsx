import { StaticPage, staticPageMetadata } from "@/components/layout/StaticPage";

export const metadata = staticPageMetadata("aviso-legal");

export default function Page() {
  return <StaticPage slug="aviso-legal" />;
}
