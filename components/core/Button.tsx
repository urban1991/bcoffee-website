"use client";

import * as React from "react";
import { useState } from "react";
import { AppLink } from "./AppLink";

/**
 * The one clickable shape in the system: an outlined pill with a hard offset shadow
 * that lifts toward the top-left on hover.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = turquoise (default CTA) · gold = secondary emphasis · cream = on a coloured block · dark = inside a gold/turquoise card · outline = tertiary · onPhoto = over a photo scrim */
  variant?: "primary" | "gold" | "cream" | "dark" | "outline" | "onPhoto";
  size?: "sm" | "md" | "lg";
  /** Renders an <a> instead of a <button>. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
  primary: { background: "var(--surface-accent)", color: "var(--text-on-accent)", border: "var(--border)", boxShadow: "var(--shadow-md)" },
  gold: { background: "var(--surface-highlight)", color: "var(--text-on-accent)", border: "var(--border)", boxShadow: "var(--shadow-md)" },
  cream: { background: "var(--surface-card)", color: "var(--text-body)", border: "var(--border)", boxShadow: "var(--shadow-md)" },
  dark: { background: "var(--surface-dark)", color: "var(--text-on-dark)", border: "var(--border)", boxShadow: "none" },
  outline: { background: "transparent", color: "var(--text-body)", border: "var(--border)", boxShadow: "none" },
  onPhoto: { background: "transparent", color: "var(--text-on-dark)", border: "2px solid oklch(1 0 0 / 0.5)", boxShadow: "none" },
};

const SIZES: Record<NonNullable<ButtonProps["size"]>, React.CSSProperties> = {
  sm: { fontSize: "14px", padding: "10px 18px" },
  md: { fontSize: "16px", padding: "15px 28px" },
  lg: { fontSize: "17px", padding: "16px 32px" },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
  className,
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const lifts = variant !== "outline" && variant !== "onPhoto";
  const base: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-strong)" as React.CSSProperties["fontWeight"],
    letterSpacing: "-0.01em",
    borderRadius: "var(--radius-pill)",
    display: fullWidth ? "block" : "inline-block",
    width: fullWidth ? "100%" : undefined,
    textAlign: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "transform var(--dur-fast) var(--ease), background var(--dur) var(--ease)",
    transform: hover && !disabled && lifts ? "var(--lift)" : "none",
    ...SIZES[size],
    ...(VARIANTS[variant] || VARIANTS.primary),
    ...(hover && !disabled && !lifts ? { background: "var(--surface-highlight)" } : null),
    ...style,
  };
  const handlers = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };

  if (href) {
    return (
      <AppLink href={href} className={className} style={base} onClick={onClick} {...handlers} {...rest}>
        {children}
      </AppLink>
    );
  }

  return (
    <button type={type} className={className} style={base} onClick={onClick} disabled={disabled} {...handlers} {...rest}>
      {children}
    </button>
  );
}
