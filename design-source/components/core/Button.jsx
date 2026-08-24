import React, { useState } from 'react';

const VARIANTS = {
  primary: { background: 'var(--surface-accent)', color: 'var(--text-on-accent)', border: 'var(--border)', boxShadow: 'var(--shadow-md)' },
  gold: { background: 'var(--surface-highlight)', color: 'var(--text-on-accent)', border: 'var(--border)', boxShadow: 'var(--shadow-md)' },
  cream: { background: 'var(--surface-card)', color: 'var(--text-body)', border: 'var(--border)', boxShadow: 'var(--shadow-md)' },
  dark: { background: 'var(--surface-dark)', color: 'var(--text-on-dark)', border: 'var(--border)', boxShadow: 'none' },
  outline: { background: 'transparent', color: 'var(--text-body)', border: 'var(--border)', boxShadow: 'none' },
  onPhoto: { background: 'transparent', color: 'var(--text-on-dark)', border: '2px solid oklch(1 0 0 / 0.5)', boxShadow: 'none' }
};

const SIZES = {
  sm: { fontSize: '14px', padding: '10px 18px' },
  md: { fontSize: '16px', padding: '15px 28px' },
  lg: { fontSize: '17px', padding: '16px 32px' }
};

export function Button({ children, variant = 'primary', size = 'md', href, onClick, type = 'button', fullWidth = false, disabled = false, style, ...rest }) {
  const [hover, setHover] = useState(false);
  const lifts = variant !== 'outline' && variant !== 'onPhoto';
  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-strong)',
    letterSpacing: '-0.01em',
    borderRadius: 'var(--radius-pill)',
    display: fullWidth ? 'block' : 'inline-block',
    width: fullWidth ? '100%' : undefined,
    textAlign: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'transform var(--dur-fast) var(--ease), background var(--dur) var(--ease)',
    transform: hover && !disabled && lifts ? 'var(--lift)' : 'none',
    ...SIZES[size],
    ...VARIANTS[variant] || VARIANTS.primary,
    ...(hover && !disabled && !lifts ? { background: 'var(--surface-highlight)' } : null),
    ...style
  };
  const handlers = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };
  if (href) return <a href={href} style={base} onClick={onClick} {...handlers} {...rest}>{children}</a>;
  return <button type={type} style={base} onClick={onClick} disabled={disabled} {...handlers} {...rest}>{children}</button>;
}
