function ContactSection({ NS, sent, onSubmit, phoneShown, onShowPhone, isNarrow }) {
  const { Button, Card, Field, Input, Select, Textarea, Polaroid } = NS;
  const gut = isNarrow ? 'var(--gutter-mobile)' : 'var(--gutter)';

  return (
    <section id="kontakt" style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: `96px ${gut} 100px` }}>
      <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1.3fr 0.85fr', gap: 26, alignItems: 'start' }}>
        <Card radius="block" shadow="2xl" padding={isNarrow ? 26 : 44}>
          <div style={{ fontFamily: 'var(--font-hand)', fontWeight: 600, fontSize: 27, color: 'var(--text-accent)' }}>szybka wycena</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-h3)', lineHeight: 0.94, letterSpacing: 'var(--track-display)', margin: '6px 0 0' }}>Powiedz, co planujesz</h2>
          {sent ? (
            <Card tone="gold" shadow="none" padding={34} style={{ marginTop: 28 }}>
              <div style={{ fontFamily: 'var(--font-hand)', fontWeight: 700, fontSize: 40, lineHeight: 1 }}>dzięki!</div>
              <p style={{ fontSize: 16, lineHeight: 'var(--leading-body)', margin: '8px 0 0' }}>
                Odezwiemy się z wyceną. A jeśli sprawa pilna — dzwoń: <a href="tel:+48604372787" style={{ fontWeight: 600, textDecoration: 'underline' }}>604 372 787</a>.
              </p>
            </Card>
          ) : (
            <form onSubmit={onSubmit} style={{ marginTop: 26, display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1fr 1fr', gap: 'var(--field-gap)' }}>
              <Field label="Data wydarzenia" htmlFor="f-date"><Input id="f-date" type="date" /></Field>
              <Field label="Typ wydarzenia" htmlFor="f-type">
                <Select id="f-type"><option>Event firmowy</option><option>Targi / wystawa</option><option>Wesele</option><option>Impreza prywatna</option><option>Coś innego</option></Select>
              </Field>
              <Field label="Liczba gości" htmlFor="f-guests"><Input id="f-guests" type="number" min={1} placeholder="np. 120" /></Field>
              <Field label="Miejsce / miasto" htmlFor="f-city"><Input id="f-city" placeholder="np. Wrocław" /></Field>
              <Field label="Godziny obsługi" htmlFor="f-hours"><Input id="f-hours" placeholder="np. 16:00 – 22:00" /></Field>
              <Field label="Budżet" htmlFor="f-budget"><Input id="f-budget" placeholder="orientacyjnie" /></Field>
              <Field label="Imię" htmlFor="f-name"><Input id="f-name" /></Field>
              <Field label="Telefon" htmlFor="f-phone"><Input id="f-phone" type="tel" /></Field>
              <Field label="E-mail" htmlFor="f-mail" span="full"><Input id="f-mail" type="email" /></Field>
              <Field label="Wiadomość" htmlFor="f-msg" span="full"><Textarea id="f-msg" rows={4} placeholder="Cokolwiek, co pomoże nam przygotować wycenę" /></Field>
              <div style={{ gridColumn: '1 / -1' }}><Button type="submit" size="lg">Wyślij zapytanie</Button></div>
            </form>
          )}
        </Card>

        <Card tone="accent" radius="block" shadow="2xl" padding={28}>
          <Polaroid label="zdjęcie Wojtka, kwadrat" ratio="1 / 1" tilt={isNarrow ? 0 : -2} style={{ padding: '10px 10px 32px' }} />
          <div style={{ fontFamily: 'var(--font-hand)', fontWeight: 700, fontSize: 36, lineHeight: 1, marginTop: 18, color: 'var(--text-strong)' }}>Wojciech Baranowski</div>
          <div style={{ fontSize: 14, color: 'oklch(0.28 0.04 52)', marginTop: 4 }}>Właściciel, B. Coffee</div>
          {phoneShown ? (
            <Button href="tel:+48604372787" variant="cream" fullWidth style={{ marginTop: 20, fontSize: 30, fontWeight: 800, letterSpacing: 'var(--track-tight)' }}>604 372 787</Button>
          ) : (
            <Button variant="cream" fullWidth onClick={onShowPhone} style={{ marginTop: 20 }}>Pokaż numer</Button>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <Button href="https://www.facebook.com/bcoffeebehappy" variant="outline" size="sm" style={{ flex: 1, borderRadius: 'var(--radius-input)' }}>Facebook</Button>
            <Button href="https://www.instagram.com/bcoffeebehappy/" variant="outline" size="sm" style={{ flex: 1, borderRadius: 'var(--radius-input)' }}>Instagram</Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
