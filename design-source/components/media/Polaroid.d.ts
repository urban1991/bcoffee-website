import * as React from 'react';

/**
 * A photo taped down slightly crooked: white frame, thick bottom lip, soft ink shadow.
 * The signature way this brand presents any image.
 *
 * @startingPoint section="Media" subtitle="Tilted photo frame with a bottom lip" viewport="700x320"
 */
export interface PolaroidProps {
  /** Caption for the inner PhotoSlot. Ignored when children are supplied. */
  label?: string;
  ratio?: string;
  /** Degrees. ±2 is the house range. */
  tilt?: number;
  /** Fixed frame height — the inner slot then flexes to fill it. */
  minHeight?: number | string;
  /** A real <img> once photography exists. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Polaroid(props: PolaroidProps): React.JSX.Element;
