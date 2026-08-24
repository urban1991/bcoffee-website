import React from 'react';
import { PhotoSlot } from './PhotoSlot.jsx';

export function Polaroid({ label = 'zdjęcie', ratio = '4 / 5', tilt = -2, minHeight, children, style, ...rest }) {
  return (
    <div
      style={{
        transform: `rotate(${tilt}deg)`,
        display: 'flex',
        flexDirection: 'column',
        minHeight,
        borderRadius: 'var(--radius-photo)',
        background: 'var(--surface-card)',
        border: 'var(--border)',
        boxShadow: 'var(--shadow-photo)',
        padding: '12px 12px 40px',
        ...style
      }}
      {...rest}
    >
      {children || (minHeight ? <PhotoSlot label={label} fill /> : <PhotoSlot label={label} ratio={ratio} />)}
    </div>
  );
}
