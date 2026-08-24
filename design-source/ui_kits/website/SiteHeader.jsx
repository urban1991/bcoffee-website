function SiteHeader({ NS, page, onHome, onWedding, menuOpen, onToggleMenu, onCloseMenu, isNarrow }) {
  const { Button } = NS;
  const link = { fontSize: 14, fontWeight: 500 };
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)', background: 'oklch(0.972 0.018 92 / 0.88)', borderBottom: 'var(--border)' }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: isNarrow ? '14px var(--gutter-mobile)' : '14px var(--gutter)', display: 'flex', alignItems: 'center', gap: isNarrow ? 14 : 36 }}>
        <a href="#top" onClick={onHome} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: 'var(--track-tight)', whiteSpace: 'nowrap', flex: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          B. COFFEE<span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--surface-accent)', border: 'var(--border)' }} />
        </a>
        {!isNarrow && (
          <nav style={{ display: 'flex', gap: 26, marginLeft: 'auto' }}>
            <a href="#oferta" onClick={onHome} style={link}>Oferta</a>
            <a href="#wesele" onClick={onWedding} style={link}>Wesele</a>
            <a href="#o-nas" onClick={onHome} style={link}>O nas</a>
            <a href="#kontakt" style={link}>Kontakt</a>
            <a href="https://bcoffee.shop" style={link}>Sklep</a>
          </nav>
        )}
        {!isNarrow && <Button href="#kontakt" size="sm" style={{ fontSize: 15, padding: '11px 22px', boxShadow: 'var(--shadow-sm)' }}>Szybka wycena</Button>}
        {isNarrow && (
          <button onClick={onToggleMenu} aria-label="Menu" style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, width: 46, height: 46, flex: 'none', borderRadius: 'var(--radius-input)', background: 'var(--surface-card)', border: 'var(--border)', cursor: 'pointer', padding: 0 }}>
            <span style={{ width: 20, height: 2, background: 'var(--line-ink)' }} />
            <span style={{ width: 20, height: 2, background: 'var(--line-ink)' }} />
            <span style={{ width: 20, height: 2, background: 'var(--line-ink)' }} />
          </button>
        )}
      </div>
      {isNarrow && menuOpen && (
        <div style={{ borderTop: 'var(--border)', padding: '14px var(--gutter-mobile) 22px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[['Oferta', onHome], ['Kawa na wesele', onWedding], ['O nas', onHome], ['Kontakt', onCloseMenu]].map(([label, fn]) => (
            <a key={label} href="#" onClick={fn} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: 'var(--track-tight)', padding: '9px 0' }}>{label}</a>
          ))}
          <a href="https://bcoffee.shop" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, letterSpacing: 'var(--track-tight)', padding: '9px 0' }}>Sklep</a>
          <Button href="tel:+48604372787" fullWidth style={{ marginTop: 10 }}>604 372 787</Button>
        </div>
      )}
    </header>
  );
}
