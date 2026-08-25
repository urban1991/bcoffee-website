import { HomeScreen } from "@/components/site/HomeScreen";
import { ContactSection } from "@/components/site/ContactSection";
import { requireDoc, sanityFetch } from "@/sanity/lib/fetch";
import { contactSectionQuery, homePageQuery, siteSettingsQuery } from "@/sanity/queries";
import type { ContactSection as ContactSectionData, HomePageData, SiteSettings } from "@/sanity/types";

export default async function Page() {
  const [home, contact, settings] = await Promise.all([
    sanityFetch<HomePageData | null>({ query: homePageQuery }),
    sanityFetch<ContactSectionData | null>({ query: contactSectionQuery }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery }),
  ]);

  return (
    <main>
      <HomeScreen page={requireDoc(home?.page, "homePage")} offers={home?.offers ?? []} settings={requireDoc(settings, "siteSettings")} />
      <ContactSection data={requireDoc(contact, "contactSection")} settings={requireDoc(settings, "siteSettings")} />
    </main>
  );
}
