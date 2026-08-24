import React, { useEffect, useRef, useState } from 'react';

export function StatBand({ value = 0, caption = '', body = '', animate = true, style, ...rest }) {
  const [shown, setShown] = useState(animate ? 0 : value);
  const ref = useRef(null);

  useEffect(() => {
    if (!animate) { setShown(value); return; }
    const el = ref.current;
    let raf;
    const run = () => {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 1600);
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (!el || typeof IntersectionObserver === 'undefined') { run(); return () => cancelAnimationFrame(raf); }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { io.disconnect(); run(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, animate]);

  return (
    <div style={{ borderRadius: 'var(--radius-block)', border: 'var(--border)', background: 'var(--surface-dark)', color: 'var(--text-on-dark)', padding: '74px 54px', ...style }} {...rest}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '48px', alignItems: 'center' }}>
        <div ref={ref}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-display)', fontSize: 'clamp(76px, 12vw, 186px)', lineHeight: 0.84, letterSpacing: '-0.05em', color: 'var(--surface-highlight)' }}>
            {String(shown).replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009')}
          </div>
          <div style={{ fontFamily: 'var(--font-hand)', fontWeight: 700, fontSize: 'clamp(30px, 3.6vw, 54px)', marginTop: '6px', color: 'oklch(0.75 0.11 197)' }}>{caption}</div>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 'var(--leading-body)', margin: 0, opacity: 0.9 }}>{body}</p>
      </div>
    </div>
  );
}
