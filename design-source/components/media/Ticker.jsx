import React from 'react';

export function Ticker({ items = [], separator = '✳', duration = '30s', tone = 'accent', style, ...rest }) {
  const line = items.join(` ${separator} `) + ` ${separator} `;
  const tones = {
    accent: { background: 'var(--surface-accent)', color: 'var(--text-on-accent)' },
    gold: { background: 'var(--surface-highlight)', color: 'var(--text-on-accent)' },
    dark: { background: 'var(--surface-dark)', color: 'var(--text-on-dark)' }
  };
  return (
    <div style={{ borderTop: 'var(--border)', borderBottom: 'var(--border)', overflow: 'hidden', padding: '14px 0', ...tones[tone] || tones.accent, ...style }} {...rest}>
      <div style={{ display: 'flex', width: 'max-content', animation: `bcTicker ${duration} linear infinite`, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', letterSpacing: 'var(--track-tight)', whiteSpace: 'nowrap' }}>
        <span style={{ padding: '0 22px' }}>{line}&nbsp;</span>
        <span style={{ padding: '0 22px' }}>{line}&nbsp;</span>
      </div>
    </div>
  );
}
