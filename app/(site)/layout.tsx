import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { requireDoc, sanityFetch } from "@/sanity/lib/fetch";
import { navOfferPagesQuery, siteSettingsQuery } from "@/sanity/queries";
import type { NavOfferPage, SiteSettings } from "@/sanity/types";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = requireDoc(await sanityFetch<SiteSettings | null>({ query: siteSettingsQuery }), "siteSettings");

  return {
    title: { default: settings.metaTitle, template: `%s — ${settings.siteName}` },
    description: settings.metaDescription,
    openGraph: {
      type: "website",
      locale: "pl_PL",
      siteName: settings.siteName,
      title: settings.metaTitle,
      description: settings.metaDescription,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f2e6",
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, offerPages] = await Promise.all([
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery }),
    sanityFetch<NavOfferPage[]>({ query: navOfferPagesQuery }),
  ]);

  return (
    <>
      <SiteHeader settings={requireDoc(settings, "siteSettings")} offerPages={offerPages ?? []} />
      {children}
      <SiteFooter settings={requireDoc(settings, "siteSettings")} offerPages={offerPages ?? []} />
    </>
  );
}
