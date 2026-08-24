import * as React from "react";
import Link from "next/link";

/**
 * Kit renderował każdy link jako <a>, bo działał bez routingu (przełączanie widoku
 * w stanie). W Next.js trasy wewnętrzne mają iść przez next/link — client-side
 * nawigacja i prefetch. Zewnętrzne (https://, tel:, mailto:, #kotwica) zostają <a>.
 */
export type AppLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function AppLink({ href, children, ...rest }: AppLinkProps) {
  if (isInternalHref(href)) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)} {...rest}>
      {children}
    </a>
  );
}
