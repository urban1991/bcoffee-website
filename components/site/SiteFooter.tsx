import * as React from "react";
import { AppLink } from "../core/AppLink";
import { site, routes } from "@/lib/site-config";

const colTitle: React.CSSProperties = {
  fontFamily: "var(--font-hand)",
  fontWeight: 600,
  fontSize: 22,
  color: "var(--text-faint)",
  marginBottom: 12,
};

const item: React.CSSProperties = { color: "var(--text-muted)", fontSize: 14 };

export function SiteFooter() {
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
            {site.wordmark}
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
            <AppLink href={routes.home} style={item}>
              Strona główna
            </AppLink>
            <AppLink href="/#oferta" style={item}>
              Oferta
            </AppLink>
            <AppLink href={routes.wedding} style={item}>
              Kawa na wesele
            </AppLink>
            <AppLink href={site.shop} style={item}>
              Sklep
            </AppLink>
          </div>
        </div>

        <div>
          <div style={colTitle}>dane firmy</div>
          <address style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "var(--text-muted)", fontStyle: "normal" }}>
            <span>{site.company.legalName}</span>
            <span>{site.company.street}</span>
            <span>{site.company.city}</span>
            <span>NIP {site.company.nip}</span>
            <span>REGON {site.company.regon}</span>
          </address>
        </div>

        <div>
          <div style={colTitle}>social media</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <AppLink href={site.facebook} style={item}>
              Facebook
            </AppLink>
            <AppLink href={site.instagram} style={item}>
              Instagram
            </AppLink>
            <AppLink href={site.legal.terms} style={item}>
              Regulamin
            </AppLink>
            <AppLink href={site.legal.privacy} style={item}>
              Polityka prywatności
            </AppLink>
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
        © {new Date().getFullYear()} {site.company.legalName}
      </div>
    </footer>
  );
}
