"use client";

import * as React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

/** Spacja cienka (U+2009) jako separator tysięcy — tak robi to design system. */
function format(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u2009");
}

/** useLayoutEffect na serwerze wypisuje ostrzeżenie; tam i tak nie ma czego mierzyć. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function StatBand({ value = 0, caption = "", body = "", animate = true, className, style, ...rest }: StatBandProps) {
  /**
   * `null` znaczy „jeszcze nie animujemy" i renderuje prawdziwą liczbę. Dzięki temu
   * HTML z serwera zawiera właściwą wartość — inaczej Google i użytkownicy bez JS
   * widzieliby „0 zaparzonych kaw", czyli nieprawdę o marce.
   */
  const [counted, setCounted] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const shown = counted ?? value;

  /**
   * Rozmiar liczby musi zależeć od tego, ile ma znaków. Przy stałym maksimum
   * „50 000" mieści się w kolumnie, a „500 000" już z niej wychodzi i nachodzi
   * na tekst obok. Liczymy znaki wartości KOŃCOWEJ, nie bieżącej — inaczej
   * krój zmieniałby się w trakcie odliczania.
   */
  const finalChars = format(value).length;

  // Zerujemy licznik przed pierwszym malowaniem i tylko wtedy, gdy blok jest poza
  // ekranem — gdyby był już widoczny, użytkownik zobaczyłby mignięcie liczby i skok do zera.
  useIsomorphicLayoutEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) setCounted(0);
  }, [animate]);

  useEffect(() => {
    if (!animate) return;

    const el = ref.current;
    let raf = 0;

    const run = () => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600);
        setCounted(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
        <div ref={ref} style={{ containerType: "inline-size", minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-display)" as React.CSSProperties["fontWeight"],
              // 100cqi to pełna szerokość kolumny; 0.58em to średnia szerokość znaku
              // w tym kroju przy tym trackingu. Cokolwiek dłuższego samo się zmniejszy,
              // zamiast wyjść poza kolumnę.
              fontSize: `min(clamp(76px, 12vw, 186px), calc(100cqi / (${finalChars} * 0.58)))`,
              lineHeight: 0.84,
              letterSpacing: "-0.05em",
              color: "var(--surface-highlight)",
              // Bez tego cyfry drgają w trakcie odliczania — każda ma inną szerokość.
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
            }}
          >
            {format(shown)}
          </div>
          <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "clamp(30px, 3.6vw, 54px)", marginTop: "6px", color: "oklch(0.75 0.11 197)" }}>
            {caption}
          </div>
        </div>
        <p className="bc-prose" style={{ fontFamily: "var(--font-body)", fontSize: "17px", lineHeight: "var(--leading-body)", margin: 0, opacity: 0.9 }}>{body}</p>
      </div>
    </div>
  );
}
