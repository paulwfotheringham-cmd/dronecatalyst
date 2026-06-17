import Link from "next/link";

const OFFERS = [
  {
    title: "Surveying & Geospatial Intelligence",
    tagline: "Measure. Map. Monitor.",
    href: "/surveying",
    bullets: [
      "Stockpile & Volume",
      "Construction Surveying",
      "Progress Monitoring",
      "Orthomosaic Mapping",
    ],
  },
  {
    title: "Inspection & Asset Intelligence",
    tagline: "Inspect. Assess. Report.",
    href: "/inspection",
    bullets: [
      "Building & Roof",
      "Energy Assets",
      "Infrastructure",
      "Defect Detection",
    ],
  },
  {
    title: "Premium Media & Broadcast",
    tagline: "Capture. Create. Communicate.",
    href: "/commercial-imaging",
    bullets: [
      "Commercial Productions",
      "Sports & Live Events",
      "Hospitality & Yachting",
      "Brand Content",
    ],
  },
] as const;

function ServiceIcon({ index }: { index: number }) {
  const cls = "h-7 w-7 text-accent";
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <path d="M3 20l6-6 4 4 8-10" />
        <path d="M17 8h4v4" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.5-4.5" />
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

export default function WhatWeOffer() {
  return (
    <section id="services" className="topo-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#0b2d63] sm:text-4xl">
            What We Can Offer
          </h2>
          <p className="mt-3 text-base text-[#0b2d63]/70 sm:text-lg">
            End-to-end aerial intelligence and media solutions.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {OFFERS.map((item, i) => (
            <div
              key={item.title}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-[0_8px_40px_rgba(11,45,99,0.08)]"
            >
              <ServiceIcon index={i} />
              <h3 className="mt-5 text-lg font-semibold leading-snug text-[#0b2d63]">
                {item.title}
              </h3>
              <Link
                href={item.href}
                className="mt-2 text-sm font-semibold text-accent hover:text-accent-hover"
              >
                {item.tagline}
              </Link>
              <ul className="mt-6 flex-1 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#0b2d63]/80">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
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
          ))}
        </div>
      </div>
    </section>
  );
}
