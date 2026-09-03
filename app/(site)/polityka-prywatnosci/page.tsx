import type { Metadata } from "next";
import { LegalScreen } from "@/components/site/LegalScreen";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { FALLBACK_SITE_NAME, pageMetadata } from "@/lib/seo";
import { politykaPrywatnosci } from "./content";

export async function generateMetadata(): Promise<Metadata> {
  // Patrz komentarz w regulamin-strony/page.tsx: dokument prawny nie może przestać
  // się budować dlatego, że CMS jest chwilowo nieosiągalny.
  const settings = await sanityFetch<SiteSettings | null>({ query: siteSettingsQuery }).catch(() => null);

  return pageMetadata({
    title: politykaPrywatnosci.title,
    description: politykaPrywatnosci.description,
    path: "/polityka-prywatnosci",
    siteName: settings?.siteName ?? FALLBACK_SITE_NAME,
  });
}

export default function Page() {
  return (
    <main>
      <LegalScreen doc={politykaPrywatnosci} />
    </main>
  );
}
