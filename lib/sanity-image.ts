import type { Photo } from "@/sanity/types";

/** Dokłada parametry przekształcenia do adresu z CDN-u Sanity. */
export function cdnImage(rawUrl: string, params: Record<string, string>): string {
  const url = new URL(rawUrl);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return url.toString();
}

export interface ImageSource {
  /** Adres zdjęcia z uwzględnionym przycięciem ze Studio. */
  url: string;
  /** Punkt ostrości przeliczony na przycięty kadr, albo `null`, gdy nie ustawiono. */
  focal: { x: number; y: number } | null;
}

/** Nieustawione przycięcie Sanity zapisuje jako same zera — wtedy nie ma czego wycinać. */
function hasCrop(crop: Photo["crop"]): boolean {
  return Boolean(crop && crop.top + crop.bottom + crop.left + crop.right > 0);
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Tłumaczy obie kontrolki z edytora zdjęć w Studio na to, co rozumie CDN i przeglądarka.
 *
 * Edytor Sanity ma dwie równorzędne kontrolki: prostokąt przycięcia i celownik punktu
 * ostrości. Wcześniej czytaliśmy tylko tę drugą, więc połowa edytora nie robiła nic —
 * Wojtek mógł przyciąć zdjęcie i nie zobaczyć żadnej zmiany na stronie.
 *
 * Przycięcie zamieniamy na parametr `rect` (w pikselach oryginału), a punkt ostrości
 * przeliczamy na układ współrzędnych już przyciętego kadru — Sanity trzyma go względem
 * oryginału, więc bez tej korekty celownik wskazywałby po przycięciu inne miejsce.
 */
export function imageSource(photo: Photo): ImageSource {
  const url = photo.url ?? "";
  const { crop, hotspot, width, height } = photo;

  if (!hasCrop(crop) || !crop || !width || !height) {
    return { url, focal: hotspot ? { x: clamp(hotspot.x), y: clamp(hotspot.y) } : null };
  }

  const widthLeft = 1 - crop.left - crop.right;
  const heightLeft = 1 - crop.top - crop.bottom;

  // Przycięcie do zera albo poza obraz to dane, którym nie ufamy — lepiej pokazać
  // całe zdjęcie niż wygenerować adres, na który CDN odpowie błędem.
  if (widthLeft <= 0 || heightLeft <= 0) {
    return { url, focal: hotspot ? { x: clamp(hotspot.x), y: clamp(hotspot.y) } : null };
  }

  const rect = [
    Math.round(crop.left * width),
    Math.round(crop.top * height),
    Math.max(1, Math.round(width * widthLeft)),
    Math.max(1, Math.round(height * heightLeft)),
  ].join(",");

  return {
    url: url ? cdnImage(url, { rect }) : url,
    focal: hotspot
      ? { x: clamp((hotspot.x - crop.left) / widthLeft), y: clamp((hotspot.y - crop.top) / heightLeft) }
      : null,
  };
}
