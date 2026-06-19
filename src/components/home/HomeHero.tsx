import Image from "next/image";
import Link from "next/link";

const HERO_ARTWORK = "/images/hero-artwork.png";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#050816]">
      {/* Immersive hero scene — artwork integrated into the section */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#071428] to-[#0a1628]" />

        {/* Project imagery — extends across the right side of the hero */}
        <div className="absolute inset-y-0 right-0 left-[20%] sm:left-[28%] lg:left-[36%] xl:left-[34%]">
          <Image
            src={HERO_ARTWORK}
            alt=""
            fill
            priority
            className="object-cover object-[68%_center] contrast-[1.14] saturate-[1.16] brightness-[1.02]"
            sizes="(max-width: 1024px) 80vw, 65vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/88 to-[#050816]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071428]/95 via-[#050816]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/70 via-transparent to-[#050816]/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/35 via-transparent to-[#071428]/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(37,99,235,0.06),transparent_60%)]" />
        </div>

        {/* Text-side depth */}
        <div className="absolute inset-y-0 left-0 w-full max-w-[720px] bg-gradient-to-r from-[#050816] via-[#050816]/92 to-transparent lg:max-w-[820px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_35%,rgba(37,99,235,0.12),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 pb-12 pt-[104px] sm:px-8 lg:px-6 lg:pb-16 lg:pt-[120px]">
        <div className="grid items-center gap-8 lg:grid-cols-[44%_56%] lg:gap-8 xl:gap-10">
          {/* Left column */}
          <div className="relative z-10 max-w-[560px]">
            <h1 className="text-[2.5rem] font-bold leading-[0.98] tracking-[-0.03em] text-white sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]">
              FROM DRONE
              <br />
              TO INTELLIGENCE
            </h1>

            <p className="mt-5 text-lg font-semibold tracking-tight text-[#3b82f6] sm:text-xl">
              Data. Insight. Visibility.
            </p>

            <p className="mt-6 max-w-[520px] text-base leading-[1.7] text-white/70 sm:text-[17px]">
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

          {/* Right column — scene continues through background artwork */}
          <div className="relative hidden min-h-[420px] lg:block xl:min-h-[480px]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
