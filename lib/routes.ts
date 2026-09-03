/** Trasy stałe. Podstrony ofertowe mają adresy w polu slug w Sanity, nie tutaj. */
export const routes = {
  home: "/",
  // Adresy przeniesione ze starej strony bez zmian — są zaindeksowane w Google,
  // więc po przepięciu domeny działają dalej i nie wymagają przekierowań.
  terms: "/regulamin-strony",
  privacy: "/polityka-prywatnosci",
} as const;
