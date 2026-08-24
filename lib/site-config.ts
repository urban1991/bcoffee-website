/**
 * Dane firmowe i treści, które w kicie były wpisane na sztywno w JSX.
 * Wszystko poniżej pochodzi dosłownie z bcoffee.pl — poza pozycjami
 * oznaczonymi jako DO POTWIERDZENIA.
 */

export const site = {
  name: "B. Coffee",
  wordmark: "B. COFFEE",
  motto: "be happy",
  phone: "604 372 787",
  phoneHref: "tel:+48604372787",
  shop: "https://bcoffee.shop",
  instagram: "https://www.instagram.com/bcoffeebehappy/",
  facebook: "https://www.facebook.com/bcoffeebehappy",
  owner: "Wojciech Baranowski",
  company: {
    legalName: "B. COFFEE Wojciech Baranowski",
    street: "Strzelce 4",
    city: "58-124 Marcinowice",
    nip: "8842756984",
    regon: "362425207",
  },
  legal: {
    terms: "https://bcoffee.pl/regulamin-strony",
    privacy: "https://bcoffee.pl/polityka-prywatnosci",
  },
} as const;

/**
 * DO POTWIERDZENIA: licznik zaparzonych kaw. 50 000 to wartość zastępcza
 * z projektu — bcoffee.pl podaje własną liczbę, wstaw prawdziwą przed publikacją.
 */
export const brewedCoffees = 50000;

/**
 * Wariant hero na stronie głównej. W kicie oba warianty przełączała pastylka
 * na dole ekranu; produkcyjnie wybiera się jeden.
 *   "foto"  — pełnoekranowe zdjęcie z tekstem na wierzchu
 *   "split" — 50/50, tekst obok polaroidu
 */
export const heroVariant: "foto" | "split" = "foto";

export const routes = {
  home: "/",
  wedding: "/kawa-na-wesele",
} as const;

/** Podstrony bcoffee.pl, które nie zostały jeszcze przeprojektowane — linkują na stary serwis. */
export const externalOffers = {
  event: "https://bcoffee.pl/kawa-na-event",
  fairs: "https://bcoffee.pl/webpage_19",
  lemonade: "https://bcoffee.pl/webpage_21",
} as const;
