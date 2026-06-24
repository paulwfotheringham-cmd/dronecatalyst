import Image from "next/image";
import Link from "next/link";
import GeospatialDashboard from "./GeospatialDashboard";

const CONSTRUCTION_BG = "/images/construction-bg.jpg";

const OFFERS = [
  {
    title: "Surveying & Geospatial Intelligence",
    tagline: "Measure. Map. Monitor.",
    href: "/surveying",
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
    bullets: [
      "Commercial & Brand Productions",
      "Sports & Live Events",
      "Maritime & Yachting",
      "Production Support",
    ],
  },
] as const;

function ServiceIcon({ index }: { index: number }) {
  const cls = "h-[22px] w-[22px] stroke-white";
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
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="h-px w-12 bg-[#3b82f6] sm:w-20" aria-hidden />
          <p className="text-[22px] font-semibold uppercase tracking-[0.18em] text-[#3b82f6]">
            What We Can Offer
          </p>
          <span className="h-px w-12 bg-[#3b82f6] sm:w-20" aria-hidden />
        </div>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/65">
          End-to-end aerial intelligence and media solutions.
        </p>

        <div className="mt-10 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4 lg:gap-5">
            {OFFERS.map((item, i) => (
              <div
                key={item.title}
                className="flex min-h-[320px] min-w-0 flex-col rounded-xl bg-white px-5 py-6 shadow-[0_4px_24px_rgba(11,45,99,0.12)] sm:min-h-[340px] sm:px-5 sm:py-7"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2563eb] sm:h-12 sm:w-12">
                  <ServiceIcon index={i} />
                </div>
                <h3 className="mt-4 text-[13px] font-bold leading-snug text-[#1a2b4a] sm:text-[14px]">
                  {item.title}
                </h3>
                <Link
                  href={item.href}
                  className="mt-2 inline-block text-[11px] font-semibold leading-snug text-[#2563eb] sm:text-[12px]"
                >
                  {item.tagline}
                </Link>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-[11px] leading-snug text-[#1a2b4a]/75 sm:text-[12px]"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2563eb]"
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

          <div className="flex min-w-0 items-stretch justify-center lg:justify-end">
            <GeospatialDashboard className="w-full max-w-[520px] sm:max-w-[580px] lg:max-w-none lg:w-full xl:max-w-[640px] 2xl:max-w-[720px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
