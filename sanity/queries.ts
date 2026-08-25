import { defineQuery } from "next-sanity";

/**
 * Rozwinięcie obiektu `photo`. Pole `asset` bywa puste — wtedy front rysuje
 * PhotoSlot z tekstem `placeholder`, zamiast dziury w layoucie.
 */
const photoFields = /* groq */ `
  placeholder,
  alt,
  "url": asset.asset->url,
  "mimeType": asset.asset->mimeType,
  "lqip": asset.asset->metadata.lqip,
  "width": asset.asset->metadata.dimensions.width,
  "height": asset.asset->metadata.dimensions.height
`;

const ctaFields = /* groq */ `label, href`;

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  logo{${photoFields}},
  wordmark, siteName, metaTitle, metaDescription,
  phone, phoneHref, inquiryEmail,
  legalName, street, city, nip, regon,
  shopUrl, instagramUrl, instagramHandle, facebookUrl, termsUrl, privacyUrl
}`);

export const homePageQuery = defineQuery(`{
  "page": *[_type == "homePage"][0]{
    heroVariant, heroEyebrow, heroTitle, heroTitleHand, heroLead,
    heroCtaPrimary{${ctaFields}},
    heroCtaSecondary{${ctaFields}},
    heroPhoto{${photoFields}},
    stickerLines,
    tickerItems,
    introTitle, introTitleHand, introBody,
    clientsLabel,
    clientLogos[]{${photoFields}},
    offerTitle, offerLead,
    brewedCoffees, statCaption, statBody,
    aboutEyebrow, aboutTitle, aboutTitleHand, aboutLead, aboutBody, aboutQuote,
    aboutPhoto{${photoFields}},
    galleryLabel,
    galleryPhotos[]{${photoFields}},
    shopStickerLines, shopTitle, shopBody, shopCtaLabel,
    instagramTitle, instagramTitleHand,
    instagramPhotos[]{${photoFields}}
  },
  "offers": *[_type == "offer"] | order(order asc){
    _id, title, href, tilt, wide, eyebrow, body, ctaLabel,
    photo{${photoFields}}
  }
}`);

/** Lekka lista do nawigacji — tylko to, co potrzebne na rozwijane menu. */
export const navOfferPagesQuery = defineQuery(`*[_type == "offerPage" && defined(slug.current)] | order(order asc){
  title, "slug": slug.current
}`);

export const offerPageSlugsQuery = defineQuery(`*[_type == "offerPage" && defined(slug.current)].slug.current`);

export const offerPageQuery = defineQuery(`*[_type == "offerPage" && slug.current == $slug][0]{
  title, "slug": slug.current,
  eyebrow, heroTitle, heroTitleHand, lead,
  ctaPrimary{${ctaFields}},
  ctaSecondary{${ctaFields}},
  heroPhoto{${photoFields}},
  pillars,
  introTitle, introTitleHand, introBody,
  sections[]{
    _key, eyebrow, title, hand, body, bullets,
    photo{${photoFields}}
  },
  cardsTitle,
  cards[]{_key, number, title, body},
  cardsNote,
  galleryPhotos[]{${photoFields}},
  metaTitle, metaDescription
}`);

export const contactSectionQuery = defineQuery(`*[_type == "contactSection"][0]{
  eyebrow, title, submitLabel,
  successTitle, successBody,
  ownerName, ownerRole,
  ownerPhoto{${photoFields}},
  revealPhoneLabel,
  eventTypes
}`);
