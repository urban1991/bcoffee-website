import * as React from 'react';

/** Small outlined capsule used for eyebrows above a headline and for non-primary links (`@bcoffeebehappy`). */
export interface PillProps {
  children?: React.ReactNode;
  /** outline (default) · filled (turquoise) · gold · onPhoto (cream 50% border over a hero) */
  tone?: 'outline' | 'filled' | 'gold' | 'onPhoto';
  /** Eyebrows are uppercase; a link label like an Instagram handle is not. */
  uppercase?: boolean;
  href?: string;
  style?: React.CSSProperties;
}

export function Pill(props: PillProps): React.JSX.Element;
