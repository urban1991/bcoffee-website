import type { NextConfig } from "next";

/**
 * GitHub Pages serwuje statyczne pliki z podkatalogu `/<nazwa-repo>/`, więc
 * produkcyjny build potrzebuje basePath. Workflow deployu ustawia
 * NEXT_PUBLIC_BASE_PATH na podstawie nazwy repozytorium; lokalnie zmiennej nie ma,
 * więc `npm run dev` i `npm run start` działają pod gołym `/`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Statyczny eksport do `out/` — Pages nie uruchamia serwera Node.
  output: "export",

  // `/kawa-na-wesele/index.html` zamiast `/kawa-na-wesele.html`.
  // Bez tego Pages potrafi zgubić trasę przy odświeżeniu podstrony.
  trailingSlash: true,

  basePath,
  assetPrefix: basePath || undefined,

  // Optymalizacja obrazów wymaga serwera. Przy eksporcie next/image musi
  // dostawać pliki bez przetwarzania — istotne, gdy podmienisz PhotoSlot na zdjęcia.
  images: { unoptimized: true },
};

export default nextConfig;
