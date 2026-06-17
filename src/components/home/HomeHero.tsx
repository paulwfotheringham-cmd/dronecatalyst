import Image from "next/image";
import Link from "next/link";
import DashboardMockup from "./DashboardMockup";

const HERO_BG = "/images/hero-quarry.jpg";
const DRONE_IMG = "/images/hero-drone.jpg";

export default function HomeHero() {
  return (
    <section className="relative min-h-[680px] overflow-visible pb-[180px] lg:h-[700px] lg:pb-0">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          className="object-cover object-[65%_55%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/94 via-[#050816]/60 to-[#050816]/20" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 6% 10%, rgba(37,99,235,0.3), transparent 70%)",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute left-0 top-0 h-[200px] w-[380px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(59,130,246,0.4) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto h-full max-w-[1280px] px-8">
        <div className="grid h-full items-center pt-[72px] lg:grid-cols-[44%_56%]">
          <div className="max-w-[480px]">
            <h1 className="text-[44px] font-bold leading-[1.02] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[58px]">
              FROM DRONE
              <br />
              TO INTELLIGENCE
            </h1>
            <p className="mt-[18px] text-[17px] font-semibold leading-none text-[#3b82f6] lg:text-[18px]">
              Data. Insight. Visibility.
            </p>
            <p className="mt-[20px] max-w-[480px] text-[15px] leading-[1.65] text-white/88">
              We do more than just fly. Drone Catalyst captures, processes and delivers
              aerial intelligence through a secure cloud platform, giving you access to your
              projects, reports and insights anytime, anywhere.
            </p>
            <div className="mt-[32px] flex items-center gap-[14px]">
              <Link
                href="#services"
                className="inline-flex h-[44px] items-center justify-center gap-1.5 rounded-lg bg-[#0b2d63] px-[22px] text-[14px] font-semibold text-white"
              >
                Explore Services
                <span aria-hidden className="text-[15px]">
                  &gt;
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-[44px] items-center justify-center rounded-lg bg-[#e5e5e5] px-[22px] text-[14px] font-semibold text-[#0b2d63]"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative hidden h-full lg:block">
            <div className="absolute right-0 top-[-10px] h-[170px] w-[300px]">
              <Image
                src={DRONE_IMG}
                alt=""
                fill
                className="object-contain object-right-top"
                sizes="300px"
              />
            </div>
            <svg
              className="absolute right-[40px] top-[120px] h-[220px] w-[320px]"
              viewBox="0 0 320 220"
              fill="none"
              aria-hidden
            >
              <path d="M160 0 L40 220 L280 220 Z" fill="url(#lidarGrad)" fillOpacity="0.3" />
              <path
                d="M160 0 L40 220 L280 220 Z"
                stroke="rgba(96,165,250,0.5)"
                strokeWidth="0.75"
                fill="none"
              />
              <defs>
                <linearGradient id="lidarGrad" x1="160" y1="0" x2="160" y2="220">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="45%" stopColor="#22c55e" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              {[
                "M50 170 Q100 150 150 165 T250 160",
                "M60 185 Q120 165 180 180 T280 175",
                "M70 155 Q130 135 190 150 T290 145",
              ].map((d) => (
                <path key={d} d={d} stroke="rgba(59,130,246,0.35)" strokeWidth="0.5" fill="none" />
              ))}
            </svg>
          </div>
        </div>

        <div className="absolute bottom-0 right-8 z-10 hidden w-[62%] max-w-[740px] translate-y-[48%] lg:block">
          <DashboardMockup />
        </div>
        <div className="relative z-10 mt-8 lg:hidden">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
