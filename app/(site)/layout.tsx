import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { requireDoc, sanityFetch } from "@/sanity/lib/fetch";
import { navOfferPagesQuery, siteSettingsQuery } from "@/sanity/queries";
import type { NavOfferPage, SiteSettings } from "@/sanity/types";
import { indexingAllowed } from "@/lib/indexing";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = requireDoc(await sanityFetch<SiteSettings | null>({ query: siteSettingsQuery }), "siteSettings");

  return {
    // Bez metadataBase Next nie umie zbudować bezwzględnych adresów dla og:image
    // ani dla linków kanonicznych — a oba muszą być pełnymi URL-ami.
    metadataBase: new URL(siteUrl()),
    title: { default: settings.metaTitle, template: `%s — ${settings.siteName}` },
    description: settings.metaDescription,
    // `robots.txt` tylko prosi roboty, żeby nie wchodziły; `noindex` faktycznie
    // trzyma adres poza indeksem, nawet gdy ktoś podeśle do niego link.
    robots: indexingAllowed ? undefined : { index: false, follow: false },
    // Open Graph i adres kanoniczny ustawia każda strona osobno (lib/seo.ts).
    // Trzymanie ich tutaj sprawiało, że podstrony dziedziczyły og:title strony głównej.
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
