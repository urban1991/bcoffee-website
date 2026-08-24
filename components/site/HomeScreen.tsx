import * as React from "react";
import { AppLink } from "../core/AppLink";
import { Button } from "../core/Button";
import { Card } from "../core/Card";
import { Pill } from "../core/Pill";
import { Sticker } from "../core/Sticker";
import { PhotoSlot } from "../media/PhotoSlot";
import { Polaroid } from "../media/Polaroid";
import { Ticker } from "../media/Ticker";
import { OfferCard } from "../content/OfferCard";
import { SectionHeading } from "../content/SectionHeading";
import { StatBand } from "../content/StatBand";
import { site, routes, externalOffers, brewedCoffees, heroVariant } from "@/lib/site-config";

const section: React.CSSProperties = { maxWidth: "var(--page-max)", margin: "0 auto", padding: "0 var(--gut)" };

function HeroFoto() {
  return (
    <section style={{ padding: "26px var(--gut) 0" }}>
      <div
        style={{
          position: "relative",
          minHeight: "var(--hero-min-h)",
          borderRadius: "var(--radius-block)",
          overflow: "hidden",
          border: "var(--border)",
          background: "var(--surface-photo)",
          backgroundImage: "var(--texture-stripes-dark)",
          display: "flex",
          alignItems: "flex-end",
          padding: "var(--hero-pad)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "var(--scrim-photo)" }} />
        <div style={{ position: "absolute", top: 22, right: 26, fontFamily: "var(--font-mono)", fontSize: 11, color: "oklch(1 0 0 / 0.55)" }}>
          zdjęcie pełnoekranowe — bar kawowy w akcji, poziome, min. 2800px
        </div>
        <Sticker className="bc-only-wide" size="lg" style={{ position: "absolute", zIndex: 2, top: "38%", right: 52 }}>
          be
          <br />
          happy
        </Sticker>

        <div style={{ position: "relative", color: "var(--text-on-dark)", maxWidth: 940 }}>
          <Pill tone="onPhoto">Kawiarnia na kółkach</Pill>
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
            Kawa, która
            <br />
            <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "1.08em", letterSpacing: 0, color: "var(--surface-highlight)" }}>
              robi imprezę
            </span>
          </h1>
          <p style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", margin: "24px 0 0", maxWidth: "40ch", opacity: 0.94 }}>
            Targi, wesele, event firmowy — przyjeżdżamy z barem, ekspresem i dobrym humorem. Wy tylko powiedzcie gdzie.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <Button href="#kontakt" size="lg" variant="primary" style={{ border: "2px solid var(--surface-card)", boxShadow: "var(--shadow-inverse)" }}>
              Szybka wycena
            </Button>
            <Button href={site.phoneHref} size="lg" variant="onPhoto">
              {site.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSplit() {
  return (
    <section style={{ ...section, paddingTop: 66 }}>
      <div className="bc-grid" style={{ "--cols": "1fr 1fr", alignItems: "center" } as React.CSSProperties}>
        <div>
          <Pill>Kawiarnia na kółkach</Pill>
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
            Kawa, która
            <br />
            <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "1.08em", letterSpacing: 0, color: "var(--text-accent)" }}>
              robi imprezę
            </span>
          </h1>
          <p style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", color: "var(--text-muted)", margin: "26px 0 0", maxWidth: "38ch" }}>
            Targi, wesele, event firmowy — przyjeżdżamy z barem, ekspresem i dobrym humorem. Wy tylko powiedzcie gdzie.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <Button href="#kontakt" size="lg">
              Szybka wycena
            </Button>
            <Button href={site.phoneHref} size="lg" variant="outline">
              {site.phone}
            </Button>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <Polaroid className="bc-untilt" label="zdjęcie hero — barista, pionowe 4:5" tilt={2} minHeight="clamp(420px, 62vw, 600px)" />
          <Sticker className="bc-only-wide" style={{ position: "absolute", zIndex: 2, top: -22, right: -18 }}>
            be
            <br />
            happy
          </Sticker>
        </div>
      </div>
    </section>
  );
}

export function HomeScreen() {
  return (
    <div id="top">
      {heroVariant === "foto" ? <HeroFoto /> : <HeroSplit />}

      <section style={{ padding: "56px 0 0" }}>
        <Ticker items={["KAWA NA EVENT", "BARISTA NA TARGI", "KAWA NA WESELE", "BAR Z LEMONIADĄ", "BE HAPPY"]} />
      </section>

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
            Kawa to prosta sprawa.
            <br />
            My robimy ją{" "}
            <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "1.15em", letterSpacing: 0, color: "var(--text-accent)" }}>dobrze</span>
          </h2>
          <p style={{ fontSize: 18, lineHeight: "var(--leading-body)", color: "var(--text-muted)", margin: 0 }}>
            Nasi bariści robią kawę i dobrą atmosferę — jedno z drugim idzie w parze. Goście zapamiętają wydarzenie, a przy okazji{" "}
            <strong style={{ fontWeight: 600, color: "var(--text-body)" }}>Waszą markę</strong>.
          </p>
        </div>
      </section>

      <section style={{ ...section, padding: "60px var(--gut)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 22 }}>
          <span style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: 26, color: "var(--text-muted)" }}>parzyliśmy kawę dla</span>
          <span style={{ flex: 1, height: 2, background: "var(--line-soft)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(124px, 1fr))", gap: 12 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 76,
                borderRadius: "var(--radius-tile)",
                border: "var(--border-dashed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text-faint)",
              }}
            >
              logo
            </div>
          ))}
        </div>
      </section>

      <section id="oferta" style={{ ...section, padding: "40px var(--gut) 96px" }}>
        <SectionHeading title="Co robimy" lead="kawa na każdą sytuację, serio każdą" style={{ marginBottom: 40 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(288px, 1fr))", gap: 22 }}>
          <OfferCard className="bc-untilt" title="Kawa na event" href={externalOffers.event} photoLabel="foto — kawa na event" tilt={-1.2} />
          <OfferCard className="bc-untilt" title="Barista na targi" href={externalOffers.fairs} photoLabel="foto — barista na targach" tilt={1} />
          <OfferCard className="bc-untilt" title="Kawa na wesele" href={routes.wedding} photoLabel="foto — bar na weselu" tilt={1.4} />
        </div>
        <OfferCard
          wide
          title="Bar z lemoniadą"
          href={externalOffers.lemonade}
          eyebrow="nie tylko kawa"
          body="Latem kawa nie zawsze wygrywa. Wtedy przyjeżdżamy z lemoniadą."
          photoLabel="foto — bar z lemoniadą"
          style={{ marginTop: 22 }}
        />
      </section>

      <section style={{ padding: "0 var(--gut)" }}>
        <StatBand
          value={brewedCoffees}
          caption="zaparzonych kaw"
          body="Bierzemy każde wyzwanie i pilnujemy, żeby klimat imprezy był na miejscu. Na liczniku mamy już ponad:"
          style={{ maxWidth: "var(--page-max)", margin: "0 auto" }}
        />
      </section>

      <section id="o-nas" style={{ ...section, padding: "100px var(--gut)" }}>
        <div className="bc-grid" style={{ "--cols": "1.05fr 1fr", alignItems: "start", gap: "var(--gap-about, 64px)" } as React.CSSProperties}>
          <div>
            <div style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: 26, color: "var(--text-accent)", marginBottom: 14 }}>trochę o nas</div>
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
              B. Coffee
              <br />
              <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: "0.9em", letterSpacing: 0, color: "var(--text-accent)" }}>
                — be happy
              </span>
            </h2>
            <p style={{ fontSize: "var(--text-lead)", lineHeight: "var(--leading-lead)", color: "var(--text-muted)", margin: "28px 0 0", maxWidth: "40ch" }}>
              To nasze motto. Nasza kawa ma czynić{" "}
              <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 28, marginRight: 5, color: "var(--text-accent)" }}>happy</span>i kropka.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-muted)", margin: "20px 0 0", maxWidth: "46ch" }}>
              W branży jesteśmy od lat i wiemy, że kawa to nie tylko kawa: to uśmiech, dwa miłe słowa i atmosfera. Sprzęt i ziarno traktujemy poważnie. Siebie —
              trochę mniej.
            </p>
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
              Zadbamy o klimat. Wy zadbajcie o gości.
            </Card>
          </div>
          <Polaroid className="bc-untilt" label="zdjęcie zespołu, pionowe 3:4" tilt={-2} minHeight="clamp(440px, 64vw, 620px)" />
        </div>
      </section>

      <section style={{ ...section, padding: "0 var(--gut) 100px" }}>
        <div style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: 26, color: "var(--text-muted)", marginBottom: 20 }}>z ostatnich realizacji</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 22 }}>
          <Polaroid className="bc-untilt" label="foto z eventu 1" tilt={-2} />
          <Polaroid className="bc-untilt" label="foto z eventu 2" tilt={1.6} />
          <Polaroid className="bc-untilt" label="foto z eventu 3" tilt={-1} />
        </div>
      </section>

      <section style={{ padding: "0 var(--gut) 96px" }}>
        <AppLink
          href={site.shop}
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
              do
              <br />
              domu
            </Sticker>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 25, letterSpacing: "var(--track-tight)" }}>
                Nasza kawa u Ciebie w kuchni
              </div>
              <div style={{ fontSize: 15, color: "var(--text-muted)", marginTop: 3 }}>Ziarno, które parzymy na eventach — do kupienia w sklepie.</div>
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
            bcoffee.shop →
          </span>
        </AppLink>
      </section>

      <section style={{ ...section, padding: "0 var(--gut) 96px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 22, flexWrap: "wrap", marginBottom: 20 }}>
          <SectionHeading title="Obserwuj nas," hand="bądź na bieżąco" size="md" />
          <Pill
            tone="outline"
            uppercase={false}
            href={site.instagram}
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, padding: "13px 24px", boxShadow: "var(--shadow-sm)" }}
          >
            @bcoffeebehappy
          </Pill>
        </div>
        <div className="bc-ig-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ border: "var(--border)", borderRadius: "var(--radius-tile)", overflow: "hidden" }}>
              <PhotoSlot label="foto z IG" ratio="1 / 1" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
