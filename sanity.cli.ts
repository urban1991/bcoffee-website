import { defineCliConfig } from "sanity/cli";

/**
 * Konfiguracja dla poleceń `npx sanity ...` (np. `sanity cors add`, `sanity dataset`).
 * Samo Studio działa bez tego — jest osadzone w aplikacji pod /studio.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
