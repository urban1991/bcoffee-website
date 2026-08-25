import * as React from "react";
import { CmsPhoto } from "./CmsPhoto";
import type { Photo } from "@/sanity/types";

/**
 * A photo taped down slightly crooked: white frame, thick bottom lip, soft ink shadow.
 * The signature way this brand presents any image.
 */
export interface PolaroidProps {
  /** Zdjęcie z CMS-a. Bez wgranego pliku ramka pokazuje placeholder z opisem. */
  photo?: Photo | null;
  ratio?: string;
  /** Degrees. ±2 is the house range. */
  tilt?: number;
  /** Fixed frame height — the inner slot then flexes to fill it. */
  minHeight?: number | string;
  sizes?: string;
  priority?: boolean;
  /** Własna zawartość zamiast zdjęcia. */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Polaroid({
  photo,
  ratio = "4 / 5",
  tilt = -2,
  minHeight,
  sizes = "(max-width: 899px) 100vw, 50vw",
  priority = false,
  children,
  className,
  style,
  ...rest
}: PolaroidProps) {
  return (
    <div
      className={className}
      style={{
        transform: `rotate(${tilt}deg)`,
        display: "flex",
        flexDirection: "column",
        minHeight,
        borderRadius: "var(--radius-photo)",
        background: "var(--surface-card)",
        border: "var(--border)",
        boxShadow: "var(--shadow-photo)",
        padding: "12px 12px 40px",
        ...style,
      }}
      {...rest}
    >
      {children ??
        (minHeight ? (
          <CmsPhoto photo={photo} fill sizes={sizes} priority={priority} />
        ) : (
          <CmsPhoto photo={photo} ratio={ratio} sizes={sizes} priority={priority} />
        ))}
    </div>
  );
}
