/** Konfiguracja połączenia z Sanity. Wartości ustawia się w .env.local i w panelu Vercela. */

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Brak zmiennej środowiskowej ${name}. Skopiuj .env.example do .env.local i uzupełnij.`);
  }
  return value;
}

export const projectId = required(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, "NEXT_PUBLIC_SANITY_PROJECT_ID");
export const dataset = required(process.env.NEXT_PUBLIC_SANITY_DATASET, "NEXT_PUBLIC_SANITY_DATASET");

/** Data wersji API — przypięta celowo, żeby zmiany po stronie Sanity nic nie zepsuły. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-19";
