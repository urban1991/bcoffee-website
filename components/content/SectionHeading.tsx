import * as React from "react";

/** Section title in the house shape: structural line one, handwritten coloured line two, optional handwritten note on the right. */
export interface SectionHeadingProps {
  /** Lowercase handwritten kicker: "trochę o nas". */
  eyebrow?: string;
  title?: string;
  /** Second line, rendered in Caveat and coloured: "bądź na bieżąco". */
  hand?: string;
  /** Right-hand handwritten aside: "kawa na każdą sytuację, serio każdą". */
  lead?: string;
  size?: "lg" | "md" | "sm";
  className?: string;
  style?: React.CSSProperties;
}

const SIZES: Record<NonNullable<SectionHeadingProps["size"]>, string> = {
  lg: "var(--text-h2)",
  md: "var(--text-h3)",
  sm: "34px",
};

export function SectionHeading({ eyebrow, title, hand, lead, size = "lg", className, style, ...rest }: SectionHeadingProps) {
  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "28px", flexWrap: "wrap", ...style }}
      {...rest}
    >
      <div>
        {eyebrow ? (
          <div style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: "var(--text-hand)", color: "var(--text-accent)", marginBottom: "10px" }}>
            {eyebrow}
          </div>
        ) : null}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-display)" as React.CSSProperties["fontWeight"],
            fontSize: SIZES[size] || SIZES.lg,
            letterSpacing: "var(--track-display)",
            lineHeight: "var(--leading-heading)",
            margin: 0,
          }}
        >
          {title}
          {hand ? (
            <>
              <br />
              <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "0.92em", letterSpacing: 0, color: "var(--text-accent)" }}>
                {hand}
              </span>
            </>
          ) : null}
        </h2>
      </div>
      {lead ? (
        <p style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: "var(--text-hand)", color: "var(--text-muted)", margin: 0, maxWidth: "34ch" }}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
