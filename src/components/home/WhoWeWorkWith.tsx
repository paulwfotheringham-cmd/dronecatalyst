import Image from "next/image";

const CONSTRUCTION_BG = "/images/construction-bg.jpg";

const INDUSTRIES = [
  { label: "Construction Companies", icon: "building" },
  { label: "Infrastructure Developers", icon: "bridge" },
  { label: "Energy & Utilities", icon: "bolt" },
  { label: "Industrial Facilities", icon: "factory" },
  { label: "Media & Production", icon: "camera" },
  { label: "Mining & Quarrying", icon: "pickaxe" },
  { label: "Ports & Logistics", icon: "ship" },
  { label: "Waste Management", icon: "recycle" },
  { label: "Maritime & Yachting", icon: "anchor" },
  { label: "Sports & Events", icon: "trophy" },
  { label: "Brands & Agencies", icon: "megaphone" },
] as const;

function IndustryIcon({ type }: { type: (typeof INDUSTRIES)[number]["icon"] }) {
  const cls = "h-[36px] w-[36px] stroke-white";
  switch (type) {
    case "building":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        </svg>
      );
    case "bridge":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <path d="M2 16h20M4 16v-4M8 16V9M12 16V6M16 16V9M20 16v-4" />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
        </svg>
      );
    case "factory":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <path d="M2 20h20M4 20V10l4 2V8l4 2V6l4 2v12M10 14h2M14 14h2" />
        </svg>
      );
    case "camera":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <path d="M4 7h3l2-3h6l2 3h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      );
    case "pickaxe":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <path d="M14 4l6 6M8 20l8-8M4 8l4 4M10 14L6 18" />
        </svg>
      );
    case "ship":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <path d="M3 18h18l-2-6H5l-2 6zM12 6V3M8 6l4-3 4 3" />
        </svg>
      );
    case "recycle":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <path d="M7 19l-3-5h6l-3 5M17 5l3 5h-6l3-5M12 3v6M9 12h6" />
        </svg>
      );
    case "anchor":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v12M8 15a4 4 0 008 0" />
        </svg>
      );
    case "trophy":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM5 4H3v2a3 3 0 003 3M19 4h2v2a3 3 0 01-3 3" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={cls}>
          <path d="M3 10v4h4l5 4V6L7 10H3zM16 8a4 4 0 010 8M19 6a7 7 0 010 12" />
        </svg>
      );
  }
}

export default function WhoWeWorkWith() {
  return (
    <section className="relative overflow-hidden pb-[72px] pt-[220px]">
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

      <div className="relative mx-auto max-w-[1280px] px-8">
        <div className="flex items-center justify-center gap-5">
          <span className="h-px w-[120px] bg-[#3b82f6] sm:w-[180px]" aria-hidden />
          <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3b82f6]">
            WHO WE WORK WITH
          </p>
          <span className="h-px w-[120px] bg-[#3b82f6] sm:w-[180px]" aria-hidden />
        </div>

        <div className="mt-[52px]">
          <div className="grid grid-cols-2 gap-x-4 gap-y-[40px] sm:grid-cols-3 lg:grid-cols-5">
            {INDUSTRIES.slice(0, 5).map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <IndustryIcon type={item.icon} />
                <p className="mt-[14px] text-[12px] font-normal leading-[1.35] text-white/90">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-[40px] grid grid-cols-2 gap-x-4 gap-y-[40px] sm:grid-cols-3 lg:grid-cols-6">
            {INDUSTRIES.slice(5).map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <IndustryIcon type={item.icon} />
                <p className="mt-[14px] text-[12px] font-normal leading-[1.35] text-white/90">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
