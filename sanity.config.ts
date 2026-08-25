"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, singletonTypes } from "./sanity/schemas";

const singletons = new Set<string>(singletonTypes);

export default defineConfig({
  basePath: "/studio",
  title: "B. Coffee",
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
    // Singletony nie mają się pojawiać w „Utwórz nowy".
    templates: (prev) => prev.filter((t) => !singletons.has(t.schemaType)),
  },

  document: {
    // Singletonu nie da się zduplikować ani skasować — jest dokładnie jeden.
    actions: (prev, { schemaType }) =>
      singletons.has(schemaType)
        ? prev.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : prev,
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Treść")
          .items([
            S.listItem().title("Strona główna").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
            S.documentTypeListItem("offerPage").title("Podstrony ofertowe"),
            S.divider(),
            S.documentTypeListItem("offer").title("Kafle usług na stronie głównej"),
            S.divider(),
            S.listItem()
              .title("Sekcja kontaktowa")
              .id("contactSection")
              .child(S.document().schemaType("contactSection").documentId("contactSection")),
            S.listItem()
              .title("Ustawienia strony")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
