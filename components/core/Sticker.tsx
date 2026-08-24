import * as React from "react";

/**
 * A rotated outlined roundel with two short handwritten words in it. This system's
 * substitute for iconography — see design-source/readme.md, sekcja ICONOGRAPHY.
 */
export interface StickerProps {
  /** Two short lowercase words, split with a <br />. */
  children?: React.ReactNode;
  tone?: "gold" | "turquoise" | "cream";
  size?: "sm" | "md" | "lg";
  /** Degrees. Keep it between -12 and 8; zero looks like a mistake. */
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
}

const TONES: Record<NonNullable<StickerProps["tone"]>, React.CSSProperties> = {
  gold: { background: "var(--surface-highlight)", color: "var(--text-on-accent)" },
  turquoise: { background: "var(--surface-accent)", color: "var(--text-on-accent)" },
  cream: { background: "var(--surface-card)", color: "var(--text-body)" },
};

const SIZES: Record<NonNullable<StickerProps["size"]>, number> = { sm: 66, md: 104, lg: 124 };

export function Sticker({ children, tone = "gold", size = "md", rotate = -9, className, style, ...rest }: StickerProps) {
  const px = SIZES[size] || SIZES.md;
  return (
    <div
      className={className}
      style={{
        width: px,
        height: px,
        flex: "none",
        borderRadius: "50%",
        border: "var(--border)",
        transform: `rotate(${rotate}deg)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "var(--font-hand)",
        fontWeight: 700,
        fontSize: px > 100 ? "26px" : px > 80 ? "24px" : "20px",
        lineHeight: 1,
        ...(TONES[tone] || TONES.gold),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
