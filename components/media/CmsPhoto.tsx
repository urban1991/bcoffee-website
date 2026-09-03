import * as React from "react";
import Image from "next/image";
import { PhotoSlot } from "./PhotoSlot";
import { imageSource } from "@/lib/sanity-image";
import type { Photo } from "@/sanity/types";

export interface CmsPhotoProps {
  photo?: Photo | null;
  /**
   * CSS aspect-ratio, albo `"auto"` — wtedy ramka bierze proporcje samego zdjęcia
   * i nie ucina z niego nic. Ignorowane przy `fill`.
   */
  ratio?: string;
  tone?: "light" | "dark";
  /** Wypełnia rodzica flex zamiast trzymać proporcje (używane w Polaroidzie). */
  fill?: boolean;
  /** Podpowiedź dla next/image, jaką szerokość zajmie obraz. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Most między CMS-em a design systemem: gdy zdjęcie jest wgrane, renderuje
 * zoptymalizowany <Image>; gdy go nie ma — kreskowany PhotoSlot z opisem, co ma
 * tam wejść. Dzięki temu strona wygląda sensownie na każdym etapie uzupełniania treści.
 */
export function CmsPhoto({ photo, ratio = "4 / 3", tone = "light", fill = false, sizes = "100vw", priority = false, className, style }: CmsPhotoProps) {
  // Placeholder nie zna proporcji nieistniejącego zdjęcia — dostaje domyślne.
  const resolvedRatio = ratio === "auto" ? (photo?.width && photo?.height ? `${photo.width} / ${photo.height}` : "4 / 3") : ratio;

  if (!photo?.url) {
    return <PhotoSlot label={photo?.placeholder} ratio={resolvedRatio} tone={tone} fill={fill} className={className} style={style} />;
  }

  const { url, focal } = imageSource(photo);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        aspectRatio: fill ? undefined : resolvedRatio,
        flex: fill ? 1 : undefined,
        minHeight: fill ? 0 : undefined,
        overflow: "hidden",
        background: "var(--surface-sunken)",
        ...style,
      }}
    >
      <Image
        src={url}
        alt={photo.alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        // Wektora nie ma po co rasteryzować — optymalizator tylko odebrałby mu ostrość.
        unoptimized={photo.mimeType === "image/svg+xml"}
        placeholder={photo.lqip ? "blur" : undefined}
        blurDataURL={photo.lqip ?? undefined}
        // Gdzie kadrować, gdy proporcje zdjęcia i ramki wciąż się różnią. Domyślnie
        // przeglądarka tnie równo od środka i potrafi uciąć głowy; celownik ustawiony
        // w Studio przesuwa kadr tam, gdzie trzeba — bez udziału programisty.
        style={{
          objectFit: "cover",
          objectPosition: focal ? `${focal.x * 100}% ${focal.y * 100}%` : undefined,
        }}
      />
    </div>
  );
}
