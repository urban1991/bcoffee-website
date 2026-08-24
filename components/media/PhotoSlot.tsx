import * as React from "react";

/**
 * Diagonal-hatch placeholder standing in for a photograph that has not been supplied.
 * The caption names the shot and its aspect ratio, in lowercase monospace.
 */
export interface PhotoSlotProps {
  /** e.g. "zdjęcie zespołu, pionowe 3:4" — say what belongs there, not "placeholder". */
  label?: string;
  /** CSS aspect-ratio string. Ignored when `fill` is set. */
  ratio?: string;
  /** light = on cream · dark = inside a hero, pairs with --scrim-photo */
  tone?: "light" | "dark";
  /** Fill a flex parent (used inside Polaroid) instead of holding an aspect ratio. */
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function PhotoSlot({ label = "zdjęcie", ratio = "4 / 3", tone = "light", fill = false, className, style, ...rest }: PhotoSlotProps) {
  const dark = tone === "dark";
  return (
    <div
      className={className}
      style={{
        aspectRatio: fill ? undefined : ratio,
        flex: fill ? 1 : undefined,
        minHeight: fill ? 0 : undefined,
        background: dark ? "var(--surface-photo)" : "var(--surface-sunken)",
        backgroundImage: dark ? "var(--texture-stripes-dark)" : "var(--texture-stripes)",
        display: "flex",
        alignItems: "flex-end",
        padding: "14px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-caption)",
        color: dark ? "oklch(1 0 0 / 0.55)" : "var(--text-faint)",
        ...style,
      }}
      {...rest}
    >
      {label}
    </div>
  );
}
