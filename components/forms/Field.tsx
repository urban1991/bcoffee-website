import * as React from "react";

/** Uppercase label + control wrapper. Every input on the site is wrapped in one. */
export interface FieldProps {
  /** Polish sentence-case noun, rendered uppercase by the component: "Data wydarzenia". */
  label?: string;
  htmlFor?: string;
  children?: React.ReactNode;
  /** 'full' makes the field span both columns of a two-column form grid. */
  span?: 1 | "full";
  /**
   * Komunikat walidacji. Design system nie przewidywał stanu błędu, bo kit nie
   * miał walidacji — dołożone tu, żeby dało się wskazać konkretne pole zamiast
   * jednego komunikatu pod przyciskiem.
   */
  error?: string;
  /** Id komunikatu błędu — do podpięcia przez aria-describedby w kontrolce. */
  errorId?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Field({ label, htmlFor, children, span = 1, error, errorId, className, style, ...rest }: FieldProps) {
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
            color: error ? "var(--text-error)" : "var(--text-muted)",
            marginBottom: "6px",
          }}
        >
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p
          id={errorId}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            fontWeight: 500,
            lineHeight: 1.35,
            color: "var(--text-error)",
            margin: "6px 0 0",
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
