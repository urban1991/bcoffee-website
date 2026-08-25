import { z } from "zod";

/**
 * Jedna schema dla obu stron: React Hook Form waliduje nią w przeglądarce,
 * Server Action tą samą przy odbiorze. Dzięki temu reguły nie mogą się rozjechać,
 * a atrybuty HTML przestają być jedynym zabezpieczeniem — Server Action to
 * publiczny endpoint, do którego można wysłać dowolne dane z pominięciem formularza.
 */

/** Puste pole opcjonalne przychodzi jako "" — traktujemy je jak brak wartości. */
const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const optionalText = (max: number, label: string) =>
  z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .max(max, { error: `${label}: maksymalnie ${max} znaków.` })
      .optional(),
  );

/**
 * Dzisiejsza data jako "RRRR-MM-DD" w strefie lokalnej. Łańcuchy ISO porównują się
 * leksykograficznie tak samo jak chronologicznie, więc unikamy pułapki: `new Date("RRRR-MM-DD")`
 * parsuje się jako północ UTC, a północ lokalna to inny moment — przy ujemnym
 * przesunięciu strefy dzisiejsza data wypadała „w przeszłości".
 */
function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * `Date.parse` NIE odrzuca nieistniejących dni: "2026-02-31" przewija się na 3 marca
 * i przechodzi walidację. Sprawdzamy więc, czy data wróciła w tej samej postaci.
 */
function isRealDate(v: string): boolean {
  const [y, m, d] = v.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

export const inquirySchema = z.object({
  data: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        error: "Podaj datę w formacie RRRR-MM-DD.",
      })
      .refine(isRealDate, { error: "To nie jest prawdziwa data." })
      .refine((v) => v >= todayIso(), {
        error: "Data wydarzenia nie może być z przeszłości.",
      })
      .optional(),
  ),

  // Trafia do tematu maila, więc ucinamy złamania linii.
  typ: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .max(80, { error: "Typ wydarzenia: maksymalnie 80 znaków." })
      .transform((v) => v.replace(/[\r\n]+/g, " "))
      .optional(),
  ),

  goscie: z.preprocess(
    emptyToUndefined,
    z.coerce
      .number({ error: "Liczba gości musi być liczbą." })
      .int({ error: "Liczba gości musi być liczbą całkowitą." })
      .min(1, { error: "Liczba gości musi być większa od zera." })
      .max(100000, {
        error:
          "Tylu gości nie obsłużymy — napisz w wiadomości, o jakiej skali mówimy.",
      })
      .optional(),
  ),

  miasto: optionalText(120, "Miejsce"),
  godziny: optionalText(120, "Godziny obsługi"),
  budzet: optionalText(120, "Budżet"),
  imie: optionalText(120, "Imię"),

  telefon: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .max(24, { error: "Telefon: maksymalnie 24 znaki." })
      .refine((v) => /^[+\d][\d\s()-]*$/.test(v), {
        error:
          "Telefon może zawierać tylko cyfry, spacje, nawiasy, myślnik i +.",
      })
      .refine((v) => v.replace(/\D/g, "").length >= 9, {
        error: "Numer wygląda na za krótki.",
      })
      .optional(),
  ),

  // Brak klucza albo null z ręcznie sklejonego żądania sprowadzamy do pustego
  // łańcucha, żeby zadziałał komunikat z `.min(1)`, a nie domyślny błąd typu zoda.
  email: z.preprocess(
    (v) => (v === undefined || v === null ? "" : v),
    z
      .string()
      .trim()
      .min(1, { error: "Bez adresu e-mail nie mamy jak odpisać." })
      .max(200, { error: "E-mail: maksymalnie 200 znaków." })
      .pipe(z.email({ error: "To nie wygląda na poprawny adres e-mail." })),
  ),

  wiadomosc: optionalText(2000, "Wiadomość"),

  /** Pułapka na boty — u człowieka zawsze pusta. */
  firma: z.preprocess(emptyToUndefined, z.string().optional()),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryValues = z.output<typeof inquirySchema>;

/** Pola pokazywane w mailu, w kolejności jak w formularzu. */
export const INQUIRY_LABELS: Array<[keyof InquiryValues, string]> = [
  ["data", "Data wydarzenia"],
  ["typ", "Typ wydarzenia"],
  ["goscie", "Liczba gości"],
  ["miasto", "Miejsce / miasto"],
  ["godziny", "Godziny obsługi"],
  ["budzet", "Budżet"],
  ["imie", "Imię"],
  ["telefon", "Telefon"],
  ["email", "E-mail"],
  ["wiadomosc", "Wiadomość"],
];
