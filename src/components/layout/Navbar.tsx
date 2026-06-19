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
  const isDashboard = pathname?.startsWith("/test1");

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
        <div className="mx-auto max-w-[1536px] px-12 lg:grid lg:h-[80px] lg:grid-cols-[minmax(240px,1fr)_auto_minmax(240px,1fr)] lg:items-center lg:px-16 xl:px-20">
          <div className="flex h-[68px] items-center justify-between lg:h-full lg:contents">
            {/* Left zone — logo */}
            <div className="flex items-center justify-start lg:pr-10">
              <Logo height={44} />
            </div>

            {/* Center zone — navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center justify-center gap-16 lg:flex xl:gap-20"
            >
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1 whitespace-nowrap px-[14px] py-2 text-[14px] font-medium ${
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

            {/* Right zone — contact */}
            <div className="flex items-center justify-end gap-3 lg:pl-10">
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
