import * as React from "react";
import { AppLink } from "../core/AppLink";
import { Button } from "../core/Button";
import { Card } from "../core/Card";
import { Pill } from "../core/Pill";
import { Sticker } from "../core/Sticker";
import { CmsPhoto } from "../media/CmsPhoto";
import { LogoImage } from "../media/LogoImage";
import { Polaroid } from "../media/Polaroid";
import { Ticker } from "../media/Ticker";
import { OfferCard } from "../content/OfferCard";
import { SectionHeading } from "../content/SectionHeading";
import { StatBand } from "../content/StatBand";
import type { HomePage, Offer, SiteSettings } from "@/sanity/types";

const section: React.CSSProperties = { maxWidth: "var(--page-max)", margin: "0 auto", padding: "0 var(--gut)" };

/** Naklejka to dwa krótkie słowa łamane <br /> — tak chce design system. */
function stickerContent(lines?: string[] | null) {
  const [first, second] = lines ?? [];
  return (
    <>
      {first}
      {second ? (
        <>
          <br />
          {second}
        </>
      ) : null}
    </>
  );
}

function HeroFoto({ page }: { page: HomePage }) {
  return (
    <section style={{ padding: "26px var(--gut) 0" }}>
      <div
        style={{
          position: "relative",
          minHeight: "var(--hero-min-h)",
          borderRadius: "var(--radius-block)",
          overflow: "hidden",
          border: "var(--border)",
          display: "flex",
          alignItems: "flex-end",
          padding: "var(--hero-pad)",
        }}
      >
        <CmsPhoto
          photo={page.heroPhoto}
          tone="dark"
          fill
          priority
          sizes="100vw"
          style={{ position: "absolute", inset: 0, flex: "none", minHeight: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "var(--scrim-photo)" }} />

        <Sticker className="bc-only-wide" size="lg" style={{ position: "absolute", zIndex: 2, top: "38%", right: 52 }}>
          {stickerContent(page.stickerLines)}
        </Sticker>

        <div style={{ position: "relative", color: "var(--text-on-dark)", maxWidth: 940 }}>
          {page.heroEyebrow ? <Pill tone="onPhoto">{page.heroEyebrow}</Pill> : null}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "var(--text-hero)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--track-display)",
              margin: "20px 0 0",
            }}
          >
            {page.heroTitle}
            <br />
            <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "1.08em", letterSpacing: 0, color: "var(--surface-highlight)" }}>
              {page.heroTitleHand}
            </span>
          </h1>
          {page.heroLead ? (
            <p style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", margin: "24px 0 0", maxWidth: "40ch", opacity: 0.94 }}>
              {page.heroLead}
            </p>
          ) : null}
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            {page.heroCtaPrimary ? (
              <Button
                href={page.heroCtaPrimary.href}
                size="lg"
                variant="primary"
                style={{ border: "2px solid var(--surface-card)", boxShadow: "var(--shadow-inverse)" }}
              >
                {page.heroCtaPrimary.label}
              </Button>
            ) : null}
            {page.heroCtaSecondary ? (
              <Button href={page.heroCtaSecondary.href} size="lg" variant="onPhoto">
                {page.heroCtaSecondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSplit({ page }: { page: HomePage }) {
  return (
    <section style={{ ...section, paddingTop: 66 }}>
      <div className="bc-grid" style={{ "--cols": "1fr 1fr", alignItems: "center" } as React.CSSProperties}>
        <div>
          {page.heroEyebrow ? <Pill>{page.heroEyebrow}</Pill> : null}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "var(--text-h1)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--track-display)",
              margin: "22px 0 0",
            }}
          >
            {page.heroTitle}
            <br />
            <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "1.08em", letterSpacing: 0, color: "var(--text-accent)" }}>
              {page.heroTitleHand}
            </span>
          </h1>
          {page.heroLead ? (
            <p style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", color: "var(--text-muted)", margin: "26px 0 0", maxWidth: "38ch" }}>
              {page.heroLead}
            </p>
          ) : null}
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            {page.heroCtaPrimary ? (
              <Button href={page.heroCtaPrimary.href} size="lg">
                {page.heroCtaPrimary.label}
              </Button>
            ) : null}
            {page.heroCtaSecondary ? (
              <Button href={page.heroCtaSecondary.href} size="lg" variant="outline">
                {page.heroCtaSecondary.label}
              </Button>
            ) : null}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <Polaroid
            className="bc-untilt"
            photo={page.heroPhoto}
            tilt={2}
            minHeight="clamp(420px, 62vw, 600px)"
            priority
            sizes="(max-width: 899px) 100vw, 50vw"
          />
          <Sticker className="bc-only-wide" style={{ position: "absolute", zIndex: 2, top: -22, right: -18 }}>
            {stickerContent(page.stickerLines)}
          </Sticker>
        </div>
      </div>
    </section>
  );
}

