import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const LOGO_DARK = "/dronecatalyst-logo-dark.svg";

export default function Footer() {
  return (
    <footer className="bg-white text-[#1a2b4a]">
      <div className="mx-auto max-w-[1280px] px-8 pb-[32px] pt-[56px]">
        <div className="grid gap-[48px] md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex shrink-0 items-center">
              <Image
                src={LOGO_DARK}
                alt={SITE_NAME}
                width={170}
                height={37}
                className="h-[30px] w-auto object-contain"
              />
            </Link>
            <p className="mt-[14px] text-[13px] font-medium text-[#1a2b4a]/65">
              From Drone to Intelligence.
            </p>
            <span className="mt-[12px] block h-[3px] w-[36px] bg-[#2563eb]" aria-hidden />
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1a2b4a]">
              Services
            </h3>
            <ul className="mt-[16px] space-y-[10px]">
              <li>
                <Link href="/surveying" className="text-[13px] text-[#1a2b4a]/65 hover:text-[#1a2b4a]">
                  Surveying &amp; Geospatial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/inspection" className="text-[13px] text-[#1a2b4a]/65 hover:text-[#1a2b4a]">
                  Inspection &amp; Asset Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial-imaging"
                  className="text-[13px] text-[#1a2b4a]/65 hover:text-[#1a2b4a]"
                >
                  Premium Media &amp; Broadcast
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1a2b4a]">
              Company
            </h3>
            <ul className="mt-[16px] space-y-[10px]">
              <li>
                <Link href="/about" className="text-[13px] text-[#1a2b4a]/65 hover:text-[#1a2b4a]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[13px] text-[#1a2b4a]/65 hover:text-[#1a2b4a]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1a2b4a]">
              Contact
            </h3>
            <ul className="mt-[16px]">
              <li>
                <a
                  href="mailto:info@dronecatalyst.com"
                  className="inline-flex items-center gap-[8px] text-[13px] text-[#1a2b4a]/65 hover:text-[#1a2b4a]"
                >
                  <svg
                    width="15"
                    height="15"
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

        <div className="mt-[48px] border-t border-black/[0.08] pt-[24px] text-center">
          <p className="text-[12px] text-[#1a2b4a]/50">
            © 2026 Drone Catalyst. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
