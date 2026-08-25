"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { AppLink } from "../core/AppLink";
import { Button } from "../core/Button";
import { OfferMenu } from "./OfferMenu";
import { routes } from "@/lib/routes";
import type { NavOfferPage, SiteSettings } from "@/sanity/types";

/* 16px zamiast 14px: przy 14 linki ginęły obok wordmarku i dawały ciasny cel
   dotykowy. Razem z paddingiem z .bc-link pastylka ma ~38px wysokości. */
const link: React.CSSProperties = { fontSize: 16, fontWeight: 500 };

/* Padding poziomy daje oddech złotemu wypełnieniu, ujemny margines cofa go tak,
   żeby tekst pozostał wyrównany do krawędzi menu. */
const mobileItem: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: "var(--track-tight)",
  padding: "9px 12px",
  margin: "0 -12px",
  borderRadius: "var(--radius-input)",
};

const mobileSubItem: React.CSSProperties = {
  ...mobileItem,
  fontWeight: 600,
  fontSize: 18,
  color: "var(--text-muted)",
  padding: "7px 12px 7px 30px",
};

interface Props {
  settings: SiteSettings;
  offerPages: NavOfferPage[];
}

export function SiteHeader({ settings, offerPages }: Props) {
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
          gap: "var(--header-gap)",
        }}
      >
        <AppLink
          href={routes.home}
          aria-label={settings.siteName}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "var(--track-tight)",
            whiteSpace: "nowrap",
            flex: "none",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Roundel niesie markę, wordmark czytelność: design system odradzał sam
              roundel w nagłówku, bo jego pismo jest nieczytelne w tej skali. */}
          <Image
            src={settings.logo?.url ?? "/logo-bcoffee.webp"}
            alt=""
            width={46}
            height={46}
            priority
            unoptimized={settings.logo?.mimeType === "image/svg+xml"}
            style={{ width: 46, height: 46, flex: "none", borderRadius: "50%" }}
          />
          <span>{settings.wordmark}</span>
        </AppLink>

        <nav className="bc-only-wide" style={{ display: "flex", alignItems: "center", gap: 26, marginLeft: "auto" }}>
          <OfferMenu pages={offerPages} linkStyle={link} />
          <AppLink href="/#o-nas" className="bc-link" style={link}>
            O nas
          </AppLink>
          <AppLink href="/#kontakt" className="bc-link" style={link}>
            Kontakt
          </AppLink>
          {settings.shopUrl ? (
            <AppLink href={settings.shopUrl} className="bc-link" style={link}>
              Sklep
            </AppLink>
          ) : null}
        </nav>

        <Button className="bc-only-wide" href="/#kontakt" size="sm" style={{ fontSize: 15, padding: "11px 22px", boxShadow: "var(--shadow-sm)" }}>
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
          {/* Na telefonie oferta jest rozwinięta od razu — chowanie jej za drugim
              kliknięciem tylko wydłuża drogę do podstron. */}
          <AppLink href="/#oferta" onClick={close} className="bc-menu-item" style={mobileItem}>
            Oferta
          </AppLink>
          {offerPages.map((page) => (
            <AppLink key={page.slug} href={`/${page.slug}`} onClick={close} className="bc-menu-item" style={mobileSubItem}>
              {page.title}
            </AppLink>
          ))}

          <AppLink href="/#o-nas" onClick={close} className="bc-menu-item" style={mobileItem}>
            O nas
          </AppLink>
          <AppLink href="/#kontakt" onClick={close} className="bc-menu-item" style={mobileItem}>
            Kontakt
          </AppLink>
          {settings.shopUrl ? (
            <AppLink href={settings.shopUrl} onClick={close} className="bc-menu-item" style={mobileItem}>
              Sklep
            </AppLink>
          ) : null}

          <Button href={settings.phoneHref} fullWidth style={{ marginTop: 10 }}>
            {settings.phone}
          </Button>
        </div>
      ) : null}
    </header>
  );
}
