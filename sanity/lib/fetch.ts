import type { QueryParams } from "next-sanity";
import { client } from "./client";

/** Wspólny tag cache'u. Webhook z Sanity uderza w /api/revalidate i unieważnia całość. */
export const CONTENT_TAG = "sanity-content";

const isDev = process.env.NODE_ENV === "development";

/**
 * Na produkcji dane trzymamy w cache'u bez wygasania (`revalidate: false`),
 * a odświeżeniem steruje webhook przy publikacji — strona jest szybka i nie
 * odpytuje Sanity przy każdym żądaniu.
 *
 * Lokalnie webhooka nie ma, więc taki cache oznaczałby, że zmiany w Studio
 * nigdy nie docierają na stronę. Dlatego w dev pobieramy świeżo za każdym razem.
 */
export async function sanityFetch<T>({ query, params = {} }: { query: string; params?: QueryParams }): Promise<T> {
  return client.fetch<T>(query, params, isDev ? { cache: "no-store" } : { next: { revalidate: false, tags: [CONTENT_TAG] } });
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
