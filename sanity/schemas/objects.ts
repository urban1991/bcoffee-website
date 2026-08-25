import { defineField, defineType } from "sanity";

/**
 * Zdjęcie z opisem miejsca. Dopóki plik nie jest wgrany, front rysuje PhotoSlot
 * z tekstem `placeholder` — tak jak w design systemie.
 */
export const photo = defineType({
  name: "photo",
  title: "Zdjęcie",
  type: "object",
  fields: [
    defineField({
      name: "asset",
      title: "Plik",
      type: "image",
      options: { hotspot: true },
      description: "Zostaw puste, jeśli zdjęcia jeszcze nie ma — pojawi się kreskowany placeholder.",
    }),
    defineField({
      name: "alt",
      title: "Opis alternatywny",
      type: "string",
      description: "Co widać na zdjęciu. Czyta to czytnik ekranu i Google.",
    }),
    defineField({
      name: "placeholder",
      title: "Opis miejsca (gdy brak zdjęcia)",
      type: "string",
      description: 'Np. "zdjęcie zespołu, pionowe 3:4". Widoczne tylko dopóki nie ma pliku.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { media: "asset", title: "placeholder", subtitle: "alt" },
  },
});

export const cta = defineType({
  name: "cta",
  title: "Przycisk",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Napis", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "href",
      title: "Adres",
      type: "string",
      description: 'Trasa wewnętrzna ("/kawa-na-wesele"), kotwica ("#kontakt"), telefon ("tel:+48...") lub pełny URL.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
