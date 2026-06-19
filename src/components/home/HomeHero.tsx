import Image from "next/image";
import Link from "next/link";
import DashboardMockup from "./DashboardMockup";

const HERO_IMAGE = "/images/hero-westport.jpg";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#050816]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#071428] to-[#0a1628]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(37,99,235,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_80%,rgba(37,99,235,0.12),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute -left-1/4 top-0 h-[520px] w-[520px] animate-[pulse_10s_ease-in-out_infinite] rounded-full bg-[#2563eb]/10 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[480px] w-[480px] animate-[pulse_12s_ease-in-out_infinite_2s] rounded-full bg-[#1d4ed8]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 pb-16 pt-[104px] sm:px-8 lg:px-8 lg:pb-24 lg:pt-[120px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
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

          {/* Right column */}
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#0c1222] shadow-[0_32px_80px_rgba(0,0,0,0.45)] sm:rounded-3xl">
              <Image
                src={HERO_IMAGE}
                alt="Aerial view of an industrial logistics site"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/60 via-transparent to-[#050816]/20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.15),transparent_50%)]" />
            </div>

            {/* Floating platform preview */}
            <div className="absolute -bottom-8 left-1/2 z-10 w-[108%] max-w-[620px] -translate-x-1/2 sm:-bottom-10 lg:-bottom-12 lg:w-[115%]">
              <div className="rounded-xl border border-white/10 bg-[#0c1424]/95 p-1 shadow-[0_40px_80px_rgba(0,0,0,0.55)] backdrop-blur-md sm:rounded-2xl">
                <DashboardMockup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
