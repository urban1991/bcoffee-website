import * as React from 'react';

/** Outlined multi-line field, vertical resize only. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  style?: React.CSSProperties;
}

export function Textarea(props: TextareaProps): React.JSX.Element;
