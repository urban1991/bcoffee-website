import * as React from 'react';

/**
 * Full-bleed scrolling band of uppercase service names. The only continuous
 * animation in the system; the content is duplicated once for a seamless loop.
 * Requires the `bcTicker` keyframes from styles.css.
 */
export interface TickerProps {
  /** Uppercase short phrases: ['KAWA NA EVENT', 'BARISTA NA TARGI', …] */
  items?: string[];
  separator?: string;
  /** CSS duration. 30s is the house speed; faster reads as frantic. */
  duration?: string;
  tone?: 'accent' | 'gold' | 'dark';
  style?: React.CSSProperties;
}

export function Ticker(props: TickerProps): React.JSX.Element;
