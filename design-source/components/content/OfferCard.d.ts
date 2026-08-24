import * as React from 'react';

/**
 * A service tile: photo on top, title and an arrow below, tilted at rest and
 * straightening on hover. `wide` switches to the gold full-width variant used
 * to give one service more weight than its siblings.
 *
 * @startingPoint section="Content" subtitle="Tilted service tile; wide gold variant" viewport="700x420"
 */
export interface OfferCardProps {
  title?: string;
  href?: string;
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
  style?: React.CSSProperties;
}

export function OfferCard(props: OfferCardProps): React.JSX.Element;
