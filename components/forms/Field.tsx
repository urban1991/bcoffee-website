import * as React from "react";

/** Uppercase label + control wrapper. Every input on the site is wrapped in one. */
export interface FieldProps {
  /** Polish sentence-case noun, rendered uppercase by the component: "Data wydarzenia". */
  label?: string;
  htmlFor?: string;
  children?: React.ReactNode;
  /** 'full' makes the field span both columns of a two-column form grid. */
  span?: 1 | "full";
  className?: string;
  style?: React.CSSProperties;
}

export function Field({ label, htmlFor, children, span = 1, className, style, ...rest }: FieldProps) {
  return (
    <div className={className} style={{ gridColumn: span === "full" ? "1 / -1" : undefined, ...style }} {...rest}>
      {label ? (
        <label
          htmlFor={htmlFor}
          style={{
            display: "block",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-label)",
            fontWeight: 600,
            letterSpacing: "var(--track-label)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "6px",
          }}
        >
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
}
