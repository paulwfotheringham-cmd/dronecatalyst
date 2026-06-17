import Image from "next/image";
import Link from "next/link";
import DashboardMockup from "./DashboardMockup";

export default function HomeHero() {
  return (
    <section className="relative min-h-[720px] overflow-visible pb-32 pt-28 lg:min-h-[780px] lg:pb-40 lg:pt-32">
      {/* Quarry background */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/95 via-[#050816]/75 to-[#050816]/40" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 10% 20%, rgba(37,99,235,0.35), transparent 70%)",
          }}
        />
      </div>

      {/* Abstract wave accent — top left */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-64 w-96 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(37,99,235,0.5) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          {/* Left copy */}
          <div className="max-w-xl pt-4 lg:pt-8">
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              FROM DRONE
              <br />
              TO INTELLIGENCE
            </h1>
            <p className="mt-4 text-lg font-semibold text-accent sm:text-xl">
              Data. Insight. Visibility.
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-[17px]">
              We do more than just fly. Drone Catalyst captures, processes and delivers
              aerial intelligence through a secure cloud platform, giving you access to your
              projects, reports and insights anytime, anywhere.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0b2d63] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d3575]"
              >
                Explore Services
                <span aria-hidden>›</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[#e8e8e8] px-7 py-3.5 text-sm font-semibold text-[#0b2d63] transition-colors hover:bg-white"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right: drone + heatmap over quarry */}
          <div className="relative hidden min-h-[320px] lg:block">
            <div className="absolute -right-4 top-0 h-[280px] w-[90%]">
              <Image
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80"
                alt=""
                fill
                className="object-contain object-right-top drop-shadow-2xl"
                sizes="50vw"
              />
            </div>
            {/* Heatmap mesh overlay */}
            <div
              className="absolute bottom-0 right-0 h-48 w-[75%] rounded-lg opacity-70"
              aria-hidden
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.15) 25%, transparent 25%, transparent 50%, rgba(16,185,129,0.2) 50%, rgba(16,185,129,0.2) 75%, rgba(239,68,68,0.15) 75%)",
                backgroundSize: "24px 24px",
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              }}
            />
          </div>
        </div>

        {/* Dashboard — overlaps into next section */}
        <div className="relative z-10 mt-10 flex justify-center lg:absolute lg:bottom-0 lg:right-6 lg:mt-0 lg:translate-y-[45%] lg:justify-end">
          <div className="w-full max-w-[640px] scale-[0.92] origin-top sm:scale-100 lg:scale-[0.88] xl:scale-95">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
