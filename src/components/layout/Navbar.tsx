"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const NAV = [
  { href: "#services", label: "Services", chevron: true },
  { href: "#platform", label: "Platform", chevron: false },
  { href: "/about", label: "About Us", chevron: false },
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDashboard =
    pathname?.startsWith("/test1") ||
    pathname?.startsWith("/testflighthub") ||
    pathname?.startsWith("/internaldashboard") ||
    pathname?.startsWith("/telemetry");

  if (isDashboard) {
    return null;
  }

  return (
    <>
      <header
        className={
          isHome
            ? "absolute inset-x-0 top-0 z-40 bg-transparent"
            : "sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl"
        }
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center px-6 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <div className="flex w-full items-center justify-between lg:contents">
            {/* Logo */}
            <div className="flex items-center justify-start">
              <Logo height={48} />
            </div>

            {/* Centered navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center justify-center gap-12 lg:flex xl:gap-14"
            >
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1 whitespace-nowrap text-[14px] font-medium ${
                    isHome ? "text-white/90" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {link.chevron && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </Link>
              ))}
            </nav>

            {/* Contact — far right */}
            <div className="flex items-center justify-end gap-3">
              <Link
                href="/contact"
                className={`hidden h-[36px] items-center rounded-md px-[16px] text-[14px] font-semibold lg:inline-flex ${
                  isHome
                    ? "bg-white text-[#0b2d63]"
                    : "border border-[#cfe0ff] bg-[#EEF5FF] text-[#0b2d63]"
                }`}
              >
                Contact Us
              </Link>
              <Link
                href="/test1"
                className="hidden h-[36px] items-center rounded-md bg-[#0b2d63] px-[16px] text-[14px] font-semibold text-white hover:bg-[#082652] lg:inline-flex"
              >
                Login
              </Link>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden ${
                  isHome
                    ? "border-white/25 text-white"
                    : "border-border text-muted"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
