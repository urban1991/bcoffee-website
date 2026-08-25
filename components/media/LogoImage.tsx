import * as React from "react";
import Image from "next/image";
import type { Photo } from "@/sanity/types";

export interface LogoImageProps {
  photo?: Photo | null;
  /** Wysokość kafla. Design system trzyma 76px w rzędzie logotypów klientów. */
  height?: number;
  className?: string;
}

/**
 * Kafel z logotypem klienta.
 *
 * Logotypy zachowują się inaczej niż zdjęcia: przychodzą w skrajnie różnych
 * proporcjach (od kwadratu po pasek 4.6:1), więc kadrowanie ich do wspólnego
 * formatu obcina nazwy. Zamiast tego każdy mieści się w całości w stałej
 * wysokości, wyśrodkowany, z marginesem oddechu.
 *
 * SVG omijają optymalizator next/image — rasteryzacja wektora tylko pogorszyłaby
 * ostrość, a plik i tak jest lekki.
 */
export function LogoImage({ photo, height = 76, className }: LogoImageProps) {
  const tile: React.CSSProperties = {
    height,
    borderRadius: "var(--radius-tile)",
    border: "var(--border-dashed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    overflow: "hidden",
  };

  if (!photo?.url) {
    return (
      <div className={className} style={{ ...tile, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)" }}>
        {photo?.placeholder ?? "logo"}
      </div>
    );
  }

  const isSvg = photo.mimeType === "image/svg+xml";

  return (
    <div className={className} style={tile}>
      <Image
        src={photo.url}
        alt={photo.alt ?? ""}
        width={photo.width ?? 200}
        height={photo.height ?? 100}
        unoptimized={isSvg}
        sizes="200px"
        style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain" }}
      />
    </div>
  );
}
