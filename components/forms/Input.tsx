import * as React from "react";

/** Outlined text input. Focus shows a gold hard shadow (z tokens/base.css), never an outline ring. */
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const shell: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  color: "var(--text-body)",
  background: "var(--surface-card)",
  border: "var(--border)",
  borderRadius: "var(--radius-input)",
  padding: "12px 13px",
  width: "100%",
  outline: "none",
};

export function Input({ style, ...rest }: InputProps) {
  return <input style={{ ...shell, ...style }} {...rest} />;
}
