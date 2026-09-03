/**
 * Kształt dokumentów prawnych — regulaminu i polityki prywatności.
 *
 * Treść leży w repozytorium, nie w Sanity, i to jest świadomy wybór: te dwa teksty
 * zmieniają się raz na kilka lat, a każda zmiana powinna być decyzją, nie literówką
 * poprawioną w Studio o 23:00.
 *
 * Numeracja punktów („1.", „2.") siedzi w treści, a nie w znaczniku `<ol>`. Wygląda
 * to na niepotrzebną ręczną robotę, ale dokumenty odwołują się same do siebie —
 * „wskazany w § 1 ust. 2" — więc numery muszą być dokładnie takie, jak w oryginale.
 * Automatyczna numeracja przestawiłaby je przy pierwszym dodanym punkcie i zerwała
 * te odwołania po cichu.
 */

/** Domena, której dotyczą oba dokumenty — pada też w ich treści, w § 1. */
export const LEGAL_SUBTITLE = "bcoffee.pl";

export type LegalBlock =
  | { kind: "para"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "bullets"; items: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  /** Nagłówek strony i zarazem tytuł w wynikach wyszukiwania. */
  title: string;
  /** Krótki opis do metadanych. */
  description: string;
  /** Podpis pod nagłówkiem — nazwa serwisu, którego dokument dotyczy. */
  subtitle: string;
  /**
   * Data wejścia w życie, przepisana z oryginału, w formacie ISO (RRRR-MM-DD).
   * Maszynowo trafia do mapy strony, a na stronie wyświetla się po polsku —
   * stąd ISO, a nie „10.10.2024": jedno pole zamiast dwóch rozjeżdżających się.
   */
  effectiveFrom: string;
  sections: LegalSection[];
}
