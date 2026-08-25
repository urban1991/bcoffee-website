import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferPageScreen } from "@/components/site/OfferPageScreen";
import { ContactSection } from "@/components/site/ContactSection";
import { requireDoc, sanityFetch } from "@/sanity/lib/fetch";
import { contactSectionQuery, offerPageQuery, offerPageSlugsQuery, siteSettingsQuery } from "@/sanity/queries";
import type { ContactSection as ContactSectionData, OfferPage, SiteSettings } from "@/sanity/types";

/** Wszystkie podstrony ofertowe prerenderujemy — jest ich kilka i się nie zmieniają często. */
export async function generateStaticParams() {
  const slugs = await sanityFetch<string[] | null>({ query: offerPageSlugsQuery });
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await sanityFetch<OfferPage | null>({ query: offerPageQuery, params: { slug } });
  if (!page) return {};

  return {
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? undefined,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  /**
   * Najpierw sama podstrona, dopiero potem reszta. Nieznany adres kończy się więc
   * na jednym zapytaniu zamiast trzech — a takich adresów nikt nie ogranicza,
   * bo `dynamicParams` musi zostać włączone: `generateStaticParams` wykonuje się
   * przy budowaniu, więc podstrona dodana w Studio po deployu byłaby inaczej
   * nieosiągalna aż do kolejnego wdrożenia.
   */
  const page = await sanityFetch<OfferPage | null>({ query: offerPageQuery, params: { slug } });
  if (!page) notFound();

  const [contact, settings] = await Promise.all([
    sanityFetch<ContactSectionData | null>({ query: contactSectionQuery }),
    sanityFetch<SiteSettings | null>({ query: siteSettingsQuery }),
  ]);

  return (
    <main>
      <OfferPageScreen page={page} />
      <ContactSection data={requireDoc(contact, "contactSection")} settings={requireDoc(settings, "siteSettings")} />
    </main>
  );
}
