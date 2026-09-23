import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { analyticsConfig } from "@/lib/analytics";

const publicSans = localFont({
  src: "../../node_modules/@fontsource-variable/public-sans/files/public-sans-latin-wght-normal.woff2",
  variable: "--font-public-sans",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name}: ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false },
  ...(analyticsConfig.gscVerification ? { verification: { google: analyticsConfig.gscVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: siteConfig.colors.ink,
  width: "device-width",
  initialScale: 1,
};

const brandVars = {
  "--brand-ink": siteConfig.colors.ink,
  "--brand-ink-soft": siteConfig.colors.inkSoft,
  "--brand-accent": siteConfig.colors.accent,
  "--brand-pending": siteConfig.colors.pending,
  "--brand-surface": siteConfig.colors.surface,
  "--brand-line": siteConfig.colors.line,
} as React.CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.language} className={publicSans.variable} style={brandVars}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Analytics />
      </body>
    </html>
  );
}
