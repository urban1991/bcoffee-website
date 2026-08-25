import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Strona główna",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Wstęp i klienci" },
    { name: "offer", title: "Oferta" },
    { name: "stat", title: "Licznik" },
    { name: "about", title: "O nas" },
    { name: "gallery", title: "Realizacje" },
    { name: "shop", title: "Sklep" },
    { name: "instagram", title: "Instagram" },
  ],
  fields: [
    // — Hero —
    defineField({
      name: "heroVariant",
      title: "Wariant hero",
      type: "string",
      group: "hero",
      options: {
        list: [
          { title: "Pełnoekranowe zdjęcie", value: "foto" },
          { title: "Split 50/50 z polaroidem", value: "split" },
        ],
        layout: "radio",
      },
      initialValue: "foto",
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroEyebrow", title: "Pastylka nad nagłówkiem", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Nagłówek — pierwsza linia", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({
      name: "heroTitleHand",
      title: "Nagłówek — druga linia (odręczna)",
      type: "string",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroLead", title: "Akapit pod nagłówkiem", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroCtaPrimary", title: "Przycisk główny", type: "cta", group: "hero" }),
    defineField({ name: "heroCtaSecondary", title: "Przycisk drugi", type: "cta", group: "hero" }),
    defineField({ name: "heroPhoto", title: "Zdjęcie hero", type: "photo", group: "hero" }),
    defineField({
      name: "stickerLines",
      title: "Naklejka (dwa krótkie słowa)",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
      validation: (r) => r.max(2),
      initialValue: ["be", "happy"],
    }),

    // — Pasek i wstęp —
    defineField({
      name: "tickerItems",
      title: "Przewijany pasek",
      type: "array",
      of: [{ type: "string" }],
      group: "intro",
      description: "Krótkie hasła wersalikami.",
    }),
    defineField({ name: "introTitle", title: "Wstęp — nagłówek", type: "string", group: "intro" }),
    defineField({ name: "introTitleHand", title: "Wstęp — słowo odręczne", type: "string", group: "intro" }),
    defineField({ name: "introBody", title: "Wstęp — akapit", type: "text", rows: 3, group: "intro" }),
    defineField({ name: "clientsLabel", title: "Podpis nad logotypami", type: "string", group: "intro" }),
    defineField({
      name: "clientLogos",
      title: "Logotypy klientów",
      type: "array",
      of: [{ type: "photo" }],
      group: "intro",
      description: "Puste miejsca zostaną kreskowanymi ramkami.",
    }),

    // — Oferta —
    defineField({ name: "offerTitle", title: "Oferta — nagłówek", type: "string", group: "offer" }),
    defineField({ name: "offerLead", title: "Oferta — dopisek odręczny", type: "string", group: "offer" }),

    // — Licznik —
    defineField({
      name: "brewedCoffees",
      title: "Liczba zaparzonych kaw",
      type: "number",
      group: "stat",
      description: "Prawdziwa liczba. Odlicza się na oczach gościa, więc nie wpisuj zmyślonej.",
      validation: (r) => r.required().min(0),
    }),
    defineField({ name: "statCaption", title: "Podpis pod liczbą", type: "string", group: "stat" }),
    defineField({ name: "statBody", title: "Tekst obok liczby", type: "text", rows: 3, group: "stat" }),

    // — O nas —
    defineField({ name: "aboutEyebrow", title: "Nadtytuł odręczny", type: "string", group: "about" }),
    defineField({ name: "aboutTitle", title: "Nagłówek", type: "string", group: "about" }),
    defineField({ name: "aboutTitleHand", title: "Nagłówek — linia odręczna", type: "string", group: "about" }),
    defineField({ name: "aboutLead", title: "Pierwszy akapit", type: "text", rows: 3, group: "about" }),
    defineField({ name: "aboutBody", title: "Drugi akapit", type: "text", rows: 4, group: "about" }),
    defineField({ name: "aboutQuote", title: "Złota karta z hasłem", type: "string", group: "about" }),
    defineField({ name: "aboutPhoto", title: "Zdjęcie zespołu", type: "photo", group: "about" }),

    // — Realizacje —
    defineField({ name: "galleryLabel", title: "Podpis nad galerią", type: "string", group: "gallery" }),
    defineField({ name: "galleryPhotos", title: "Zdjęcia", type: "array", of: [{ type: "photo" }], group: "gallery" }),

    // — Sklep —
    defineField({ name: "shopStickerLines", title: "Naklejka", type: "array", of: [{ type: "string" }], group: "shop", validation: (r) => r.max(2) }),
    defineField({ name: "shopTitle", title: "Nagłówek", type: "string", group: "shop" }),
    defineField({ name: "shopBody", title: "Podpis", type: "string", group: "shop" }),
    defineField({ name: "shopCtaLabel", title: "Napis na przycisku", type: "string", group: "shop" }),

    // — Instagram —
    defineField({ name: "instagramTitle", title: "Nagłówek", type: "string", group: "instagram" }),
    defineField({ name: "instagramTitleHand", title: "Linia odręczna", type: "string", group: "instagram" }),
    defineField({ name: "instagramPhotos", title: "Kafle", type: "array", of: [{ type: "photo" }], group: "instagram" }),
  ],
  preview: { prepare: () => ({ title: "Strona główna" }) },
});
