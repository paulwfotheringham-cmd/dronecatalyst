import Link from "next/link";
import { CONTACT, NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo height={28} />
            <p className="mt-4 text-sm text-muted whitespace-nowrap">{SITE_TAGLINE}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Services</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-foreground">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            <a href="https://dronecatalyst.com" className="transition-colors hover:text-foreground">
              dronecatalyst.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
