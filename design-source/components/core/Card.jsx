import React, { useState } from 'react';

const TONES = {
  paper: { background: 'var(--surface-card)' },
  sunken: { background: 'var(--surface-sunken)' },
  accent: { background: 'var(--surface-accent)' },
  gold: { background: 'var(--surface-highlight)' },
  dark: { background: 'var(--surface-dark)', color: 'var(--text-on-dark)' }
};

export function Card({ children, tone = 'paper', tilt = 0, radius = 'card', shadow = 'lg', padding = 28, straightenOnHover = true, href, style, ...rest }) {
  const [hover, setHover] = useState(false);
  const interactive = Boolean(href) || Boolean(rest.onClick);
  const s = {
    border: 'var(--border)',
    borderRadius: `var(--radius-${radius})`,
    boxShadow: shadow === 'none' ? 'none' : `var(--shadow-${shadow})`,
    padding,
    display: 'block',
    transform: tilt && !(hover && interactive && straightenOnHover) ? `rotate(${tilt}deg)` : hover && interactive ? 'rotate(0deg) translateY(-4px)' : 'none',
    transition: 'transform var(--dur-slow) var(--ease)',
    ...TONES[tone] || TONES.paper,
    ...style
  };
  const handlers = interactive ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } : {};
  if (href) return <a href={href} style={s} {...handlers} {...rest}>{children}</a>;
  return <div style={s} {...handlers} {...rest}>{children}</div>;
}