export function HomeScreen({ page, offers, settings }: { page: HomePage; offers: Offer[]; settings: SiteSettings }) {
  const wideOffers = offers.filter((o) => o.wide);
  const gridOffers = offers.filter((o) => !o.wide);

  return (
    <div id="top">
      {page.heroVariant === "split" ? <HeroSplit page={page} /> : <HeroFoto page={page} />}

      {page.tickerItems?.length ? (
        <section style={{ padding: "56px 0 0" }}>
          <Ticker items={page.tickerItems} />
        </section>
      ) : null}

      <section style={{ ...section, paddingTop: 84 }}>
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
            {page.introTitle}{" "}
            {page.introTitleHand ? (
              <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "1.15em", letterSpacing: 0, color: "var(--text-accent)" }}>
                {page.introTitleHand}
              </span>
            ) : null}
          </h2>
          <p className="bc-prose" style={{ fontSize: 18, lineHeight: "var(--leading-body)", color: "var(--text-muted)", margin: 0 }}>{page.introBody}</p>
        </div>
      </section>

      {page.clientLogos?.length ? (
        <section style={{ ...section, padding: "60px var(--gut)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 22 }}>
            <span style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: 26, color: "var(--text-muted)" }}>{page.clientsLabel}</span>
            <span style={{ flex: 1, height: 2, background: "var(--line-soft)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(124px, 1fr))", gap: 12 }}>
            {page.clientLogos.map((logo, i) => (
              <LogoImage key={i} photo={logo} />
            ))}
          </div>
        </section>
      ) : null}

      <section id="oferta" style={{ ...section, padding: "40px var(--gut) 96px" }}>
        <SectionHeading title={page.offerTitle ?? undefined} lead={page.offerLead ?? undefined} style={{ marginBottom: 40 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(288px, 1fr))", gap: 22 }}>
          {gridOffers.map((o) => (
            <OfferCard key={o._id} className="bc-untilt" title={o.title} href={o.href} photo={o.photo} tilt={o.tilt ?? -1.2} />
          ))}
        </div>
        {wideOffers.map((o) => (
          <OfferCard
            key={o._id}
            wide
            title={o.title}
            href={o.href}
            photo={o.photo}
            eyebrow={o.eyebrow ?? undefined}
            body={o.body ?? undefined}
            ctaLabel={o.ctaLabel ?? undefined}
            style={{ marginTop: 22 }}
          />
        ))}
      </section>

      <section style={{ padding: "0 var(--gut)" }}>
        <StatBand
          value={page.brewedCoffees}
          caption={page.statCaption ?? ""}
          body={page.statBody ?? ""}
          style={{ maxWidth: "var(--page-max)", margin: "0 auto" }}
        />
      </section>

      <section id="o-nas" style={{ ...section, padding: "100px var(--gut)" }}>
        <div className="bc-grid" style={{ "--cols": "1.05fr 1fr", alignItems: "start", gap: "var(--gap-about)" } as React.CSSProperties}>
          <div>
            {page.aboutEyebrow ? (
              <div style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: 26, color: "var(--text-accent)", marginBottom: 14 }}>
                {page.aboutEyebrow}
              </div>
            ) : null}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "var(--text-h2)",
                lineHeight: 0.9,
                letterSpacing: "var(--track-display)",
                margin: 0,
              }}
            >
              {page.aboutTitle}
              {page.aboutTitleHand ? (
                <>
                  <br />
                  <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "0.9em", letterSpacing: 0, color: "var(--text-accent)" }}>
                    {page.aboutTitleHand}
                  </span>
                </>
              ) : null}
            </h2>
            {page.aboutLead ? (
              <p style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", color: "var(--text-muted)", margin: "28px 0 0", maxWidth: "40ch" }}>
                {page.aboutLead}
              </p>
            ) : null}
            {page.aboutBody ? (
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-muted)", margin: "20px 0 0", maxWidth: "46ch" }}>{page.aboutBody}</p>
            ) : null}
            {page.aboutQuote ? (
              <Card
                tone="gold"
                radius="card"
                shadow="md"
                padding="18px 26px"
                style={{
                  display: "inline-block",
                  marginTop: 34,
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "var(--track-tight)",
                  maxWidth: "24ch",
                  lineHeight: 1.2,
                }}
              >
                {page.aboutQuote}
              </Card>
            ) : null}
          </div>
          <Polaroid className="bc-untilt" photo={page.aboutPhoto} tilt={-2} minHeight="clamp(440px, 64vw, 620px)" sizes="(max-width: 899px) 100vw, 45vw" />
        </div>
      </section>

      {page.galleryPhotos?.length ? (
        <section style={{ ...section, padding: "0 var(--gut) 100px" }}>
          <div style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: 26, color: "var(--text-muted)", marginBottom: 20 }}>{page.galleryLabel}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 22 }}>
            {page.galleryPhotos.map((photo, i) => (
              <Polaroid key={i} className="bc-untilt" photo={photo} tilt={[-2, 1.6, -1][i % 3]} sizes="(max-width: 899px) 100vw, 33vw" />
            ))}
          </div>
        </section>
      ) : null}

      {settings.shopUrl ? (
        <section style={{ padding: "0 var(--gut) 96px" }}>
          <AppLink
            href={settings.shopUrl}
            style={{
              maxWidth: "var(--page-max)",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 26,
              flexWrap: "wrap",
              padding: "26px 34px",
              borderRadius: "var(--radius-block)",
              border: "var(--border-dashed)",
              background: "var(--surface-card)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <Sticker tone="turquoise" size="sm" rotate={-6}>
                {stickerContent(page.shopStickerLines)}
              </Sticker>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 25, letterSpacing: "var(--track-tight)" }}>{page.shopTitle}</div>
                <div style={{ fontSize: 15, color: "var(--text-muted)", marginTop: 3 }}>{page.shopBody}</div>
              </div>
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 16,
                padding: "13px 24px",
                borderRadius: "var(--radius-pill)",
                background: "var(--surface-dark)",
                color: "var(--text-on-dark)",
              }}
            >
              {page.shopCtaLabel}
            </span>
          </AppLink>
        </section>
      ) : null}

      {page.instagramPhotos?.length ? (
        <section style={{ ...section, padding: "0 var(--gut) 96px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 22, flexWrap: "wrap", marginBottom: 20 }}>
            <SectionHeading title={page.instagramTitle ?? undefined} hand={page.instagramTitleHand ?? undefined} size="md" />
            {settings.instagramUrl && settings.instagramHandle ? (
              <Pill
                tone="outline"
                uppercase={false}
                href={settings.instagramUrl}
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, padding: "13px 24px", boxShadow: "var(--shadow-sm)" }}
              >
                {settings.instagramHandle}
              </Pill>
            ) : null}
          </div>
          <div className="bc-ig-grid">
            {page.instagramPhotos.map((photo, i) => (
              <div key={i} style={{ border: "var(--border)", borderRadius: "var(--radius-tile)", overflow: "hidden" }}>
                <CmsPhoto photo={photo} ratio="1 / 1" sizes="(max-width: 899px) 50vw, 33vw" />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
