function SiteFooter({ NS, onHome, onWedding, isNarrow }) {
  const gut = isNarrow ? 'var(--gutter-mobile)' : 'var(--gutter)';
  const colTitle = { fontFamily: 'var(--font-hand)', fontWeight: 600, fontSize: 22, color: 'var(--text-faint)', marginBottom: 12 };
  const item = { color: 'var(--text-muted)', fontSize: 14 };

  return (
    <footer style={{ borderTop: 'var(--border)' }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: `66px ${gut} 36px`, display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1.4fr 1fr 1fr 1fr', gap: 44 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: 'var(--track-tight)', display: 'flex', alignItems: 'center', gap: 8 }}>
            B. COFFEE<span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--surface-accent)', border: 'var(--border)' }} />
          </div>
          <p style={{ fontSize: 15, lineHeight: 'var(--leading-body)', color: 'var(--text-muted)', margin: '16px 0 0', maxWidth: '30ch' }}>
            <strong style={{ fontWeight: 600, color: 'var(--text-body)' }}>B. Coffee — be happy</strong> to nasze motto. Zaproś nas na swoje wydarzenie i delektuj się pyszną kawą.
          </p>
        </div>
        <div>
          <div style={colTitle}>skróty</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="#top" onClick={onHome} style={item}>Strona główna</a>
            <a href="#oferta" onClick={onHome} style={item}>Oferta</a>
            <a href="#wesele" onClick={onWedding} style={item}>Kawa na wesele</a>
            <a href="https://bcoffee.shop" style={item}>Sklep</a>
          </div>
        </div>
        <div>
          <div style={colTitle}>dane firmy</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, color: 'var(--text-muted)' }}>
            <span>B. COFFEE Wojciech Baranowski</span>
            <span>Strzelce 4</span>
            <span>58-124 Marcinowice</span>
            <span>NIP 8842756984</span>
            <span>REGON 362425207</span>
          </div>
        </div>
        <div>
          <div style={colTitle}>social media</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="https://www.facebook.com/bcoffeebehappy" style={item}>Facebook</a>
            <a href="https://www.instagram.com/bcoffeebehappy" style={item}>Instagram</a>
            <a href="https://bcoffee.pl/regulamin-strony" style={item}>Regulamin</a>
            <a href="https://bcoffee.pl/polityka-prywatnosci" style={item}>Polityka prywatności</a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: `22px ${gut} 44px`, borderTop: '2px solid var(--line-soft)', fontSize: 12, color: 'var(--text-faint)' }}>© 2026 B. Coffee Wojciech Baranowski</div>
    </footer>
  );
}
