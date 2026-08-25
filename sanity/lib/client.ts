import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN Sanity ma własne ~60 s opóźnienia. Na produkcji to nie przeszkadza (świeżość
  // zapewnia webhook rewalidujący cache Next.js), ale lokalnie kazałoby czekać na
  // każdą zmianę w Studio — więc w dev odpytujemy API bezpośrednio.
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});
