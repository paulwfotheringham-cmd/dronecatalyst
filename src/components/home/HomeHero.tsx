import Image from "next/image";
import Link from "next/link";
import GeospatialDashboard from "./GeospatialDashboard";

const QUARRY_IMAGE = "/images/hero-quarry-terraces.png";
const DRONE_IMAGE = "/images/hero-drone-survey.png";

function SurveyScanCone() {
  return (
    <svg
      viewBox="0 0 240 360"
      className="pointer-events-none absolute right-[14%] top-[16%] z-[12] h-[48%] w-[34%] opacity-45 lg:right-[12%] lg:top-[14%]"
      aria-hidden
    >
      <defs>
        <linearGradient id="surveyCone" x1="120" y1="0" x2="120" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#2563eb" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M120 8 L52 360 L188 360 Z" fill="url(#surveyCone)" />
      <line x1="120" y1="8" x2="120" y2="360" stroke="#93c5fd" strokeWidth="0.75" opacity="0.35" />
    </svg>
  );
}

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#020617]">
      {/* Quarry background — full hero width */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={QUARRY_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Left navy gradient for text readability */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[68%]"
        aria-hidden
        style={{
          background:
            "linear-gradient(to right, rgba(2, 6, 18, 0.99) 0%, rgba(3, 7, 20, 0.98) 22%, rgba(5, 8, 22, 0.94) 40%, rgba(5, 8, 22, 0.72) 54%, rgba(5, 8, 22, 0.28) 68%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 pt-[104px] sm:px-8 lg:px-10 lg:pb-24 lg:pt-[120px]">
        <div className="grid items-center gap-12 lg:grid-cols-[42%_58%] lg:gap-10 xl:gap-12">
          {/* Left column */}
          <div className="relative max-w-[560px]">
            <h1 className="text-[2.65rem] font-bold leading-[0.92] tracking-[-0.03em] text-white sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.5rem]">
              FROM DRONE
              <br />
              TO INTELLIGENCE
            </h1>

            <p className="mt-5 text-lg font-semibold tracking-tight text-[#3b82f6] sm:text-xl">
              Data. Insight. Visibility.
            </p>

            <p className="mt-5 text-[15px] leading-[1.65] text-white/88 sm:text-[17px]">
              We do more than just fly.
            </p>

            <p className="mt-4 max-w-[520px] text-base leading-[1.7] text-white/70 sm:text-[17px]">
              Drone Catalyst captures, processes and delivers aerial intelligence through
              a secure cloud platform, giving you access to your projects, reports and
              insights anytime, anywhere.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="#services"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#2563eb] px-6 text-sm font-semibold text-white shadow-[0_0_32px_rgba(37,99,235,0.35)] transition-colors hover:bg-[#1d4ed8]"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.08]"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right column — composed marketing visual */}
          <div className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[580px] xl:min-h-[620px]">
            <SurveyScanCone />

            {/* Foreground drone — primary focal point */}
            <div className="pointer-events-none absolute right-[0%] top-[0%] z-20 w-[46%] min-w-[180px] max-w-[340px] sm:right-[2%] lg:right-[4%] lg:top-[-2%] lg:w-[48%] lg:max-w-[360px]">
              <div className="relative aspect-[4/3] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
                <Image
                  src={DRONE_IMAGE}
                  alt="Survey drone capturing site intelligence"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 46vw, 360px"
                />
              </div>
            </div>

            {/* Dashboard — secondary intelligence layer */}
            <div className="absolute bottom-0 right-0 z-30 w-full sm:w-[94%] lg:w-[61%] lg:min-w-[440px] xl:w-[62%]">
              <GeospatialDashboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
