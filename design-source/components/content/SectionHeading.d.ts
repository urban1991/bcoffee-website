import * as React from 'react';

/** Section title in the house shape: structural line one, handwritten coloured line two, optional handwritten note on the right. */
export interface SectionHeadingProps {
  /** Lowercase handwritten kicker: "trochę o nas". */
  eyebrow?: string;
  title?: string;
  /** Second line, rendered in Caveat and coloured: "bądź na bieżąco". */
  hand?: string;
  /** Right-hand handwritten aside: "kawa na każdą sytuację, serio każdą". */
  lead?: string;
  size?: 'lg' | 'md' | 'sm';
  style?: React.CSSProperties;
}

export function SectionHeading(props: SectionHeadingProps): React.JSX.Element;
