import React from 'react';

export function Select({ children, style, ...rest }) {
  return (
    <select style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', background: 'var(--surface-card)', border: 'var(--border)', borderRadius: 'var(--radius-input)', padding: '12px 13px', width: '100%', outline: 'none', ...style }} {...rest}>
      {children}
    </select>
  );
}
