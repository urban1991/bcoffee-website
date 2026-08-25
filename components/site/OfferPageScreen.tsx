import * as React from "react";
import { AppLink } from "../core/AppLink";
import { Button } from "../core/Button";
import { Card } from "../core/Card";
import { Pill } from "../core/Pill";
import { Polaroid } from "../media/Polaroid";
import { SectionHeading } from "../content/SectionHeading";
import { routes } from "@/lib/routes";
import type { OfferPage, OfferSection } from "@/sanity/types";

const section: React.CSSProperties = { maxWidth: "var(--page-max)", margin: "0 auto", padding: "0 var(--gut)" };

/**
 * Blok „tekst + zdjęcie". Kolejne bloki mają odwróconą kolejność kolumn — inaczej
 * strona z dwoma sekcjami czyta się jak dwa razy ten sam kafel.
 */
function Section({ data, flipped, index }: { data: OfferSection; flipped: boolean; index: number }) {
  const text = (
    <div>
      {data.eyebrow ? (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-label)",
            fontWeight: 600,
            letterSpacing: "var(--track-eyebrow)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 12,
          }}
        >
          {data.eyebrow}
        </div>
      ) : null}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-display)" as React.CSSProperties["fontWeight"],
          fontSize: "var(--text-h3)",
          letterSpacing: "var(--track-display)",
          lineHeight: "var(--leading-heading)",
          margin: 0,
        }}
      >
        {data.title}
        {data.hand ? (
          <>
            <br />
            <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "1.05em", letterSpacing: 0, color: "var(--text-accent)" }}>
              {data.hand}
            </span>
          </>
        ) : null}
      </h2>
      {data.body ? (
        <p style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", color: "var(--text-muted)", margin: "24px 0 0", maxWidth: "44ch" }}>
          {data.body}
        </p>
      ) : null}
      {data.bullets?.length ? (
        <ul style={{ display: "flex", flexWrap: "wrap", gap: 10, listStyle: "none", padding: 0, margin: "26px 0 0" }}>
          {data.bullets.map((b, i) => (
            <li key={`${i}-${b}`}>
              <Pill uppercase={false} style={{ fontSize: 14, padding: "9px 16px" }}>
                {b}
              </Pill>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  const photo = <Polaroid className="bc-untilt" photo={data.photo} tilt={flipped ? -2 : 2} ratio="4 / 3" sizes="(max-width: 899px) 100vw, 50vw" />;

  return (
    <section style={{ ...section, paddingTop: index === 0 ? 88 : 96 }}>
      <div className="bc-grid" style={{ "--cols": "1fr 1fr", alignItems: "center" } as React.CSSProperties}>
        {flipped ? (
          <>
            {photo}
            {text}
          </>
        ) : (
          <>
            {text}
            {photo}
          </>
        )}
      </div>
    </section>
  );
}

export function OfferPageScreen({ page }: { page: OfferPage }) {
  return (
    <div>
      <section style={{ ...section, paddingTop: 56 }}>
        <AppLink href={routes.home} className="bc-link" style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)" }}>
          ← wróć na stronę główną
        </AppLink>

        <div className="bc-grid" style={{ "--cols": "1fr 1fr", alignItems: "center", marginTop: 26 } as React.CSSProperties}>
          <div>
            {page.eyebrow ? (
              <div style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: 26, color: "var(--text-accent)" }}>{page.eyebrow}</div>
            ) : null}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "var(--text-h1)",
                lineHeight: 0.9,
                letterSpacing: "var(--track-display)",
                margin: "16px 0 0",
              }}
            >
              {page.heroTitle}
              {page.heroTitleHand ? (
                <>
                  <br />
                  <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "1.02em", letterSpacing: 0, color: "var(--text-accent)" }}>
                    {page.heroTitleHand}
                  </span>
                </>
              ) : null}
            </h1>
            {page.lead ? (
              <p style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", color: "var(--text-muted)", margin: "26px 0 0", maxWidth: "40ch" }}>
                {page.lead}
              </p>
            ) : null}
            <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
              {page.ctaPrimary ? (
                <Button href={page.ctaPrimary.href} size="lg">
                  {page.ctaPrimary.label}
                </Button>
              ) : null}
              {page.ctaSecondary ? (
                <Button href={page.ctaSecondary.href} size="lg" variant="outline">
                  {page.ctaSecondary.label}
                </Button>
              ) : null}
            </div>
          </div>
          <Polaroid
            className="bc-untilt"
            photo={page.heroPhoto}
            tilt={2}
            minHeight="clamp(420px, 60vw, 580px)"
            priority
            sizes="(max-width: 899px) 100vw, 50vw"
          />
        </div>
      </section>

      {page.pillars?.length ? (
        <section style={{ ...section, paddingTop: 72 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {page.pillars.map((p, i) => (
              <Card key={`${i}-${p}`} tone="paper" padding="22px 24px" shadow="md" tilt={i % 2 === 0 ? -0.8 : 0.8} className="bc-untilt">
                <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 30, color: "var(--text-accent)", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginTop: 10, letterSpacing: "var(--track-tight)", lineHeight: 1.25 }}>
                  {p}
                </div>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {page.introTitle || page.introBody ? (
        <section style={{ ...section, paddingTop: 88 }}>
          <div className="bc-grid" style={{ "--cols": "1fr 1fr", alignItems: "start" } as React.CSSProperties}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "var(--text-h3)",
                lineHeight: 1.02,
                letterSpacing: "var(--track-display)",
                margin: 0,
              }}
            >
              {page.introTitle}
              {page.introTitleHand ? (
                <>
                  <br />
                  <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "1.1em", letterSpacing: 0, color: "var(--text-accent)" }}>
                    {page.introTitleHand}
                  </span>
                </>
              ) : null}
            </h2>
            <p className="bc-prose" style={{ fontSize: 18, lineHeight: "var(--leading-body)", color: "var(--text-muted)", margin: 0 }}>{page.introBody}</p>
          </div>
        </section>
      ) : null}

      {page.sections?.map((s, i) => (
        <Section key={s._key} data={s} flipped={i % 2 === 1} index={i} />
      ))}

      {page.cards?.length ? (
        <section style={{ ...section, paddingTop: 88 }}>
          <SectionHeading title={page.cardsTitle ?? undefined} size="md" style={{ marginBottom: 36 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {page.cards.map((c) => (
              <Card key={c._key} padding="28px 26px" shadow="lg">
                <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 38, color: "var(--text-accent)", lineHeight: 1 }}>{c.number}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 21, marginTop: 10, letterSpacing: "var(--track-tight)" }}>
                  {c.title}
                </div>
                <p style={{ fontSize: 15, lineHeight: "var(--leading-body)", color: "var(--text-muted)", margin: "8px 0 0" }}>{c.body}</p>
              </Card>
            ))}
          </div>
          {page.cardsNote ? (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", margin: "18px 0 0" }}>{page.cardsNote}</p>
          ) : null}
        </section>
      ) : null}

      {page.galleryPhotos?.length ? (
        <section style={{ ...section, paddingTop: 84 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 22 }}>
            {page.galleryPhotos.map((photo, i) => (
              <Polaroid key={i} className="bc-untilt" photo={photo} ratio="3 / 4" tilt={[-2, 1.8, -1.2][i % 3]} sizes="(max-width: 899px) 100vw, 33vw" />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
