import Link from "next/link";
import GeospatialDashboard from "./GeospatialDashboard";
import HeroVideoBackground from "./HeroVideoBackground";

export default function HomeHero() {
  return (
    <section className="relative overflow-x-hidden bg-[#020617]">
      <HeroVideoBackground />

      {/* Legibility gradient — lighter on the right so video stays visible */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.38) 42%, rgba(0, 0, 0, 0.12) 68%, transparent 82%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-[104px] lg:px-10 lg:pb-40 lg:pt-[120px]">
        <div className="grid items-center gap-10 lg:grid-cols-[42%_58%] lg:gap-10 xl:gap-12">
          {/* Left column */}
          <div className="relative max-w-[560px]">
            <h1 className="text-4xl font-bold leading-[0.95] tracking-[-0.03em] text-white sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.5rem]">
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

          {/* Right column — platform preview */}
          <div className="relative min-h-0 lg:min-h-[320px]">
            <div className="relative z-10 flex justify-center pt-2 sm:absolute sm:-bottom-10 sm:left-10 sm:right-auto sm:translate-y-20 sm:pt-0 md:left-14 lg:left-20 lg:translate-y-28 xl:-bottom-14 xl:left-28 xl:translate-y-32">
              <GeospatialDashboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
