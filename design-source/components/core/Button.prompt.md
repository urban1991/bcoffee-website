One-line: the system's only button — an outlined pill with a hard ink shadow; use `primary` for every real call to action and never introduce a borderless or ghost-fill button.

```jsx
<Button href="#kontakt" size="lg">Szybka wycena</Button>
<Button variant="outline" href="tel:+48604372787">604 372 787</Button>
<Button variant="cream" fullWidth onClick={reveal}>Pokaż numer</Button>
```

Variants: `primary` (turquoise, the default), `gold` (second emphasis), `cream` (on top of a turquoise or gold block), `dark` (inside a gold card), `outline` (tertiary — fills gold on hover instead of lifting), `onPhoto` (over a hero scrim, cream 50% border). Labels are verb-led Polish sentence case: `Szybka wycena`, `Zapytaj o termin`, `Wyślij zapytanie`. Never `Dowiedz się więcej`.
