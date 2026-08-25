"use client";

import * as React from "react";
import { useEffect, useId, useRef, useState } from "react";
import { AppLink } from "../core/AppLink";
import type { NavOfferPage } from "@/sanity/types";

/**
 * Rozwijane „Oferta" w nawigacji.
 *
 * Otwiera się najechaniem (wygodne myszą) i kliknięciem lub Enterem (konieczne
 * z klawiatury i na dotyku). Escape zamyka, kliknięcie poza panelem też. Linki są
 * zwykłymi <a> w DOM, więc Tab przechodzi przez nie naturalnie — bez przechwytywania
 * strzałek i ręcznego zarządzania fokusem.
 *
 * Hover obsługujemy przez pointer events z filtrem `pointerType === "mouse"`.
 * Przeglądarki dotykowe emitują mouseenter tuż przed click, więc na `onMouseEnter`
 * tapnięcie otwierało panel, a następujący po nim toggle natychmiast go zamykał —
 * menu było nieużywalne na tablecie i laptopie z ekranem dotykowym.
 */
export function OfferMenu({ pages, linkStyle }: { pages: NavOfferPage[]; linkStyle: React.CSSProperties }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  if (!pages.length) {
    return (
      <AppLink href="/#oferta" className="bc-link" style={linkStyle}>
        Oferta
      </AppLink>
    );
  }

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative" }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setOpen(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="bc-link"
        style={{
          ...linkStyle,
          fontFamily: "var(--font-body)",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-body)",
        }}
      >
        Oferta
        <span
          aria-hidden="true"
          style={{
            fontSize: 13,
            lineHeight: 1,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform var(--dur-fast) var(--ease)",
          }}
        >
          ▾
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          style={{
            position: "absolute",
            top: "calc(100% + 14px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 60,
            minWidth: 236,
            padding: 8,
            borderRadius: "var(--radius-card)",
            border: "var(--border)",
            background: "var(--surface-card)",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Pasek łączący przycisk z panelem — bez niego kursor gubi hover w szczelinie. */}
          <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: -14, height: 14 }} />

          {pages.map((page) => (
            <AppLink
              key={page.slug}
              href={`/${page.slug}`}
              onClick={() => setOpen(false)}
              className="bc-menu-item"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "var(--track-tight)",
                padding: "10px 14px",
                borderRadius: "var(--radius-input)",
                whiteSpace: "nowrap",
              }}
            >
              {page.title}
            </AppLink>
          ))}

          <AppLink
            href="/#oferta"
            onClick={() => setOpen(false)}
            className="bc-menu-item"
            style={{
              fontFamily: "var(--font-hand)",
              fontWeight: 600,
              fontSize: 19,
              color: "var(--text-muted)",
              padding: "6px 14px 8px",
              borderTop: "2px solid var(--line-soft)",
              marginTop: 4,
            }}
          >
            wszystko naraz
          </AppLink>
        </div>
      ) : null}
    </div>
  );
}
