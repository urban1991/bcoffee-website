import * as React from 'react';

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
  tone?: 'light' | 'dark';
  /** Fill a flex parent (used inside Polaroid) instead of holding an aspect ratio. */
  fill?: boolean;
  style?: React.CSSProperties;
}

export function PhotoSlot(props: PhotoSlotProps): React.JSX.Element;
