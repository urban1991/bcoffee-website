import type { Metadata } from "next";
import { HomeScreen } from "@/components/site/HomeScreen";
import { ContactSection } from "@/components/site/ContactSection";
import { requireDoc, sanityFetch } from "@/sanity/lib/fetch";
import { contactSectionQuery, homePageQuery, siteSettingsQuery } from "@/sanity/queries";
import type { ContactSection as ContactSectionData, HomePageData, SiteSettings } from "@/sanity/types";
import { jsonLdScript, localBusinessJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([
    sanityFetch<HomePageData | null>({ query: homePageQuery }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery }),
  ]);
  const s = requireDoc(settings, "siteSettings");

  return pageMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: "/",
    photo: home?.page?.heroPhoto,
    siteName: s.siteName,
  });
}

export default async function Page() {
  const [home, contact, settings] = await Promise.all([
    sanityFetch<HomePageData | null>({ query: homePageQuery }),
    sanityFetch<ContactSectionData | null>({ query: contactSectionQuery }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery }),
  ]);

  const s = requireDoc(settings, "siteSettings");

  return (
    <main>
      {/* Dane strukturalne wystawiamy tylko tutaj — jedna firma, jeden wpis.
          Powtarzanie ich na podstronach nic nie wnosi, a Google traktuje to jak duplikat. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(localBusinessJsonLd(s)) }}
      />
      <HomeScreen page={requireDoc(home?.page, "homePage")} offers={home?.offers ?? []} settings={s} />
      <ContactSection data={requireDoc(contact, "contactSection")} settings={s} />
    </main>
  );
}
