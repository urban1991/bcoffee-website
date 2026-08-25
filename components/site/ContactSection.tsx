"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "../core/Button";
import { Card } from "../core/Card";
import { Polaroid } from "../media/Polaroid";
import { InquiryForm } from "./InquiryForm";
import type { ContactSection as ContactSectionData, SiteSettings } from "@/sanity/types";

interface Props {
  data: ContactSectionData;
  settings: SiteSettings;
}

export function ContactSection({ data, settings }: Props) {
  const [phoneShown, setPhoneShown] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <section id="kontakt" style={{ maxWidth: "var(--page-max)", margin: "0 auto", padding: "96px var(--gut) 100px" }}>
      {/* Bez alignItems obie karty rozciągają się do wysokości wiersza — inaczej
          karta właściciela kończy się w połowie formularza i układ wygląda na urwany. */}
      <div className="bc-grid" style={{ "--cols": "1.3fr 0.85fr", gap: 26 } as React.CSSProperties}>
        <Card radius="block" shadow="2xl" padding="var(--pad-block)">
          {data.eyebrow ? <div style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: 27, color: "var(--text-accent)" }}>{data.eyebrow}</div> : null}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "var(--text-h3)",
              lineHeight: 0.94,
              letterSpacing: "var(--track-display)",
              margin: "6px 0 0",
            }}
          >
            {data.title}
          </h2>

          {sent ? (
            <Card tone="gold" shadow="none" padding={34} style={{ marginTop: 28 }}>
              <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 40, lineHeight: 1 }}>{data.successTitle ?? "dzięki!"}</div>
              <p style={{ fontSize: 16, lineHeight: "var(--leading-body)", margin: "8px 0 0" }}>
                {data.successBody ?? "Odezwiemy się z wyceną. A jeśli sprawa pilna — dzwoń:"}{" "}
                <a href={settings.phoneHref} style={{ fontWeight: 600, textDecoration: "underline" }}>
                  {settings.phone}
                </a>
                .
              </p>
            </Card>
          ) : (
            <InquiryForm
              eventTypes={data.eventTypes ?? []}
              submitLabel={data.submitLabel ?? "Wyślij zapytanie"}
              onSent={() => setSent(true)}
            />
          )}
        </Card>

        <Card tone="accent" radius="block" shadow="2xl" padding={28} style={{ display: "flex", flexDirection: "column" }}>
          <Polaroid
            className="bc-untilt"
            photo={data.ownerPhoto}
            ratio="1 / 1"
            tilt={-2}
            sizes="(max-width: 899px) 100vw, 320px"
            style={{ padding: "10px 10px 32px" }}
          />
          <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 36, lineHeight: 1, marginTop: 18, color: "var(--text-strong)" }}>
            {data.ownerName}
          </div>
          {data.ownerRole ? <div style={{ fontSize: 14, color: "oklch(0.28 0.04 52)", margin: "4px 0 20px" }}>{data.ownerRole}</div> : null}

          {phoneShown ? (
            <Button href={settings.phoneHref} variant="cream" fullWidth style={{ marginTop: "auto", fontSize: 30, fontWeight: 800, letterSpacing: "var(--track-tight)" }}>
              {settings.phone}
            </Button>
          ) : (
            <Button variant="cream" fullWidth onClick={() => setPhoneShown(true)} style={{ marginTop: "auto" }}>
              {data.revealPhoneLabel ?? "Pokaż numer"}
            </Button>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {settings.facebookUrl ? (
              <Button href={settings.facebookUrl} variant="outline" size="sm" style={{ flex: 1, borderRadius: "var(--radius-input)" }}>
                Facebook
              </Button>
            ) : null}
            {settings.instagramUrl ? (
              <Button href={settings.instagramUrl} variant="outline" size="sm" style={{ flex: 1, borderRadius: "var(--radius-input)" }}>
                Instagram
              </Button>
            ) : null}
          </div>
        </Card>
      </div>
    </section>
  );
}
