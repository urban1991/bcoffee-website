import type { MetadataRoute } from "next";
import { indexingAllowed } from "@/lib/indexing";
import { absoluteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    // Bez ukośnika na końcu: reguły robots.txt dopasowują się prefiksem, więc
    // "/studio" zamyka i sam panel, i wszystko pod nim. Z "/studio/" samo "/studio"
    // zostawało otwarte.
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    // Bez tego mapa strony istnieje, ale nikt jej nie znajdzie poza ręcznym
    // zgłoszeniem w Search Console.
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
