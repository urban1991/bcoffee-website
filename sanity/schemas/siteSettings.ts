import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ustawienia strony",
  type: "document",
  groups: [
    { name: "brand", title: "Marka" },
    { name: "contact", title: "Kontakt" },
    { name: "company", title: "Dane firmy" },
    { name: "links", title: "Linki" },
  ],
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "photo",
      group: "brand",
      description: "Roundel w nagłówku. Najlepiej wektor (SVG) albo raster min. 300×300 — mały plik rozmyje się na ekranach Retina.",
    }),
    defineField({ name: "wordmark", title: "Napis obok logo", type: "string", group: "brand", validation: (r) => r.required() }),
    defineField({ name: "siteName", title: "Nazwa marki", type: "string", group: "brand", validation: (r) => r.required() }),
    defineField({ name: "metaTitle", title: "Tytuł w Google", type: "string", group: "brand", validation: (r) => r.required() }),
    defineField({
      name: "metaDescription",
      title: "Opis w Google",
      type: "text",
      rows: 3,
      group: "brand",
      validation: (r) => r.required().max(200),
    }),

    defineField({ name: "phone", title: "Telefon (jak ma być wyświetlony)", type: "string", group: "contact", validation: (r) => r.required() }),
    defineField({
      name: "phoneHref",
      title: "Telefon (do wybrania)",
      type: "string",
      group: "contact",
      description: 'Format międzynarodowy, np. "tel:+48604372787".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "inquiryEmail",
      title: "E-mail na zapytania z formularza",
      type: "string",
      group: "contact",
      description: "Tu trafiają wiadomości wysłane przez formularz wyceny.",
      validation: (r) => r.required().email(),
    }),

    defineField({ name: "legalName", title: "Nazwa firmy", type: "string", group: "company", validation: (r) => r.required() }),
    defineField({ name: "street", title: "Ulica", type: "string", group: "company" }),
    defineField({ name: "city", title: "Kod i miejscowość", type: "string", group: "company" }),
    defineField({ name: "nip", title: "NIP", type: "string", group: "company" }),
    defineField({ name: "regon", title: "REGON", type: "string", group: "company" }),

    defineField({ name: "shopUrl", title: "Sklep", type: "url", group: "links" }),
    defineField({ name: "instagramUrl", title: "Instagram", type: "url", group: "links" }),
    defineField({ name: "instagramHandle", title: "Nazwa na Instagramie", type: "string", group: "links" }),
    defineField({ name: "facebookUrl", title: "Facebook", type: "url", group: "links" }),
    defineField({ name: "termsUrl", title: "Regulamin", type: "url", group: "links" }),
    defineField({ name: "privacyUrl", title: "Polityka prywatności", type: "url", group: "links" }),
  ],
  preview: { prepare: () => ({ title: "Ustawienia strony" }) },
});
