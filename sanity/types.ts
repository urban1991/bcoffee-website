/**
 * Kształty danych zwracane przez zapytania z queries.ts.
 * Pisane ręcznie — schema jest mała i stabilna, więc generator typów
 * (`sanity typegen`) byłby tu narzutem. Przy rozroście schemy warto go dołożyć.
 */

/** Punkt ostrości ustawiany w Studio, w ułamkach szerokości/wysokości (0–1). */
export interface Hotspot {
  x: number;
  y: number;
}

/**
 * Prostokąt przycięcia ze Studio — ile odciąć z każdej krawędzi, w ułamkach (0–1).
 * To druga, niezależna kontrolka w edytorze zdjęć obok punktu ostrości; obie trzeba
 * czytać, bo edytor pokazuje je równorzędnie.
 */
export interface Crop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface Photo {
  placeholder: string;
  alt?: string | null;
  hotspot?: Hotspot | null;
  crop?: Crop | null;
  url?: string | null;
  mimeType?: string | null;
  lqip?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface Cta {
  label: string;
  href: string;
}

export interface SiteSettings {
  logo?: Photo | null;
  wordmark: string;
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  phone: string;
  phoneHref: string;
  inquiryEmail: string;
  legalName: string;
  street?: string | null;
  city?: string | null;
  nip?: string | null;
  regon?: string | null;
  shopUrl?: string | null;
  instagramUrl?: string | null;
  instagramHandle?: string | null;
  facebookUrl?: string | null;
}

export interface Offer {
  _id: string;
  title: string;
  href: string;
  tilt?: number | null;
  wide?: boolean | null;
  eyebrow?: string | null;
  body?: string | null;
  ctaLabel?: string | null;
  photo: Photo;
}

export interface HomePage {
  heroVariant: "foto" | "split";
  heroEyebrow?: string | null;
  heroTitle: string;
  heroTitleHand: string;
  heroLead?: string | null;
  heroCtaPrimary?: Cta | null;
  heroCtaSecondary?: Cta | null;
  heroPhoto?: Photo | null;
  stickerLines?: string[] | null;
  tickerItems?: string[] | null;
  introTitle?: string | null;
  introTitleHand?: string | null;
  introBody?: string | null;
  clientsLabel?: string | null;
  clientLogos?: Photo[] | null;
  offerTitle?: string | null;
  offerLead?: string | null;
  brewedCoffees: number;
  statCaption?: string | null;
  statBody?: string | null;
  aboutEyebrow?: string | null;
  aboutTitle?: string | null;
  aboutTitleHand?: string | null;
  aboutLead?: string | null;
  aboutBody?: string | null;
  aboutQuote?: string | null;
  aboutPhoto?: Photo | null;
  galleryLabel?: string | null;
  galleryPhotos?: Photo[] | null;
  shopStickerLines?: string[] | null;
  shopTitle?: string | null;
  shopBody?: string | null;
  shopCtaLabel?: string | null;
  instagramTitle?: string | null;
  instagramTitleHand?: string | null;
  instagramPhotos?: Photo[] | null;
}

export interface HomePageData {
  page: HomePage;
  offers: Offer[];
}

export interface SitemapEntry {
  slug: string;
  _updatedAt: string;
}

export interface SitemapData {
  /** Daty dokumentów składających się na stronę główną. */
  home: string[];
  pages: SitemapEntry[];
}

export interface NavOfferPage {
  title: string;
  slug: string;
}

export interface OfferSection {
  _key: string;
  eyebrow?: string | null;
  title: string;
  hand?: string | null;
  body?: string | null;
  bullets?: string[] | null;
  photo?: Photo | null;
}

export interface NumberedCard {
  _key: string;
  number: string;
  title: string;
  body: string;
}

export interface OfferPage {
  title: string;
  slug: string;
  eyebrow?: string | null;
  heroTitle: string;
  heroTitleHand?: string | null;
  lead?: string | null;
  ctaPrimary?: Cta | null;
  ctaSecondary?: Cta | null;
  heroPhoto?: Photo | null;
  pillars?: string[] | null;
  introTitle?: string | null;
  introTitleHand?: string | null;
  introBody?: string | null;
  sections?: OfferSection[] | null;
  cardsTitle?: string | null;
  cards?: NumberedCard[] | null;
  cardsNote?: string | null;
  galleryPhotos?: Photo[] | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface ContactSection {
  eyebrow?: string | null;
  title: string;
  submitLabel?: string | null;
  successTitle?: string | null;
  successBody?: string | null;
  ownerName: string;
  ownerRole?: string | null;
  ownerPhoto?: Photo | null;
  revealPhoneLabel?: string | null;
  eventTypes?: string[] | null;
}
