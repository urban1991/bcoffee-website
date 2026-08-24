import React from 'react';

const SIZES = { lg: 'var(--text-h2)', md: 'var(--text-h3)', sm: '34px' };

export function SectionHeading({ eyebrow, title, hand, lead, size = 'lg', style, ...rest }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '28px', flexWrap: 'wrap', ...style }} {...rest}>
      <div>
        {eyebrow ? (
          <div style={{ fontFamily: 'var(--font-hand)', fontWeight: 600, fontSize: 'var(--text-hand)', color: 'var(--text-accent)', marginBottom: '10px' }}>{eyebrow}</div>
        ) : null}
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)', fontSize: SIZES[size] || SIZES.lg, letterSpacing: 'var(--track-display)', lineHeight: 'var(--leading-heading)', margin: 0 }}>
          {title}
          {hand ? (
            <>
              <br />
              <span style={{ fontFamily: 'var(--font-hand)', fontWeight: 700, fontSize: '0.92em', letterSpacing: 0, color: 'var(--text-accent)' }}>{hand}</span>
            </>
          ) : null}
        </h2>
      </div>
      {lead ? (
        <p style={{ fontFamily: 'var(--font-hand)', fontWeight: 600, fontSize: 'var(--text-hand)', color: 'var(--text-muted)', margin: 0, maxWidth: '34ch' }}>{lead}</p>
      ) : null}
    </div>
  );
}
