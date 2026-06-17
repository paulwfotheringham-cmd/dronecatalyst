import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const LOGO_DARK = "/dronecatalyst-logo-dark.svg";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white text-[#0b2d63]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex shrink-0 items-center">
              <Image
                src={LOGO_DARK}
                alt={SITE_NAME}
                width={180}
                height={39}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm font-medium text-[#0b2d63]/70">
              From Drone to Intelligence.
            </p>
            <span className="mt-3 block h-0.5 w-10 bg-accent" aria-hidden />
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0b2d63]">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/surveying" className="text-sm text-[#0b2d63]/70 hover:text-[#0b2d63]">
                  Surveying &amp; Geospatial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/inspection" className="text-sm text-[#0b2d63]/70 hover:text-[#0b2d63]">
                  Inspection &amp; Asset Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial-imaging"
                  className="text-sm text-[#0b2d63]/70 hover:text-[#0b2d63]"
                >
                  Premium Media &amp; Broadcast
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0b2d63]">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-[#0b2d63]/70">
              <li>
                <Link href="/about" className="hover:text-[#0b2d63]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0b2d63]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0b2d63]">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-[#0b2d63]/70">
              <li>
                <a
                  href="mailto:info@dronecatalyst.com"
                  className="inline-flex items-center gap-2 hover:text-[#0b2d63]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  info@dronecatalyst.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-8 text-center">
          <p className="text-sm text-[#0b2d63]/60">
            © 2026 Drone Catalyst. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
