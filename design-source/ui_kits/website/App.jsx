function App({ NS }) {
  const [page, setPage] = React.useState('home');
  const [hero, setHero] = React.useState('foto');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [phoneShown, setPhoneShown] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [narrow, setNarrow] = React.useState(() => window.innerWidth < 900);

  React.useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const goHome = (e) => { if (e) e.preventDefault(); setPage('home'); setMenuOpen(false); };
  const goWedding = (e) => { if (e) e.preventDefault(); setPage('wesele'); setMenuOpen(false); window.scrollTo({ top: 0 }); };

  const tab = (active) => ({
    fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
    padding: '9px 16px', borderRadius: 'var(--radius-pill)', border: 'none',
    background: active ? 'var(--surface-accent)' : 'transparent',
    color: active ? 'var(--text-on-accent)' : 'oklch(0.82 0.02 90)'
  });

  return (
    <div>
      <SiteHeader NS={NS} page={page} onHome={goHome} onWedding={goWedding} menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)} onCloseMenu={() => setMenuOpen(false)} isNarrow={narrow} />

      {page === 'home'
        ? <HomeScreen NS={NS} hero={hero} onWedding={goWedding} isNarrow={narrow} />
        : <WeddingScreen NS={NS} onHome={goHome} isNarrow={narrow} />}

      <ContactSection NS={NS} sent={sent} onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        phoneShown={phoneShown} onShowPhone={() => setPhoneShown(true)} isNarrow={narrow} />

      <SiteFooter NS={NS} onHome={goHome} onWedding={goWedding} isNarrow={narrow} />

      {page === 'home' && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 60, display: 'flex', alignItems: 'center', gap: 4, padding: 5, borderRadius: 'var(--radius-pill)', background: 'var(--surface-dark)', border: 'var(--border)', boxShadow: '4px 4px 0 var(--bc-gold)' }}>
          <span style={{ fontFamily: 'var(--font-hand)', fontWeight: 600, fontSize: 18, color: 'oklch(0.85 0.03 90)', padding: '0 8px 0 12px' }}>hero</span>
          <button onClick={() => setHero('foto')} style={tab(hero === 'foto')}>Pełne foto</button>
          <button onClick={() => setHero('split')} style={tab(hero === 'split')}>Split</button>
        </div>
      )}
    </div>
  );
}
