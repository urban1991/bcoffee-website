import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { NextResponse, type NextRequest } from "next/server";
import { CONTENT_TAG } from "@/sanity/lib/fetch";

/**
 * Webhook z Sanity. Po publikacji treści unieważnia cache Next.js, więc strona
 * pokazuje nową wersję bez czekania i bez odpytywania CMS-a przy każdym wejściu.
 *
 * Konfiguracja w sanity.io/manage → API → Webhooks:
 *   URL:    https://<domena>/api/revalidate
 *   Trigger: Create, Update, Delete
 *   Secret: ta sama wartość co SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json({ message: "Brak SANITY_REVALIDATE_SECRET" }, { status: 500 });
    }

    const { isValidSignature } = await parseBody(req, secret);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Nieprawidłowy podpis" }, { status: 401 });
    }

    // `{ expire: 0 }` zamiast profilu "max": po publikacji zmiana ma być widoczna
    // od razu, a nie dopiero przy drugim wejściu (stale-while-revalidate).
    revalidateTag(CONTENT_TAG, { expire: 0 });
    return NextResponse.json({ revalidated: true, tag: CONTENT_TAG });
  } catch (err) {
    console.error("Webhook rewalidacji nie zadziałał:", err);
    return NextResponse.json({ message: "Błąd serwera" }, { status: 500 });
  }
}
