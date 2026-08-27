import { cache } from "react";
import type { QueryParams } from "next-sanity";
import { client } from "./client";

/** Wspólny tag cache'u. Webhook z Sanity uderza w /api/revalidate i unieważnia całość. */
export const CONTENT_TAG = "sanity-content";

const isDev = process.env.NODE_ENV === "development";

/**
 * Siatka bezpieczeństwa, nie mechanizm odświeżania — tym jest webhook, który po
 * publikacji unieważnia `CONTENT_TAG` od razu. Godzina jest na wypadek, gdyby webhook
 * kiedyś nie dojechał: padnie, zmieni się sekret, ktoś przestawi konfigurację w Sanity.
 *
 * Wcześniej stało tu `revalidate: false`, czyli „trzymaj bezterminowo". Przy cichej
 * awarii webhooka stara treść zostawała na stronie aż do następnego deployu i nic
 * tego nie sygnalizowało. Koszt zabezpieczenia: jedno zapytanie do Sanity na godzinę
 * na stronę, i tylko wtedy, gdy ktoś na nią wejdzie.
 */
const FALLBACK_REVALIDATE = 3600;

/**
 * Na produkcji dane leżą w cache'u Next.js, a do Sanity idziemy dopiero po
 * unieważnieniu tagu — strona jest szybka i nie chodzi do CMS-a przy każdym wejściu.
 * Lokalnie webhooka nie ma, więc taki cache oznaczałby, że zmiany w Studio nigdy nie
 * docierają na stronę; dlatego w dev pobieramy świeżo za każdym razem.
 *
 * Do tego jedno zapytanie na render, choćby pytało o nie kilka miejsc naraz.
 * `generateMetadata` i sam komponent strony potrzebują tych samych dokumentów — bez
 * `cache()` strona główna ciągnęłaby cały `homePageQuery` dwa razy, raz tylko po to,
 * żeby wyjąć z niego zdjęcie hero do `og:image`.
 *
 * Klucz musi być prymitywem: React `cache` porównuje argumenty przez `Object.is`,
 * więc świeży obiekt `{ query, params }` nigdy by w cache nie trafił.
 */
const cachedFetch = cache(async (query: string, paramsJson: string): Promise<unknown> => {
  return client.fetch(
    query,
    JSON.parse(paramsJson) as QueryParams,
    isDev ? { cache: "no-store" } : { next: { revalidate: FALLBACK_REVALIDATE, tags: [CONTENT_TAG] } },
  );
});

export async function sanityFetch<T>({ query, params = {} }: { query: string; params?: QueryParams }): Promise<T> {
  return (await cachedFetch(query, JSON.stringify(params))) as T;
}

/**
 * GROQ z `[0]` zwraca `null`, gdy dokumentu nie ma. Bez tego strażnika build wywala
 * się na `Cannot read properties of null`, nie mówiąc, że po prostu brakuje treści.
 */
export function requireDoc<T>(doc: T | null | undefined, what: string): T {
  if (!doc) {
    throw new Error(`Brak dokumentu "${what}" w Sanity (dataset "${process.env.NEXT_PUBLIC_SANITY_DATASET}"). Uruchom \`npm run seed\`.`);
  }
  return doc;
}
