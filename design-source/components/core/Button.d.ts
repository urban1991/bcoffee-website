import * as React from 'react';

/**
 * The one clickable shape in the system: an outlined pill with a hard offset shadow
 * that lifts toward the top-left on hover.
 *
 * @startingPoint section="Core" subtitle="Outlined pill, hard shadow, lifts on hover" viewport="700x180"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = turquoise (default CTA) · gold = secondary emphasis · cream = on a coloured block · dark = inside a gold/turquoise card · outline = tertiary · onPhoto = over a photo scrim */
  variant?: 'primary' | 'gold' | 'cream' | 'dark' | 'outline' | 'onPhoto';
  size?: 'sm' | 'md' | 'lg';
  /** Renders an <a> instead of a <button>. */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): React.JSX.Element;
