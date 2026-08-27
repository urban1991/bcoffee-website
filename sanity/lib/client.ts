import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  /**
   * Bez CDN-u Sanity — i to celowo także na produkcji.
   *
   * Cache'e są tu dwa i webhook unieważnia tylko jeden. Gdy po rewalidacji Next
   * idzie po świeże dane, CDN Sanity potrafi jeszcze przez chwilę oddawać starą
   * wersję — a `sanityFetch` zapisuje odpowiedź z `revalidate: false`, czyli
   * bezterminowo. Jedno źle wyczasowane pobranie zamrażało więc starą treść aż do
   * następnej publikacji: w Studio zmiana była, na stronie pojawiała się z
   * opóźnieniem albo dopiero przy kolejnej edycji.
   *
   * CDN opłaca się przy dużej liczbie zapytań, a tych tu nie ma: Next trzyma dane
   * u siebie i pyta Sanity raz na publikację. Płaciliśmy więc opóźnieniem za
   * oszczędność, której nie było. Dokumentacja Sanity zaleca zresztą wprost
   * wyłączenie CDN-u przy generowaniu statycznym i obsłudze webhooków.
   */
  useCdn: false,
  perspective: "published",
});
