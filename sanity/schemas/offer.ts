import { defineField, defineType } from "sanity";

export const offer = defineType({
  name: "offer",
  title: "Usługa",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nazwa", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "Adres",
      type: "string",
      description: 'Trasa wewnętrzna ("/kawa-na-wesele") albo pełny URL do starego serwisu.',
      validation: (r) => r.required(),
    }),
    defineField({ name: "photo", title: "Zdjęcie", type: "photo", validation: (r) => r.required() }),
    defineField({
      name: "order",
      title: "Kolejność",
      type: "number",
      description: "Rosnąco. Decyduje o miejscu kafla w siatce.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tilt",
      title: "Przechył (stopnie)",
      type: "number",
      initialValue: -1.2,
      description: "Znaki naprzemiennie w rzędzie. Zakres −2…2. Na telefonie i tak jest zerowany.",
    }),
    defineField({
      name: "wide",
      title: "Kafel szeroki (złoty)",
      type: "boolean",
      initialValue: false,
      description: "Pełna szerokość pod siatką — dla usługi, która ma mieć większą wagę.",
    }),
    defineField({
      name: "eyebrow",
      title: "Nadtytuł odręczny",
      type: "string",
      description: "Tylko kafel szeroki. Np. „nie tylko kawa”.",
      hidden: ({ parent }) => !parent?.wide,
    }),
    defineField({
      name: "body",
      title: "Opis",
      type: "text",
      rows: 3,
      description: "Tylko kafel szeroki.",
      hidden: ({ parent }) => !parent?.wide,
    }),
    defineField({
      name: "ctaLabel",
      title: "Napis na przycisku",
      type: "string",
      initialValue: "Zobacz ofertę →",
      hidden: ({ parent }) => !parent?.wide,
    }),
  ],
  orderings: [{ name: "order", title: "Kolejność", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "href", media: "photo.asset", wide: "wide" },
    prepare: ({ title, subtitle, media, wide }) => ({
      title: wide ? `${title} (szeroki)` : title,
      subtitle,
      media,
    }),
  },
});
