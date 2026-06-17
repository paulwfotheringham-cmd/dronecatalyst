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

  return (
    <>
      <header
        className={
          isHome
            ? "absolute inset-x-0 top-0 z-40 bg-transparent"
            : "sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl"
        }
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-[4.5rem]">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isHome
                    ? "text-white/85 hover:text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {link.chevron && (
                  <svg
                    width="12"
                    height="12"
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

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={`hidden rounded-md px-4 py-2 text-sm font-semibold transition-colors lg:inline-flex ${
                isHome
                  ? "bg-white text-[#0b2d63] hover:bg-white/90"
                  : "border border-[#cfe0ff] bg-[#EEF5FF] text-[#0b2d63] hover:bg-[#e3efff]"
              }`}
            >
              Contact Us
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors lg:hidden ${
                isHome
                  ? "border-white/25 text-white hover:border-white/40"
                  : "border-border text-muted hover:border-border-strong hover:text-foreground"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
