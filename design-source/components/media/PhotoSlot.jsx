import React from 'react';

export function PhotoSlot({ label = 'zdjęcie', ratio = '4 / 3', tone = 'light', fill = false, style, ...rest }) {
  const dark = tone === 'dark';
  return (
    <div
      style={{
        aspectRatio: fill ? undefined : ratio,
        flex: fill ? 1 : undefined,
        minHeight: fill ? 0 : undefined,
        background: dark ? 'var(--surface-photo)' : 'var(--surface-sunken)',
        backgroundImage: dark ? 'var(--texture-stripes-dark)' : 'var(--texture-stripes)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '14px',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-caption)',
        color: dark ? 'oklch(1 0 0 / 0.55)' : 'var(--text-faint)',
        ...style
      }}
      {...rest}
    >
      {label}
    </div>
  );
}
