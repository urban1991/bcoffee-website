import type { SchemaTypeDefinition } from "sanity";
import { cta, photo } from "./objects";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { offerPage } from "./offerPage";
import { contactSection } from "./contactSection";
import { offer } from "./offer";

export const schemaTypes: SchemaTypeDefinition[] = [
  // obiekty wielokrotnego użytku
  photo,
  cta,
  // dokumenty
  siteSettings,
  homePage,
  offerPage,
  contactSection,
  offer,
];

/** Dokumenty występujące dokładnie raz — w Studio pokazujemy je jako pojedyncze wpisy, nie listy. */
export const singletonTypes = ["siteSettings", "homePage", "contactSection"] as const;
