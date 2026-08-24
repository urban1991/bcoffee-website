# bcoffee-website

Implementacja redesignu bcoffee.pl w Next.js, zbudowana na design systemie
„B. Coffee" wyeksportowanym z Claude Design.

```bash
npm run dev
```

## Skąd wziął się design

Źródłem jest projekt Claude Design `bb394e20-a820-4b79-a119-2f8c3f50ac69`.
Cały jego kontent (89 plików) leży w [`design-source/`](design-source) jako
materiał referencyjny — tokeny, komponenty `.jsx`, karty guidelines, ui kit
i trzy warianty canvas (`B Coffee.dc.html` v1 ciemna, `v2` jasna, `v3` — wersja
kanoniczna, z której system został wyekstrahowany).

`design-source/` **nie jest kodem aplikacji** — jest wyłączone z ESLinta i nie
trafia do bundla. Służy do porównania przy zmianach w designie.

## Struktura

| Ścieżka | Co |
| --- | --- |
| `app/layout.tsx` | Fonty (`next/font`), metadata, header + footer |
| `app/page.tsx` | Strona główna |
| `app/kawa-na-wesele/page.tsx` | Podstrona weselna |
| `styles/tokens/` | Tokeny 1:1 z design systemu — kolory, typografia, spacing, borders, shadows, motion, texture, base |
| `styles/layout.css` | Warstwa responsywna (patrz niżej) |
| `components/core/` | `Button`, `Card`, `Pill`, `Sticker`, `AppLink` |
| `components/forms/` | `Field`, `Input`, `Select`, `Textarea` |
| `components/media/` | `PhotoSlot`, `Polaroid`, `Ticker` |
| `components/content/` | `SectionHeading`, `OfferCard`, `StatBand` |
| `components/site/` | Ekrany: header, home, wesele, kontakt, footer |
| `lib/site-config.ts` | Dane firmowe, telefon, licznik, wariant hero |

## Czym port różni się od kitu

Komponenty przeniesione są 1:1 — te same inline style oparte na CSS variables,
te same nazwy propsów, typy przepisane z dostarczonych plików `.d.ts`.
Zmiany dotyczą wyłącznie rzeczy, które w Next.js musiały wyglądać inaczej:

- **Responsywność.** Kit liczył `isNarrow` z `window.innerWidth` i przekazywał
  przez propsy. Przy SSR pierwszy render nie zna szerokości okna, więc te same
  przełączenia robią media queries w `styles/layout.css` (próg 900px, ten sam
  co w kicie). Zwijanie kolumn steruje się przez `.bc-grid` + `--cols`.
- **Routing.** Kit przełączał widoki stanem (`page === 'home' | 'wesele'`).
  Tutaj są prawdziwe trasy, a linki wewnętrzne idą przez `next/link` (`AppLink`).
- **Fonty.** `@import` z CDN Google Fonts zastąpił `next/font/google` —
  self-hosting, brak render-blockingu, fallback bez CLS.
- **Poprawki responsywne, których kit nie miał.** Siatka wewnątrz `StatBand`
  i szerokiej `OfferCard` nie zwijała się wcale i łamała układ na telefonie.
- **`prefers-reduced-motion`.** Ticker i licznik zatrzymują się, licznik
  pokazuje od razu wartość końcową.
- **Focus.** Dodany widoczny `:focus-visible` — kit obsługiwał tylko pola formularza.

## Publikacja na GitHub Pages

Strona jest eksportowana statycznie (`output: "export"`) i wdrażana przez
GitHub Actions — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
Każdy push na `master` przebudowuje i publikuje.

Docelowy adres: **https://urban1991.github.io/bcoffee-website/**

### Jednorazowa konfiguracja

W repozytorium na GitHubie: **Settings → Pages → Build and deployment → Source**
ustaw na **GitHub Actions**. Bez tego workflow zbuduje stronę, ale deploy się nie uda.

### Jak działa basePath

Pages serwuje projekt z podkatalogu `/bcoffee-website/`, więc build produkcyjny
potrzebuje `basePath`. Workflow wylicza go z nazwy repozytorium i podaje jako
`NEXT_PUBLIC_BASE_PATH`; `next.config.ts` czyta tę zmienną. Lokalnie zmiennej nie
ma, więc `npm run dev` działa pod gołym `/`. Jeśli kiedyś przeniesiesz projekt do
repo `urban1991.github.io` albo podepniesz własną domenę, workflow sam ustawi
pusty basePath — nie trzeba nic zmieniać w kodzie.

Żeby zbudować lokalnie dokładnie to, co pójdzie na Pages:

```bash
NEXT_PUBLIC_BASE_PATH=/bcoffee-website npm run build
```

Wynik ląduje w `out/`. Podgląd wymaga serwowania spod prefiksu — sam `out/index.html`
otwarty z dysku nie znajdzie zasobów.

### Ograniczenia statycznego hostingu

Pages nie uruchamia Node, więc **formularz kontaktowy nie zadziała przez Server
Action** — wymaga zewnętrznego endpointu (np. Formspree, Web3Forms) albo `mailto:`.
Z tego samego powodu `next/image` ma wyłączoną optymalizację.

## Do uzupełnienia

Rzeczy, które projekt zostawił świadomie otwarte:

- **Zdjęcia.** Każdy obraz to `PhotoSlot` / `Polaroid` z opisem, co ma tam wejść.
  Podmiana: przekaż `<Image>` jako `children` do `Polaroid`.
- **Licznik kaw.** `brewedCoffees` w `lib/site-config.ts` to wartość zastępcza
  50 000. Wstaw prawdziwą liczbę przed publikacją.
- **Wariant hero.** `heroVariant` w `lib/site-config.ts` — `"foto"`
  (pełnoekranowe zdjęcie, obecnie aktywne) albo `"split"` (50/50 z polaroidem).
  Oba są zaimplementowane; po wyborze można usunąć drugi.
- **Formularz nie ma backendu.** Submit przełącza stan lokalny, tak jak w kicie.
  Na GitHub Pages Server Action nie wchodzi w grę — potrzebny zewnętrzny endpoint
  (Formspree / Web3Forms) albo przeniesienie hostingu na Vercel.
- **Opisy pakietu weselnego** w `WeddingScreen.tsx` to propozycja z projektu,
  nie treść z bcoffee.pl — do potwierdzenia (jest o tym notka na stronie).
- **Podstrony `/kawa-na-event`, `/webpage_19`, `/webpage_21`** linkują wciąż na
  stary serwis (`lib/site-config.ts` → `externalOffers`).
