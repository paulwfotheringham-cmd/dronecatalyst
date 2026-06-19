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

          {/* Right column — product showcase visual */}
          <div className="relative mx-auto w-full overflow-visible lg:mx-0 lg:-mr-8 xl:-mr-12">
            <div
              className="pointer-events-none absolute -inset-x-3 -inset-y-2 rounded-[2rem] bg-[#070d18]/50 shadow-[0_40px_100px_rgba(0,0,0,0.45)] sm:-inset-x-4 sm:-inset-y-3 sm:rounded-[2.25rem] lg:-inset-x-5 lg:-inset-y-4"
              aria-hidden
            />
            <div className="relative aspect-[4/3] origin-center scale-[1.08] sm:origin-left sm:scale-[1.12] lg:aspect-[5/4] lg:origin-left lg:scale-[1.38] xl:scale-[1.38]">
              <div className="relative h-full w-full overflow-hidden rounded-[1.625rem] shadow-[0_28px_72px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.28)] sm:rounded-[1.875rem] lg:rounded-[2rem]">
                <Image
                  src={HERO_ARTWORK}
                  alt="Drone surveying an industrial quarry site with aerial intelligence platform dashboard"
                  fill
                  priority
                  className="object-cover object-center contrast-[1.12] saturate-[1.1]"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
