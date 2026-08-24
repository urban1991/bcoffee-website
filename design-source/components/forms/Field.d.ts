import * as React from 'react';

/** Uppercase label + control wrapper. Every input on the site is wrapped in one. */
export interface FieldProps {
  /** Polish sentence-case noun, rendered uppercase by the component: "Data wydarzenia". */
  label?: string;
  htmlFor?: string;
  children?: React.ReactNode;
  /** 'full' makes the field span both columns of a two-column form grid. */
  span?: 1 | 'full';
  style?: React.CSSProperties;
}

export function Field(props: FieldProps): React.JSX.Element;
