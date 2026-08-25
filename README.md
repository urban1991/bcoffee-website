# bcoffee-website

Redesign bcoffee.pl w Next.js, zbudowany na design systemie „B. Coffee"
wyeksportowanym z Claude Design. Treść siedzi w Sanity, hosting na Vercelu.

```bash
npm install
cp .env.example .env.local   # uzupełnij wartości — patrz „Uruchomienie od zera”
npm run dev
```

| Adres | Co |
| --- | --- |
| `/` | Strona główna |
| `/kawa-na-event` | Podstrona ofertowa |
| `/barista-na-targi` | Podstrona ofertowa |
| `/bar-z-lemoniada` | Podstrona ofertowa |
| `/kawa-na-wesele` | Podstrona ofertowa |
| `/studio` | Panel treści (Sanity Studio) |

Podstrony ofertowe obsługuje jedna trasa `app/(site)/[slug]/`. Nowa podstrona to
wyłącznie nowy dokument w Studio — bez zmian w kodzie.

## Uruchomienie od zera

Kolejność ma znaczenie — bez treści w Sanity build nie przejdzie, bo strony
pobierają dane w czasie budowania.

**1. Projekt w Sanity.** Załóż konto na [sanity.io](https://sanity.io), utwórz
projekt z datasetem `production`. Z `sanity.io/manage → API` przepisz `Project ID`
do `.env.local`. Tam samo utwórz token z uprawnieniem **Editor** i wpisz go jako
`SANITY_WRITE_TOKEN` (potrzebny tylko lokalnie, do zasilenia treścią).

**2. Zasil treścią.**

```bash
npm run seed
```

Wgrywa teksty, które wcześniej były wpisane w kodzie: stronę główną, cztery
podstrony ofertowe, sekcję kontaktową, ustawienia i cztery kafle usług. Zdjęć nie
wgrywa — każdy slot dostaje opis, co ma tam wejść.

Skrypt jest bezpieczny do ponownego uruchomienia: dokumenty, które już istnieją,
zostają nietknięte, więc wgrane zdjęcia i poprawki z Studio przetrwają.
`npm run seed -- --force` przywraca treść domyślną — to kasuje wszystkie
podpięte zdjęcia na nadpisywanych dokumentach, więc używaj świadomie.

**3. Zdjęcia.** Wejdź na `/studio` i wgraj pliki w miejsca opisane placeholderami.
Dopóki plik nie jest wgrany, front rysuje kreskowany `PhotoSlot` — strona wygląda
sensownie na każdym etapie uzupełniania.

**4. Formularz.** Załóż konto na [resend.com](https://resend.com), zweryfikuj
domenę `bcoffee.pl`, utwórz klucz API. Uzupełnij `RESEND_API_KEY` i
`INQUIRY_FROM_EMAIL`. Adres odbiorcy ustawia się w Studio → Ustawienia strony.

**5. Vercel.** Podłącz repozytorium, przepisz wszystkie zmienne z `.env.local`
**poza** `SANITY_WRITE_TOKEN` — strona publiczna czyta dane bez tokenu.

**6. Webhook rewalidacji.** `sanity.io/manage → API → Webhooks`, nowy webhook:

| Pole | Wartość |
| --- | --- |
| URL | `https://<domena>/api/revalidate` |
| Dataset | `production` |
| Trigger | Create, Update, Delete |
| Secret | ta sama wartość co `SANITY_REVALIDATE_SECRET` |

Bez tego zmiany w Studio nie pojawią się na stronie do następnego deployu.

## Walidacja formularza

Jedna schema zoda ([lib/inquiry-schema.ts](lib/inquiry-schema.ts)) obsługuje obie
strony: React Hook Form waliduje nią w przeglądarce, a Server Action tą samą przy
odbiorze. Reguły nie mogą się rozjechać, a atrybuty HTML przestają być jedynym
zabezpieczeniem — Server Action to publiczny endpoint, do którego można wysłać
dowolne dane z pominięciem formularza.

Obowiązkowy jest wyłącznie e-mail. Telefon jest opcjonalny, ale gdy podany —
sprawdzany. Wszystkie pola mają limity długości, liczba gości musi być dodatnią
liczbą całkowitą, a data wydarzenia nie może być z przeszłości.

Zamiast `@hookform/resolvers` jest własny [zod-resolver.ts](lib/zod-resolver.ts):
ten pakiet ciągnie opcjonalny łańcuch `@typeschema/*` wymagający zoda 3, a Sanity 6
przypina zoda 4 — instalacja kończy się konfliktem peer dependencies.

## Jak to działa

Strony są prerenderowane i trzymane w cache'u Next.js bez wygasania
(`revalidate: false` + tag `sanity-content`). Publikacja w Studio uderza w
webhook, ten unieważnia tag i strona przebudowuje się z nową treścią. Efekt:
szybkość strony statycznej i natychmiastowe zmiany bez odpytywania CMS-a przy
każdym wejściu.

## Struktura

| Ścieżka | Co |
| --- | --- |
| `app/layout.tsx` | Tylko `<html>`, `<body>` i fonty |
| `app/(site)/` | Strony publiczne + header i stopka |
| `app/(site)/[slug]/` | Podstrony ofertowe — jedna trasa na wszystkie |
| `app/studio/` | Sanity Studio, poza layoutem strony |
| `app/api/revalidate/` | Webhook czyszczący cache po publikacji |
| `app/actions/send-inquiry.ts` | Server Action formularza (Resend) |
| `sanity/schemas/` | Schema treści |
| `sanity/queries.ts` | Zapytania GROQ |
| `sanity/types.ts` | Typy odpowiedzi, pisane ręcznie |
| `styles/tokens/` | Tokeny 1:1 z design systemu |
| `styles/layout.css` | Warstwa responsywna |
| `components/core\|forms\|media\|content/` | Komponenty design systemu |
| `components/site/` | Ekrany |
| `scripts/seed.ts` | Jednorazowe zasilenie treścią |
| `scripts/offer-pages.ts` | Treść podstron, przepisana z bcoffee.pl |
| `scripts/migrate.ts` | Migracja istniejącego datasetu na `offerPage` |
| `design-source/` | Eksport z Claude Design — materiał referencyjny, nie kod aplikacji |

## Skąd wziął się design

Źródłem jest projekt Claude Design `bb394e20-a820-4b79-a119-2f8c3f50ac69`.
Cały jego kontent (89 plików) leży w [`design-source/`](design-source): tokeny,
komponenty `.jsx`, karty guidelines, ui kit i trzy warianty canvas — `v3` jest
wersją kanoniczną, z której system został wyekstrahowany. Katalog jest wyłączony
z ESLinta i nie trafia do bundla; służy do porównania przy zmianach w designie.

## Czym port różni się od kitu

Komponenty przeniesione są 1:1 — te same inline style oparte na CSS variables,
te same nazwy propsów, typy przepisane z dostarczonych plików `.d.ts`. Zmiany
dotyczą rzeczy, które w Next.js musiały wyglądać inaczej:

- **Responsywność.** Kit liczył `isNarrow` z `window.innerWidth`. Przy SSR
  pierwszy render nie zna szerokości okna, więc te same przełączenia robią media
  queries w `styles/layout.css` (próg 900px, ten sam co w kicie).
- **Routing.** Kit przełączał widoki stanem. Tutaj są prawdziwe trasy, a linki
  wewnętrzne idą przez `next/link` (`AppLink`).
- **Fonty.** `@import` z CDN zastąpił `next/font/google` — self-hosting, brak
  render-blockingu, fallback bez CLS.
- **Zdjęcia.** `PhotoSlot` z kitu żyje dalej jako stan „brak pliku”; gdy zdjęcie
  jest wgrane, `CmsPhoto` renderuje zoptymalizowany `next/image`.
- **Poprawki responsywne, których kit nie miał.** Siatka w `StatBand` i szerokiej
  `OfferCard` nie zwijała się wcale i łamała układ na telefonie.
- **`prefers-reduced-motion`.** Ticker i licznik zatrzymują się, licznik pokazuje
  od razu wartość końcową.
- **Focus.** Dodany widoczny `:focus-visible`.

## Do uzupełnienia

- **Licznik kaw** — `npm run seed` wstawia zastępcze 50 000. Wpisz prawdziwą
  liczbę w Studio → Strona główna → Licznik.
- **Opisy pakietu weselnego** to propozycja z projektu, nie treść z bcoffee.pl.
  Na stronie jest o tym notka — po potwierdzeniu zakresu wyczyść pole
  „Notka pod kartami”, a zniknie.
- **Zdjęcia na podstronach ofertowych.** Treść przepisano dosłownie z bcoffee.pl,
  ale zdjęć stamtąd nie da się pobrać (leniwe ładowanie za przezroczystymi
  podkładkami). Każdy slot ma opis, co powinno tam wejść.
- **Wariant hero** — Studio → Strona główna → Hero. Do wyboru pełnoekranowe
  zdjęcie albo split 50/50.
