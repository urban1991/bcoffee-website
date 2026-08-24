import * as React from "react";

/**
 * Full-bleed scrolling band of uppercase service names. The only continuous
 * animation in the system; the content is duplicated once for a seamless loop.
 * Requires the `bcTicker` keyframes from tokens/base.css.
 */
export interface TickerProps {
  /** Uppercase short phrases: ['KAWA NA EVENT', 'BARISTA NA TARGI', …] */
  items?: string[];
  separator?: string;
  /** CSS duration. 30s is the house speed; faster reads as frantic. */
  duration?: string;
  tone?: "accent" | "gold" | "dark";
  className?: string;
  style?: React.CSSProperties;
}

const TONES: Record<NonNullable<TickerProps["tone"]>, React.CSSProperties> = {
  accent: { background: "var(--surface-accent)", color: "var(--text-on-accent)" },
  gold: { background: "var(--surface-highlight)", color: "var(--text-on-accent)" },
  dark: { background: "var(--surface-dark)", color: "var(--text-on-dark)" },
};

export function Ticker({ items = [], separator = "✳", duration = "30s", tone = "accent", className, style, ...rest }: TickerProps) {
  const line = items.join(` ${separator} `) + ` ${separator} `;
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        borderTop: "var(--border)",
        borderBottom: "var(--border)",
        overflow: "hidden",
        padding: "14px 0",
        ...(TONES[tone] || TONES.accent),
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `bcTicker ${duration} linear infinite`,
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "22px",
          letterSpacing: "var(--track-tight)",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ padding: "0 22px" }}>{line}&nbsp;</span>
        <span style={{ padding: "0 22px" }}>{line}&nbsp;</span>
      </div>
    </div>
  );
}
