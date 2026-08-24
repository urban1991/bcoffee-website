"use client";

import * as React from "react";
import { useState } from "react";
import { AppLink } from "./AppLink";

/** Outlined surface with a hard shadow and an optional tilt. Every block on the site is one of these. */
export interface CardProps {
  children?: React.ReactNode;
  /** paper (default) · sunken · accent (turquoise) · gold · dark (brown, cream type) */
  tone?: "paper" | "sunken" | "accent" | "gold" | "dark";
  /** Degrees of rotation at rest. Interactive cards straighten on hover. */
  tilt?: number;
  radius?: "block" | "card" | "input" | "tile" | "photo";
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "photo" | "none";
  padding?: number | string;
  straightenOnHover?: boolean;
  /** Renders an <a>; also switches on the hover interaction. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

const TONES: Record<NonNullable<CardProps["tone"]>, React.CSSProperties> = {
  paper: { background: "var(--surface-card)" },
  sunken: { background: "var(--surface-sunken)" },
  accent: { background: "var(--surface-accent)" },
  gold: { background: "var(--surface-highlight)" },
  dark: { background: "var(--surface-dark)", color: "var(--text-on-dark)" },
};

export function Card({
  children,
  tone = "paper",
  tilt = 0,
  radius = "card",
  shadow = "lg",
  padding = 28,
  straightenOnHover = true,
  href,
  onClick,
  className,
  style,
  ...rest
}: CardProps) {
  const [hover, setHover] = useState(false);
  const interactive = Boolean(href) || Boolean(onClick);
  const s: React.CSSProperties = {
    border: "var(--border)",
    borderRadius: `var(--radius-${radius})`,
    boxShadow: shadow === "none" ? "none" : `var(--shadow-${shadow})`,
    padding,
    display: "block",
    transform:
      tilt && !(hover && interactive && straightenOnHover)
        ? `rotate(${tilt}deg)`
        : hover && interactive
          ? "rotate(0deg) translateY(-4px)"
          : "none",
    transition: "transform var(--dur-slow) var(--ease)",
    ...(TONES[tone] || TONES.paper),
    ...style,
  };
  const handlers = interactive ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } : {};

  if (href) {
    return (
      <AppLink href={href} className={className} style={s} onClick={onClick} {...handlers} {...rest}>
        {children}
      </AppLink>
    );
  }

  return (
    <div className={className} style={s} onClick={onClick} {...handlers} {...rest}>
      {children}
    </div>
  );
}
