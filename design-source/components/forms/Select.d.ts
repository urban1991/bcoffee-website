import * as React from 'react';

/** Outlined native select — same shell as Input. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): React.JSX.Element;
