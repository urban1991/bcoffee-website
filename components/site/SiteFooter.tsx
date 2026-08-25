import * as React from "react";
import { AppLink } from "../core/AppLink";
import { routes } from "@/lib/routes";
import type { NavOfferPage, SiteSettings } from "@/sanity/types";

const colTitle: React.CSSProperties = {
  fontFamily: "var(--font-hand)",
  fontWeight: 600,
  fontSize: 22,
  color: "var(--text-faint)",
  marginBottom: 12,
};

const item: React.CSSProperties = { color: "var(--text-muted)", fontSize: 14 };

export function SiteFooter({ settings, offerPages }: { settings: SiteSettings; offerPages: NavOfferPage[] }) {
  const shortcuts = [
    { label: "Strona główna", href: routes.home },
    ...offerPages.map((p) => ({ label: p.title, href: `/${p.slug}` })),
    ...(settings.shopUrl ? [{ label: "Sklep", href: settings.shopUrl }] : []),
  ];

  const social = [
    settings.facebookUrl && { label: "Facebook", href: settings.facebookUrl },
    settings.instagramUrl && { label: "Instagram", href: settings.instagramUrl },
    settings.termsUrl && { label: "Regulamin", href: settings.termsUrl },
    settings.privacyUrl && { label: "Polityka prywatności", href: settings.privacyUrl },
  ].filter((x): x is { label: string; href: string } => Boolean(x));

  return (
    <footer style={{ borderTop: "var(--border)" }}>
      <div
        className="bc-grid"
        style={{ maxWidth: "var(--page-max)", margin: "0 auto", padding: "66px var(--gut) 36px", "--cols": "1.4fr 1fr 1fr 1fr" } as React.CSSProperties}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: "var(--track-tight)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {settings.wordmark}
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--surface-accent)", border: "var(--border)" }} />
          </div>
          <p style={{ fontSize: 15, lineHeight: "var(--leading-body)", color: "var(--text-muted)", margin: "16px 0 0", maxWidth: "30ch" }}>
            <strong style={{ fontWeight: 600, color: "var(--text-body)" }}>B. Coffee — be happy</strong> to nasze motto. Zaproś nas na swoje wydarzenie i
            delektuj się pyszną kawą.
          </p>
        </div>

        <div>
          <div style={colTitle}>skróty</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {shortcuts.map((s) => (
              <AppLink key={s.href} href={s.href} className="bc-link" style={item}>
                {s.label}
              </AppLink>
            ))}
          </div>
        </div>

        <div>
          <div style={colTitle}>dane firmy</div>
          <address style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "var(--text-muted)", fontStyle: "normal" }}>
            <span>{settings.legalName}</span>
            {settings.street ? <span>{settings.street}</span> : null}
            {settings.city ? <span>{settings.city}</span> : null}
            {settings.nip ? <span>NIP {settings.nip}</span> : null}
            {settings.regon ? <span>REGON {settings.regon}</span> : null}
          </address>
        </div>

        <div>
          <div style={colTitle}>social media</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {social.map((s) => (
              <AppLink key={s.href} href={s.href} className="bc-link" style={item}>
                {s.label}
              </AppLink>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "22px var(--gut) 44px",
          borderTop: "2px solid var(--line-soft)",
          fontSize: 12,
          color: "var(--text-faint)",
        }}
      >
        © {new Date().getFullYear()} {settings.legalName}
      </div>
    </footer>
  );
}
