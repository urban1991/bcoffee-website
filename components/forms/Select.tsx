import * as React from "react";

/** Outlined native select — same shell as Input. */
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ children, style, ...rest }: SelectProps) {
  return (
    <select
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        color: "var(--text-body)",
        background: "var(--surface-card)",
        border: "var(--border)",
        borderRadius: "var(--radius-input)",
        padding: "12px 13px",
        width: "100%",
        outline: "none",
        ...style,
      }}
      {...rest}
    >
      {children}
    </select>
  );
}
