import * as React from 'react';

/** Outlined text input. Focus shows a gold hard shadow (from styles.css), never an outline ring. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties;
}

export function Input(props: InputProps): React.JSX.Element;
