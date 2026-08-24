import * as React from 'react';

/** Outlined surface with a hard shadow and an optional tilt. Every block on the site is one of these. */
export interface CardProps {
  children?: React.ReactNode;
  /** paper (default) · sunken · accent (turquoise) · gold · dark (brown, cream type) */
  tone?: 'paper' | 'sunken' | 'accent' | 'gold' | 'dark';
  /** Degrees of rotation at rest. Interactive cards straighten on hover. */
  tilt?: number;
  radius?: 'block' | 'card' | 'input' | 'tile' | 'photo';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'photo' | 'none';
  padding?: number | string;
  straightenOnHover?: boolean;
  /** Renders an <a>; also switches on the hover interaction. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function Card(props: CardProps): React.JSX.Element;
