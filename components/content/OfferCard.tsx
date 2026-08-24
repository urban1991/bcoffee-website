"use client";

import * as React from "react";
import { useState } from "react";
import { AppLink } from "../core/AppLink";
import { PhotoSlot } from "../media/PhotoSlot";

/**
 * A service tile: photo on top, title and an arrow below, tilted at rest and
 * straightening on hover. `wide` switches to the gold full-width variant used
 * to give one service more weight than its siblings.
 */
export interface OfferCardProps {
  title?: string;
  href: string;
  /** PhotoSlot caption: "foto — bar na weselu". */
  photoLabel?: string;
  /** Degrees at rest; alternate the sign across a row. Ignored when `wide`. */
  tilt?: number;
  /** Full-width gold card with eyebrow, body copy and a dark pill CTA. */
  wide?: boolean;
  /** Wide variant only — lowercase handwritten kicker: "nie tylko kawa". */
  eyebrow?: string;
  /** Wide variant only. */
  body?: string;
  ctaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function OfferCard({
  title,
  href,
  photoLabel = "foto",
  tilt = -1.2,
  wide = false,
  eyebrow,
  body,
  ctaLabel = "Zobacz ofertę →",
  className,
  style,
  ...rest
}: OfferCardProps) {
  const [hover, setHover] = useState(false);
  const handlers = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };

  if (wide) {
    return (
      <AppLink
        href={href}
        className={["bc-offercard-wide", className].filter(Boolean).join(" ")}
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          background: "var(--surface-highlight)",
          border: "var(--border)",
          boxShadow: "var(--shadow-xl)",
          transition: "transform var(--dur) var(--ease)",
          transform: hover ? "var(--lift-lg)" : "none",
          ...style,
        }}
        {...handlers}
        {...rest}
      >
        <div style={{ padding: "44px 42px" }}>
          {eyebrow ? <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "27px" }}>{eyebrow}</div> : null}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-display)" as React.CSSProperties["fontWeight"],
              fontSize: "clamp(34px, 4.4vw, 62px)",
              letterSpacing: "var(--track-display)",
              lineHeight: 0.94,
              marginTop: "6px",
            }}
          >
            {title}
          </div>
          {body ? (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-base)",
                lineHeight: "var(--leading-body)",
                margin: "14px 0 0",
                maxWidth: "34ch",
                color: "oklch(0.34 0.05 52)",
              }}
            >
              {body}
            </p>
          ) : null}
          <span
            style={{
              display: "inline-block",
              marginTop: "26px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "var(--text-base)",
              padding: "13px 26px",
              borderRadius: "var(--radius-pill)",
              background: "var(--surface-dark)",
              color: "var(--text-on-dark)",
            }}
          >
            {ctaLabel}
          </span>
        </div>
        <PhotoSlot
          label={photoLabel}
          style={{
            aspectRatio: "auto",
            minHeight: 280,
            borderLeft: "var(--border)",
            background: "transparent",
            backgroundImage: "repeating-linear-gradient(135deg, oklch(0.26 0.045 52 / 0.1) 0 10px, transparent 10px 22px)",
          }}
        />
      </AppLink>
    );
  }

  return (
    <AppLink
      href={href}
      className={className}
      style={{
        display: "block",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        background: "var(--surface-card)",
        border: "var(--border)",
        boxShadow: "var(--shadow-lg)",
        transition: "transform var(--dur) var(--ease)",
        transform: hover ? "rotate(0deg) translateY(-4px)" : `rotate(${tilt}deg)`,
        ...style,
      }}
      {...handlers}
      {...rest}
    >
      <PhotoSlot label={photoLabel} ratio="4 / 3" style={{ borderBottom: "var(--border)" }} />
      <div style={{ padding: "20px 24px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-h4)", letterSpacing: "var(--track-tight)" }}>{title}</span>
        <span style={{ fontSize: "22px", color: "var(--text-accent)" }}>→</span>
      </div>
    </AppLink>
  );
}
