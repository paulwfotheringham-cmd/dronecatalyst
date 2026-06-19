import Image from "next/image";
import Link from "next/link";

const HERO_ARTWORK = "/images/hero-artwork.png";

function HeroDroneAccent() {
  return (
    <svg
      viewBox="0 0 160 96"
      className="h-full w-full drop-shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
      fill="none"
      aria-hidden
    >
      <ellipse cx="80" cy="34" rx="18" ry="10" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
      <ellipse cx="80" cy="34" rx="10" ry="5" fill="#0f172a" />
      <rect x="76" y="38" width="8" height="10" rx="2" fill="#334155" />
      {[
        { x: 28, y: 28 },
        { x: 132, y: 28 },
        { x: 28, y: 52 },
        { x: 132, y: 52 },
      ].map((arm, i) => (
        <g key={i}>
          <line x1="80" y1="34" x2={arm.x} y2={arm.y} stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={arm.x} cy={arm.y} r="14" stroke="#475569" strokeWidth="1.5" fill="#0f172a" opacity="0.9" />
          <ellipse cx={arm.x} cy={arm.y} rx="14" ry="3.5" stroke="#64748b" strokeWidth="0.75" opacity="0.45" />
        </g>
      ))}
    </svg>
  );
}

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#050816]">
      {/* Integrated hero visual — full-width scene with left-to-right blend */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_ARTWORK}
          alt=""
          fill
          priority
          className="object-cover object-[62%_center] contrast-[1.1] saturate-[1.08]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816] from-0% via-[#050816]/88 via-32% to-[#050816]/10 to-72%" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071428]/95 via-[#050816]/45 via-38% to-transparent to-80%" />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 10% 20%, rgba(37,99,235,0.35), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/50 via-transparent to-[#050816]/15" />
      </div>

      {/* Subtle drone — right side only */}
      <div className="pointer-events-none absolute right-[6%] top-[16%] z-[1] hidden h-[120px] w-[168px] opacity-90 lg:block xl:right-[10%] xl:top-[14%] xl:h-[136px] xl:w-[190px]">
        <HeroDroneAccent />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 pb-12 pt-[104px] sm:px-8 lg:px-6 lg:pb-16 lg:pt-[120px]">
        <div className="grid items-center gap-8 lg:grid-cols-[44%_56%] lg:gap-8 xl:gap-10">
          {/* Left column */}
          <div className="max-w-[560px]">
            <h1 className="text-[2.5rem] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]">
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

          {/* Right column — visual continues through integrated background */}
          <div className="relative hidden min-h-[420px] lg:block xl:min-h-[480px]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
