"use client";

import * as React from "react";
import { useState } from "react";
import { AppLink } from "../core/AppLink";
import { Button } from "../core/Button";
import { site, routes } from "@/lib/site-config";

const link: React.CSSProperties = { fontSize: 14, fontWeight: 500 };

const mobileItem: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: "var(--track-tight)",
  padding: "9px 0",
};

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        background: "oklch(0.972 0.018 92 / 0.88)",
        borderBottom: "var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "14px var(--gut)",
          display: "flex",
          alignItems: "center",
          gap: "var(--header-gap, 36px)",
        }}
      >
        <AppLink
          href={routes.home}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "var(--track-tight)",
            whiteSpace: "nowrap",
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {site.wordmark}
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--surface-accent)", border: "var(--border)" }} />
        </AppLink>

        <nav className="bc-only-wide" style={{ display: "flex", gap: 26, marginLeft: "auto" }}>
          <AppLink href="/#oferta" style={link}>
            Oferta
          </AppLink>
          <AppLink href={routes.wedding} style={link}>
            Wesele
          </AppLink>
          <AppLink href="/#o-nas" style={link}>
            O nas
          </AppLink>
          <AppLink href="/#kontakt" style={link}>
            Kontakt
          </AppLink>
          <AppLink href={site.shop} style={link}>
            Sklep
          </AppLink>
        </nav>

        <Button
          className="bc-only-wide"
          href="/#kontakt"
          size="sm"
          style={{ fontSize: 15, padding: "11px 22px", boxShadow: "var(--shadow-sm)" }}
        >
          Szybka wycena
        </Button>

        <button
          className="bc-only-narrow"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="bc-mobile-menu"
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            width: 46,
            height: 46,
            flex: "none",
            borderRadius: "var(--radius-input)",
            background: "var(--surface-card)",
            border: "var(--border)",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span style={{ width: 20, height: 2, background: "var(--line-ink)" }} />
          <span style={{ width: 20, height: 2, background: "var(--line-ink)" }} />
          <span style={{ width: 20, height: 2, background: "var(--line-ink)" }} />
        </button>
      </div>

      {menuOpen ? (
        <div
          id="bc-mobile-menu"
          className="bc-only-narrow"
          style={{ borderTop: "var(--border)", padding: "14px var(--gut) 22px", display: "flex", flexDirection: "column", gap: 2 }}
        >
          <AppLink href="/#oferta" onClick={close} style={mobileItem}>
            Oferta
          </AppLink>
          <AppLink href={routes.wedding} onClick={close} style={mobileItem}>
            Kawa na wesele
          </AppLink>
          <AppLink href="/#o-nas" onClick={close} style={mobileItem}>
            O nas
          </AppLink>
          <AppLink href="/#kontakt" onClick={close} style={mobileItem}>
            Kontakt
          </AppLink>
          <AppLink href={site.shop} onClick={close} style={mobileItem}>
            Sklep
          </AppLink>
          <Button href={site.phoneHref} fullWidth style={{ marginTop: 10 }}>
            {site.phone}
          </Button>
        </div>
      ) : null}
    </header>
  );
}
