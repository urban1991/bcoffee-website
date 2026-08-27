/**
 * Bazowy adres serwisu — potrzebny do `metadataBase`, adresów kanonicznych,
 * `og:url` i mapy strony. Wszystkie one muszą być bezwzględne.
 *
 * Kolejność źródeł:
 *   1. SITE_URL — ustawiane ręcznie, wygrywa zawsze. Po podpięciu bcoffee.pl
 *      wpisz je tutaj, żeby kanoniczne adresy wskazywały domenę, a nie adres roboczy.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel podaje tu domenę produkcyjną.
 *      W przeciwieństwie do VERCEL_URL nie zmienia się przy każdym deployu,
 *      więc podglądy nie generują własnych adresów kanonicznych.
 *   3. localhost — tylko lokalnie.
 *
 * Bez prefiksu NEXT_PUBLIC_, tak samo jak ALLOW_INDEXING: czytają to wyłącznie
 * `generateMetadata`, `sitemap.ts` i `robots.ts`, wszystkie po stronie serwera.
 */
export function siteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) return normalizeBase(explicit, "SITE_URL");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return normalizeBase(vercel, "VERCEL_PROJECT_PRODUCTION_URL");

  return "http://localhost:3000";
}

/**
 * Domyślamy się schematu, bo Vercel podaje samą domenę, a i ręcznie łatwiej wpisać
 * „bcoffee.pl" niż „https://bcoffee.pl". Bez tego `new URL()` w layoucie rzuca
 * „Invalid URL" i wywala cały build, nie mówiąc, która zmienna jest winna.
 */
function normalizeBase(raw: string, source: string): string {
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(withScheme);
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    throw new Error(
      `Zmienna ${source} ma nieprawidłową wartość: "${raw}". Oczekiwany adres domeny, np. "bcoffee.pl" albo "https://bcoffee.pl".`,
    );
  }
}

/** Adres bezwzględny dla ścieżki zaczynającej się od "/". */
export function absoluteUrl(path: string): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
