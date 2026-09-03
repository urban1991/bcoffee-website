import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { sitemapQuery } from "@/sanity/queries";
import type { SitemapData } from "@/sanity/types";
import { indexingAllowed } from "@/lib/indexing";
import { absoluteUrl } from "@/lib/site-url";
import { routes } from "@/lib/routes";
import { regulamin } from "./(site)/regulamin-strony/content";
import { politykaPrywatnosci } from "./(site)/polityka-prywatnosci/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dopóki `robots.txt` zwraca `Disallow: /`, mapa nie ma czego zapowiadać — a nie ma
  // powodu wystawiać pod znanym adresem spisu wszystkich podstron wersji roboczej.
  if (!indexingAllowed) return [];

  const dane = await sanityFetch<SitemapData | null>({ query: sitemapQuery });
  const strony = dane?.pages ?? [];

  const glowna = najnowsza(dane?.home ?? []);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: glowna ? new Date(glowna) : new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...strony.map((s) => ({
      url: absoluteUrl(`/${s.slug}`),
      lastModified: new Date(s._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Regulamin i polityka mają treść w repozytorium, więc datę biorą z samego
    // dokumentu, a nie z Sanity. Niski priorytet: mają być do znalezienia, ale nie
    // konkurować w wynikach z ofertą.
    ...[
      { path: routes.terms, doc: regulamin },
      { path: routes.privacy, doc: politykaPrywatnosci },
    ].map(({ path, doc }) => ({
      url: absoluteUrl(path),
      lastModified: new Date(doc.effectiveFrom),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

/** Daty z Sanity są w ISO 8601 ze stałą strefą, więc porównanie tekstów wystarcza. */
function najnowsza(daty: string[]): string | undefined {
  return daty.reduce<string | undefined>((max, d) => (!max || d > max ? d : max), undefined);
}
