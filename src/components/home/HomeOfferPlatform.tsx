import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import GeospatialDashboard from "./GeospatialDashboard";
import SectionHoverInfo from "./SectionHoverInfo";

const CONSTRUCTION_BG = "/images/construction-bg.jpg";

const OFFERS = [
  {
    title: "Surveying & Geospatial Intelligence",
    tagline: "Measure. Map. Monitor.",
    href: "/surveying",
    hoverTitle: "Surveying & Geospatial Intelligence",
    hoverInfo:
      "High-accuracy aerial capture for stockpile volumetrics, site mapping and construction progress. Deliverables include orthomosaics, DSMs, cut/fill analysis and survey-grade reporting.",
    bullets: [
      "Stockpile & Volume Analytics",
      "Construction Surveying",
      "Infrastructure Surveying",
      "Construction Progress Intelligence",
    ],
  },
  {
    title: "Inspection & Asset Intelligence",
    tagline: "Inspect. Assess. Report.",
    href: "/inspection",
    hoverTitle: "Inspection & Asset Intelligence",
    hoverInfo:
      "Visual and thermal inspections for buildings, roofs, energy assets and industrial infrastructure. Structured findings, severity tagging and client-ready inspection reports.",
    bullets: [
      "Building & Roof Inspections",
      "Energy Asset Inspections",
      "Industrial Asset Inspections",
      "Infrastructure Inspections",
    ],
  },
  {
    title: "Premium Media & Broadcast",
    tagline: "Capture. Create. Communicate.",
    href: "/commercial-imaging",
    hoverTitle: "Premium Media & Broadcast",
    hoverInfo:
      "Cinematic aerial production for brands, sports, maritime and live events. Professional crews, broadcast-ready capture and post-production support.",
    bullets: [
      "Commercial & Brand Productions",
      "Sports & Live Events",
      "Maritime & Yachting",
      "Production Support",
    ],
  },
] as const;

function ServiceIcon({ index }: { index: number }) {
  const cls = "h-[26px] w-[26px] stroke-white sm:h-[28px] sm:w-[28px]";
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M3 6l6-3 6 3v12l-6 3-6-3V6z" />
        <path d="M9 3v18M15 6v12" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
      <path d="M4 7h3l2-3h6l2 3h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function SectionTitle({
  children,
  centered = false,
}: {
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 sm:gap-6 ${centered ? "justify-center" : ""}`}
    >
      <span
        className={`h-px bg-[#3b82f6] ${centered ? "w-[80px] sm:w-[140px]" : "w-12 sm:w-20"}`}
        aria-hidden
      />
      <p className="text-[22px] font-semibold uppercase tracking-[0.18em] text-[#3b82f6]">
        {children}
      </p>
      <span
        className={`h-px bg-[#3b82f6] ${centered ? "w-[80px] sm:w-[140px]" : "w-12 sm:w-20"}`}
        aria-hidden
      />
    </div>
  );
}

export default function HomeOfferPlatform() {
  return (
    <section id="services" className="relative overflow-x-hidden bg-[#050816] py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={CONSTRUCTION_BG}
          alt=""
          fill
          className="object-cover object-center grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#050816]/84" />
      </div>

      <div className="relative mx-auto max-w-[1760px] px-5 sm:px-8 lg:px-10">
        <SectionTitle>What We Can Offer</SectionTitle>

        <div className="mt-10 grid w-full grid-cols-1 gap-5 overflow-visible sm:grid-cols-3 sm:gap-4 lg:gap-6">
          {OFFERS.map((item, i) => (
            <SectionHoverInfo
              key={item.title}
              title={item.hoverTitle}
              description={item.hoverInfo}
              variant="light"
            >
              <div className="flex min-h-[360px] min-w-0 flex-col rounded-xl bg-white px-6 py-7 shadow-[0_4px_24px_rgba(11,45,99,0.12)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,45,99,0.18)] sm:min-h-[380px] sm:px-7 sm:py-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#2563eb] sm:h-16 sm:w-16">
                <ServiceIcon index={i} />
              </div>
              <h3 className="mt-5 text-[17px] font-bold leading-snug text-[#1a2b4a] sm:text-[18px] lg:text-[19px]">
                {item.title}
              </h3>
              <Link
                href={item.href}
                className="mt-3 inline-block text-[14px] font-semibold leading-snug text-[#2563eb] sm:text-[15px]"
              >
                {item.tagline}
              </Link>
              <ul className="mt-5 flex-1 space-y-3">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-[14px] leading-snug text-[#1a2b4a]/75 sm:text-[15px] lg:text-[16px]"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]"
                      aria-hidden
                    >
                      <path
                        d="M3 8.5l3 3 7-7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {bullet}
                  </li>
                ))}
              </ul>
              </div>
            </SectionHoverInfo>
          ))}
        </div>

        <div id="platform" className="mt-16 sm:mt-20 lg:mt-24">
          <SectionTitle centered>Intelligence Platform</SectionTitle>

          <div className="mt-10 w-full">
            <GeospatialDashboard className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
