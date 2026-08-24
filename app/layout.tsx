import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Archivo } from "next/font/google";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { site } from "@/lib/site-config";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display-family",
  display: "swap",
});


const hand = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hand-family",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "B. Coffee — kawiarnia na kółkach na eventy, targi i wesela",
    template: "%s — B. Coffee",
  },
  description:
    "Mobilna kawiarnia i barista na Wasze wydarzenie. Targi, event firmowy, wesele — przyjeżdżamy z barem, ekspresem i dobrym humorem.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: site.name,
    title: "B. Coffee — kawa, która robi imprezę",
    description: "Mobilna kawiarnia i barista na Wasze wydarzenie. Targi, event firmowy, wesele.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f2e6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${display.variable} ${hand.variable} ${body.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
