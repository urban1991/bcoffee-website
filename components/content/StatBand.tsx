"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

/**
 * The dark counter block: a gold number that counts up when it scrolls into view,
 * a handwritten caption under it, and supporting copy on the right.
 */
export interface StatBandProps {
  /** The real total. Never ship an invented figure — flag it if the client has not supplied one. */
  value?: number;
  /** Handwritten line under the number: "zaparzonych kaw". */
  caption?: string;
  /** Copy on the right, ending in a colon because the number completes the sentence. */
  body?: string;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function StatBand({ value = 0, caption = "", body = "", animate = true, className, style, ...rest }: StatBandProps) {
  const [counted, setCounted] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Bez animacji liczba jest czystą pochodną propsa — żadnego stanu do zsynchronizowania.
  const shown = animate ? counted : value;

  useEffect(() => {
    if (!animate) return;

    const el = ref.current;
    let raf = 0;

    const run = () => {
      // prefers-reduced-motion: liczba pojawia się od razu, bez odliczania.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        raf = requestAnimationFrame(() => setCounted(value));
        return;
      }

      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600);
        setCounted(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (!el || typeof IntersectionObserver === "undefined") {
      run();
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, animate]);

  return (
    <div
      className={className}
      style={{
        borderRadius: "var(--radius-block)",
        border: "var(--border)",
        background: "var(--surface-dark)",
        color: "var(--text-on-dark)",
        padding: "var(--pad-block)",
        ...style,
      }}
      {...rest}
    >
      <div className="bc-statband-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "48px", alignItems: "center" }}>
        <div ref={ref}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-display)" as React.CSSProperties["fontWeight"],
              fontSize: "clamp(76px, 12vw, 186px)",
              lineHeight: 0.84,
              letterSpacing: "-0.05em",
              color: "var(--surface-highlight)",
            }}
          >
            {String(shown).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          </div>
          <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "clamp(30px, 3.6vw, 54px)", marginTop: "6px", color: "oklch(0.75 0.11 197)" }}>
            {caption}
          </div>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "17px", lineHeight: "var(--leading-body)", margin: 0, opacity: 0.9 }}>{body}</p>
      </div>
    </div>
  );
}
