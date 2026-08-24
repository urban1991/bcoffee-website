import * as React from 'react';

/**
 * A rotated outlined roundel with two short handwritten words in it. This system's
 * substitute for iconography — see readme.md ICONOGRAPHY.
 *
 * @startingPoint section="Core" subtitle="Rotated handwritten roundel — the icon substitute" viewport="700x200"
 */
export interface StickerProps {
  /** Two short lowercase words, split with a <br />. */
  children?: React.ReactNode;
  tone?: 'gold' | 'turquoise' | 'cream';
  size?: 'sm' | 'md' | 'lg';
  /** Degrees. Keep it between -12 and 8; zero looks like a mistake. */
  rotate?: number;
  style?: React.CSSProperties;
}

export function Sticker(props: StickerProps): React.JSX.Element;
