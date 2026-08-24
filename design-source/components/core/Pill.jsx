import React from 'react';

const TONES = {
  outline: { border: 'var(--border)', background: 'transparent', color: 'var(--text-body)' },
  filled: { border: 'var(--border)', background: 'var(--surface-accent)', color: 'var(--text-on-accent)' },
  gold: { border: 'var(--border)', background: 'var(--surface-highlight)', color: 'var(--text-on-accent)' },
  onPhoto: { border: '1px solid oklch(1 0 0 / 0.5)', background: 'transparent', color: 'var(--text-on-dark)' }
};

export function Pill({ children, tone = 'outline', uppercase = true, href, style, ...rest }) {
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: uppercase ? 'var(--track-eyebrow)' : '0.02em',
    textTransform: uppercase ? 'uppercase' : 'none',
    padding: '7px 14px',
    borderRadius: 'var(--radius-pill)',
    ...TONES[tone] || TONES.outline,
    ...style
  };
  if (href) return <a href={href} style={s} {...rest}>{children}</a>;
  return <span style={s} {...rest}>{children}</span>;
}
