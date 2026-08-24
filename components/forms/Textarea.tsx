import * as React from "react";

/** Outlined multi-line field, vertical resize only. */
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ style, ...rest }: TextareaProps) {
  return (
    <textarea
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
        resize: "vertical",
        ...style,
      }}
      {...rest}
    />
  );
}
