import Image from "next/image";
import Link from "next/link";
import DashboardMockup from "./DashboardMockup";

const HERO_IMAGE = "/images/site-intelligence.jpg";

export default function HomeHero() {
  return (
    <section className="relative overflow-x-hidden bg-[#050816]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#071428] to-[#0a1628]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(37,99,235,0.18),transparent_55%)]" />
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

      <div className="relative mx-auto max-w-[1280px] px-6 pb-20 pt-[104px] sm:px-8 lg:px-8 lg:pb-32 lg:pt-[120px]">
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

          {/* Right column — platform first, project imagery supporting */}
          <div className="relative mx-auto w-full max-w-[560px] pb-10 sm:pb-12 lg:mx-0 lg:max-w-none lg:pb-14">
            <div className="relative min-h-[360px] sm:min-h-[400px] lg:min-h-[440px]">
              {/* Real project imagery — tertiary layer, receded */}
              <div className="absolute inset-x-[6%] top-[4%] z-0 aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0c1222] shadow-[0_16px_40px_rgba(0,0,0,0.3)] sm:inset-x-[4%] sm:rounded-3xl lg:inset-x-[8%]">
                <Image
                  src={HERO_IMAGE}
                  alt="Aerial view of a large-scale quarry and industrial earthworks site"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/25 to-[#050816]/10" />
                <div className="absolute inset-0 bg-[#050816]/15" />
              </div>

              {/* Platform dashboard — primary focal point, ~25% larger overlap */}
              <div className="absolute left-1/2 top-[12%] z-10 w-[220%] max-w-[1260px] -translate-x-1/2 sm:top-[14%] lg:top-[16%] lg:w-[235%]">
                <div className="rounded-xl border border-white/12 bg-[#0c1424] p-2 shadow-[0_48px_96px_rgba(0,0,0,0.6),0_12px_40px_rgba(0,0,0,0.35)] sm:rounded-2xl sm:p-2.5">
                  <div className="overflow-hidden rounded-lg sm:rounded-xl">
                    <DashboardMockup />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
