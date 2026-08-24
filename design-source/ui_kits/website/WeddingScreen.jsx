function WeddingScreen({ NS, onHome, isNarrow }) {
  const { Button, Pill, Card, Polaroid, SectionHeading } = NS;
  const gut = isNarrow ? 'var(--gutter-mobile)' : 'var(--gutter)';
  const section = { maxWidth: 'var(--page-max)', margin: '0 auto', padding: `0 ${gut}` };

  const items = [
    ['01', 'Barista i bar', 'Mobilna kawiarnia, ekspres i pełne wyposażenie. Przywozimy, rozstawiamy i sprzątamy po sobie.'],
    ['02', 'Karta kaw', 'Espresso, cappuccino, latte i napoje mrożone. Mleko roślinne dla gości, którzy je wybierają.'],
    ['03', 'Dopasowanie do przyjęcia', 'Bar wpisujemy w dekorację sali. Godziny obsługi ustalamy pod plan Waszego wieczoru.']
  ];

  return (
    <div id="wesele">
      <section style={{ ...section, paddingTop: 56 }}>
        <a href="#top" onClick={onHome} style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-faint)' }}>← wróć na stronę główną</a>
        <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1fr 1fr', gap: isNarrow ? 30 : 44, alignItems: 'center', marginTop: 26 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-hand)', fontWeight: 600, fontSize: 26, color: 'var(--text-accent)' }}>oferta weselna</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-h1)', lineHeight: 0.9, letterSpacing: 'var(--track-display)', margin: '16px 0 0' }}>
              Kawa<br />
              <span style={{ fontFamily: 'var(--font-hand)', fontWeight: 700, fontSize: '1.02em', letterSpacing: 0, color: 'var(--text-accent)' }}>na wesele</span>
            </h1>
            <p style={{ fontSize: 'var(--text-lead)', lineHeight: 'var(--leading-lead)', color: 'var(--text-muted)', margin: '26px 0 0', maxWidth: '40ch' }}>
              Mobilna kawiarnia i barista na Waszym przyjęciu. Kawa dla gości od pierwszego toastu do ostatniego tańca. Ciocia będzie zachwycona.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
              <Button href="#kontakt" size="lg">Zapytaj o termin</Button>
              <Button href="tel:+48604372787" size="lg" variant="outline">604 372 787</Button>
            </div>
          </div>
          <Polaroid label="zdjęcie z wesela — bar w dekoracji, pionowe 4:5" tilt={isNarrow ? 0 : 2} minHeight={isNarrow ? 420 : 580} />
        </div>
      </section>

      <section style={{ ...section, paddingTop: 88 }}>
        <SectionHeading title="Co obejmuje obsługa" size="md" style={{ marginBottom: 36 }} />
        <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
          {items.map(([n, title, body]) => (
            <Card key={n} padding="28px 26px" shadow="lg">
              <div style={{ fontFamily: 'var(--font-hand)', fontWeight: 700, fontSize: 38, color: 'var(--text-accent)', lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, marginTop: 10, letterSpacing: 'var(--track-tight)' }}>{title}</div>
              <p style={{ fontSize: 15, lineHeight: 'var(--leading-body)', color: 'var(--text-muted)', margin: '8px 0 0' }}>{body}</p>
            </Card>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', margin: '18px 0 0' }}>↑ opisy do potwierdzenia — uzupełnij zakresem, który faktycznie oferujesz</p>
      </section>

      <section style={{ ...section, paddingTop: 84 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: 22 }}>
          <Polaroid label="foto weselne 1" ratio="3 / 4" tilt={isNarrow ? 0 : -2} />
          <Polaroid label="foto weselne 2" ratio="3 / 4" tilt={isNarrow ? 0 : 1.8} />
          <Polaroid label="foto weselne 3" ratio="3 / 4" tilt={isNarrow ? 0 : -1.2} />
        </div>
      </section>
    </div>
  );
}
