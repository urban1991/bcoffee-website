import type { Metadata } from "next";
import { LegalScreen } from "@/components/site/LegalScreen";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { FALLBACK_SITE_NAME, pageMetadata } from "@/lib/seo";
import { regulamin } from "./content";

export async function generateMetadata(): Promise<Metadata> {
  // Bez `requireDoc` i z przechwyconym błędem, inaczej niż na pozostałych stronach.
  // Cała treść regulaminu leży w repozytorium, a z Sanity bierzemy jedną rzecz —
  // nazwę firmy do `og:site_name`. Niedostępny CMS nie może wywalić akurat tego
  // dokumentu, który z definicji ma być dostępny zawsze.
  const settings = await sanityFetch<SiteSettings | null>({ query: siteSettingsQuery }).catch(() => null);

  return pageMetadata({
    title: regulamin.title,
    description: regulamin.description,
    path: "/regulamin-strony",
    siteName: settings?.siteName ?? FALLBACK_SITE_NAME,
  });
}

export default function Page() {
  return (
    <main>
      <LegalScreen doc={regulamin} />
    </main>
  );
}
