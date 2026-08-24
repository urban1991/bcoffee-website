"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "../core/Button";
import { Card } from "../core/Card";
import { Field } from "../forms/Field";
import { Input } from "../forms/Input";
import { Select } from "../forms/Select";
import { Textarea } from "../forms/Textarea";
import { Polaroid } from "../media/Polaroid";
import { site } from "@/lib/site-config";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [phoneShown, setPhoneShown] = useState(false);

  // TODO: formularz nie ma backendu — submit tylko przełącza stan, tak jak w kicie.
  // Docelowo: Server Action albo POST na endpoint mailowy + walidacja + honeypot/captcha.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="kontakt" style={{ maxWidth: "var(--page-max)", margin: "0 auto", padding: "96px var(--gut) 100px" }}>
      <div className="bc-grid" style={{ "--cols": "1.3fr 0.85fr", gap: 26, alignItems: "start" } as React.CSSProperties}>
        <Card radius="block" shadow="2xl" padding="var(--pad-block)">
          <div style={{ fontFamily: "var(--font-hand)", fontWeight: 600, fontSize: 27, color: "var(--text-accent)" }}>szybka wycena</div>
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
            Powiedz, co planujesz
          </h2>

          {sent ? (
            <Card tone="gold" shadow="none" padding={34} style={{ marginTop: 28 }}>
              <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 40, lineHeight: 1 }}>dzięki!</div>
              <p style={{ fontSize: 16, lineHeight: "var(--leading-body)", margin: "8px 0 0" }}>
                Odezwiemy się z wyceną. A jeśli sprawa pilna — dzwoń:{" "}
                <a href={site.phoneHref} style={{ fontWeight: 600, textDecoration: "underline" }}>
                  {site.phone}
                </a>
                .
              </p>
            </Card>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bc-grid"
              style={{ marginTop: 26, "--cols": "1fr 1fr", gap: "var(--field-gap)" } as React.CSSProperties}
            >
              <Field label="Data wydarzenia" htmlFor="f-date">
                <Input id="f-date" name="data" type="date" />
              </Field>
              <Field label="Typ wydarzenia" htmlFor="f-type">
                <Select id="f-type" name="typ" defaultValue="Event firmowy">
                  <option>Event firmowy</option>
                  <option>Targi / wystawa</option>
                  <option>Wesele</option>
                  <option>Impreza prywatna</option>
                  <option>Coś innego</option>
                </Select>
              </Field>
              <Field label="Liczba gości" htmlFor="f-guests">
                <Input id="f-guests" name="goscie" type="number" min={1} placeholder="np. 120" />
              </Field>
              <Field label="Miejsce / miasto" htmlFor="f-city">
                <Input id="f-city" name="miasto" placeholder="np. Wrocław" />
              </Field>
              <Field label="Godziny obsługi" htmlFor="f-hours">
                <Input id="f-hours" name="godziny" placeholder="np. 16:00 – 22:00" />
              </Field>
              <Field label="Budżet" htmlFor="f-budget">
                <Input id="f-budget" name="budzet" placeholder="orientacyjnie" />
              </Field>
              <Field label="Imię" htmlFor="f-name">
                <Input id="f-name" name="imie" autoComplete="given-name" />
              </Field>
              <Field label="Telefon" htmlFor="f-phone">
                <Input id="f-phone" name="telefon" type="tel" autoComplete="tel" />
              </Field>
              <Field label="E-mail" htmlFor="f-mail" span="full">
                <Input id="f-mail" name="email" type="email" autoComplete="email" required />
              </Field>
              <Field label="Wiadomość" htmlFor="f-msg" span="full">
                <Textarea id="f-msg" name="wiadomosc" rows={4} placeholder="Cokolwiek, co pomoże nam przygotować wycenę" />
              </Field>
              <div style={{ gridColumn: "1 / -1" }}>
                <Button type="submit" size="lg">
                  Wyślij zapytanie
                </Button>
              </div>
            </form>
          )}
        </Card>

        <Card tone="accent" radius="block" shadow="2xl" padding={28}>
          <Polaroid className="bc-untilt" label="zdjęcie Wojtka, kwadrat" ratio="1 / 1" tilt={-2} style={{ padding: "10px 10px 32px" }} />
          <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 36, lineHeight: 1, marginTop: 18, color: "var(--text-strong)" }}>
            {site.owner}
          </div>
          <div style={{ fontSize: 14, color: "oklch(0.28 0.04 52)", marginTop: 4 }}>Właściciel, {site.name}</div>

          {phoneShown ? (
            <Button href={site.phoneHref} variant="cream" fullWidth style={{ marginTop: 20, fontSize: 30, fontWeight: 800, letterSpacing: "var(--track-tight)" }}>
              {site.phone}
            </Button>
          ) : (
            <Button variant="cream" fullWidth onClick={() => setPhoneShown(true)} style={{ marginTop: 20 }}>
              Pokaż numer
            </Button>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <Button href={site.facebook} variant="outline" size="sm" style={{ flex: 1, borderRadius: "var(--radius-input)" }}>
              Facebook
            </Button>
            <Button href={site.instagram} variant="outline" size="sm" style={{ flex: 1, borderRadius: "var(--radius-input)" }}>
              Instagram
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
