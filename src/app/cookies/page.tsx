import { StaticPage, staticPageMetadata } from "@/components/layout/StaticPage";

export const metadata = staticPageMetadata("cookies");

export default function Page() {
  return <StaticPage slug="cookies" />;
}
