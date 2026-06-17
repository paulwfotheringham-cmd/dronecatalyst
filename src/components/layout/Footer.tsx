import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-black/10 bg-white text-[#0b2d63]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo height={28} />
            <p className="mt-4 text-sm font-medium text-[#0b2d63]/70">
              From Drone to Intelligence.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#0b2d63]">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/inspection" className="text-sm text-[#0b2d63]/70 hover:text-[#0b2d63]">
                  Inspection
                </Link>
              </li>
              <li>
                <Link href="/surveying" className="text-sm text-[#0b2d63]/70 hover:text-[#0b2d63]">
                  Surveying
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial-imaging"
                  className="text-sm text-[#0b2d63]/70 hover:text-[#0b2d63]"
                >
                  Premium Media
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
                <Link href="#platform" className="hover:text-[#0b2d63]">
                  Platform
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0b2d63]">
                  About Us
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
                <a href="mailto:info@dronecatalyst.com" className="hover:text-[#0b2d63]">
                  info@dronecatalyst.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0b2d63]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row">
          <p className="text-sm text-[#0b2d63]/60">© {year} DroneCatalyst. All rights reserved.</p>
          <p className="text-sm text-[#0b2d63]/60">dronecatalyst.com</p>
        </div>
      </div>
    </footer>
  );
}
