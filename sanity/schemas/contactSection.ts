import { defineField, defineType } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "Sekcja kontaktowa",
  type: "document",
  description: "Wspólna dla strony głównej i podstrony weselnej.",
  fields: [
    defineField({ name: "eyebrow", title: "Nadtytuł odręczny", type: "string" }),
    defineField({ name: "title", title: "Nagłówek", type: "string", validation: (r) => r.required() }),
    defineField({ name: "submitLabel", title: "Napis na przycisku wysyłki", type: "string", initialValue: "Wyślij zapytanie" }),

    defineField({ name: "successTitle", title: "Po wysłaniu — nagłówek", type: "string", initialValue: "dzięki!" }),
    defineField({ name: "successBody", title: "Po wysłaniu — treść", type: "text", rows: 2 }),

    defineField({ name: "ownerName", title: "Osoba kontaktowa", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ownerRole", title: "Stanowisko", type: "string" }),
    defineField({ name: "ownerPhoto", title: "Zdjęcie", type: "photo" }),
    defineField({ name: "revealPhoneLabel", title: "Napis na przycisku odsłaniającym numer", type: "string", initialValue: "Pokaż numer" }),

    defineField({
      name: "eventTypes",
      title: "Typy wydarzenia w formularzu",
      type: "array",
      of: [{ type: "string" }],
      description: "Pozycje listy rozwijanej.",
    }),
  ],
  preview: { prepare: () => ({ title: "Sekcja kontaktowa" }) },
});
