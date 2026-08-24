import React from 'react';

export function Field({ label, htmlFor, children, span = 1, style, ...rest }) {
  return (
    <div style={{ gridColumn: span === 'full' ? '1 / -1' : undefined, ...style }} {...rest}>
      {label ? (
        <label
          htmlFor={htmlFor}
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-label)',
            fontWeight: 600,
            letterSpacing: 'var(--track-label)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '6px'
          }}
        >
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
}
