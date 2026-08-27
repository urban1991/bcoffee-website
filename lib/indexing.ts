/**
 * Czy strona ma być widoczna w wyszukiwarkach.
 *
 * Domyślnie NIE. Dopóki serwis wisi pod adresem roboczym `.vercel.app`, jego
 * zaindeksowanie oznaczałoby, że w Google ląduje wersja z placeholderami, a po
 * premierze dwie kopie tej samej treści konkurują ze sobą pod różnymi adresami.
 *
 * W dniu startu: ustawić `ALLOW_INDEXING=true` w zmiennych środowiskowych
 * i przedeployować. Świadoma decyzja zamiast liczenia na to, że ktoś pamięta
 * o usunięciu blokady.
 *
 * Zmienna celowo bez prefiksu NEXT_PUBLIC_ — czytają ją tylko `robots.ts`
 * i `generateMetadata`, oba po stronie serwera. Nie ma powodu wysyłać jej do przeglądarki.
 */
export const indexingAllowed = process.env.ALLOW_INDEXING === "true";
