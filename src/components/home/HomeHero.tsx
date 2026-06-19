import Image from "next/image";
import Link from "next/link";

const HERO_ARTWORK = "/images/hero-artwork.png";

export default function HomeHero() {
  return (
    <section className="relative overflow-x-hidden bg-[#050816]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#071428] to-[#0a1628]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(37,99,235,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_80%,rgba(37,99,235,0.08),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
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
          <div className="max-w-[560px]">
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

          {/* Right column — single composed hero artwork */}
          <div className="relative mx-auto w-full lg:mx-0 lg:-mr-6 xl:-mr-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c1222] shadow-[0_24px_64px_rgba(0,0,0,0.45)] sm:rounded-3xl sm:scale-[1.05] sm:origin-left lg:aspect-[5/4] lg:scale-[1.2] lg:origin-left">
              <Image
                src={HERO_ARTWORK}
                alt="Drone surveying an industrial quarry site with aerial intelligence platform dashboard"
                fill
                priority
                className="object-cover object-center contrast-[1.14] saturate-[1.16] brightness-[1.03]"
                sizes="(max-width: 1024px) 100vw, 820px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/[0.06] via-transparent to-[#1e3a5f]/[0.08]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/30 via-transparent to-[#2563eb]/[0.04]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(37,99,235,0.07),transparent_58%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_44%,rgba(5,8,22,0.2)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#050816]/22 via-[#050816]/[0.02] to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
