import * as React from "react";
import { AppLink } from "./AppLink";

/** Small outlined capsule used for eyebrows above a headline and for non-primary links (`@bcoffeebehappy`). */
export interface PillProps {
  children?: React.ReactNode;
  /** outline (default) · filled (turquoise) · gold · onPhoto (cream 50% border over a hero) */
  tone?: "outline" | "filled" | "gold" | "onPhoto";
  /** Eyebrows are uppercase; a link label like an Instagram handle is not. */
  uppercase?: boolean;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TONES: Record<NonNullable<PillProps["tone"]>, React.CSSProperties> = {
  outline: { border: "var(--border)", background: "transparent", color: "var(--text-body)" },
  filled: { border: "var(--border)", background: "var(--surface-accent)", color: "var(--text-on-accent)" },
  gold: { border: "var(--border)", background: "var(--surface-highlight)", color: "var(--text-on-accent)" },
  onPhoto: { border: "1px solid oklch(1 0 0 / 0.5)", background: "transparent", color: "var(--text-on-dark)" },
};

export function Pill({ children, tone = "outline", uppercase = true, href, className, style, ...rest }: PillProps) {
  const s: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-body)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: uppercase ? "var(--track-eyebrow)" : "0.02em",
    textTransform: uppercase ? "uppercase" : "none",
    padding: "7px 14px",
    borderRadius: "var(--radius-pill)",
    ...(TONES[tone] || TONES.outline),
    ...style,
  };

  if (href) {
    return (
      <AppLink href={href} className={className} style={s} {...rest}>
        {children}
      </AppLink>
    );
  }

  return (
    <span className={className} style={s} {...rest}>
      {children}
    </span>
  );
}
