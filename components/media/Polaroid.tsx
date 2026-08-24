import * as React from "react";
import { PhotoSlot } from "./PhotoSlot";

/**
 * A photo taped down slightly crooked: white frame, thick bottom lip, soft ink shadow.
 * The signature way this brand presents any image.
 */
export interface PolaroidProps {
  /** Caption for the inner PhotoSlot. Ignored when children are supplied. */
  label?: string;
  ratio?: string;
  /** Degrees. ±2 is the house range. */
  tilt?: number;
  /** Fixed frame height — the inner slot then flexes to fill it. */
  minHeight?: number | string;
  /** A real <img> / next/image once photography exists. */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Polaroid({ label = "zdjęcie", ratio = "4 / 5", tilt = -2, minHeight, children, className, style, ...rest }: PolaroidProps) {
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
      {children || (minHeight ? <PhotoSlot label={label} fill /> : <PhotoSlot label={label} ratio={ratio} />)}
    </div>
  );
}
