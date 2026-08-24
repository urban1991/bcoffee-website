import React from 'react';

const TONES = {
  gold: { background: 'var(--surface-highlight)', color: 'var(--text-on-accent)' },
  turquoise: { background: 'var(--surface-accent)', color: 'var(--text-on-accent)' },
  cream: { background: 'var(--surface-card)', color: 'var(--text-body)' }
};

const SIZES = { sm: 66, md: 104, lg: 124 };

export function Sticker({ children, tone = 'gold', size = 'md', rotate = -9, style, ...rest }) {
  const px = SIZES[size] || SIZES.md;
  return (
    <div
      style={{
        width: px,
        height: px,
        flex: 'none',
        borderRadius: '50%',
        border: 'var(--border)',
        transform: `rotate(${rotate}deg)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'var(--font-hand)',
        fontWeight: 700,
        fontSize: px > 100 ? '26px' : px > 80 ? '24px' : '20px',
        lineHeight: 1,
        ...TONES[tone] || TONES.gold,
        ...style
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
