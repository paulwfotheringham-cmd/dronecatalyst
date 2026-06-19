import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/layout/Logo";
import GeospatialDashboard from "./GeospatialDashboard";

const SITE_IMAGE = "/images/site-intelligence.jpg";
const DRONE_IMAGE = "/images/hero-drone.png";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#030712]">
      {/* Layer 1 — full-bleed site background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={SITE_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center brightness-[0.55] contrast-[1.12] saturate-[0.95]"
          sizes="100vw"
        />
      </div>

      {/* Strong left navy overlay — premium SaaS readability surface */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[58%]"
        aria-hidden
        style={{
          background:
            "linear-gradient(to right, rgba(2, 6, 18, 0.99) 0%, rgba(3, 7, 20, 0.97) 24%, rgba(5, 8, 22, 0.88) 46%, rgba(5, 8, 22, 0.45) 62%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-20 pt-[112px] sm:px-8 lg:px-10 lg:pb-24 lg:pt-[128px]">
        <div className="grid items-center gap-12 lg:grid-cols-[42%_58%] lg:gap-10 xl:gap-12">
          {/* Left column */}
          <div className="relative max-w-[560px]">
            <Logo height={38} className="mb-8 hidden lg:inline-flex" />

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

          {/* Right column — site → drone → dashboard composition */}
          <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[580px] xl:min-h-[620px]">
            {/* Layer 2 — drone, upper-right */}
            <div className="pointer-events-none absolute right-[4%] top-[2%] z-20 w-[34%] min-w-[160px] max-w-[260px] sm:top-[0%] lg:right-[6%] lg:top-[-2%] lg:w-[36%] lg:max-w-[280px]">
              <div className="relative aspect-[4/3] drop-shadow-[0_24px_48px_rgba(0,0,0,0.65)]">
                <Image
                  src={DRONE_IMAGE}
                  alt="Professional survey drone in flight"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 34vw, 280px"
                />
              </div>
            </div>

            {/* Layer 3 — analytics dashboard, lower-right (~38% of hero width) */}
            <div className="absolute bottom-0 right-0 z-30 w-full sm:w-[94%] lg:w-[66%] lg:min-w-[480px] xl:w-[68%]">
              <GeospatialDashboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
