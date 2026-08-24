import type { Metadata } from "next";
import { WeddingScreen } from "@/components/site/WeddingScreen";
import { ContactSection } from "@/components/site/ContactSection";

export const metadata: Metadata = {
  title: "Kawa na wesele",
  description:
    "Mobilna kawiarnia i barista na Waszym przyjęciu weselnym. Kawa dla gości od pierwszego toastu do ostatniego tańca.",
};

export default function Page() {
  return (
    <main>
      <WeddingScreen />
      <ContactSection />
    </main>
  );
}
