import Image from "next/image";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-20 lg:pb-24 lg:pt-24">
      <div className="absolute inset-0 grid-pattern" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 0%, rgba(37,99,235,0.14), transparent 60%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-10">
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
            Data. Insight. Visibility.
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl">
            FROM DRONE
            <br />
            TO INTELLIGENCE
          </h1>
          <p className="mt-6 text-base font-medium text-foreground/90">
            We do more than just fly.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Drone Catalyst captures, processes and delivers aerial intelligence through a
            secure cloud platform, giving you access to your projects, reports and
            insights anytime, anywhere.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface-elevated"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-[#cfe0ff] bg-[#EEF5FF] px-6 py-3.5 text-sm font-semibold text-[#0b2d63] transition-colors hover:bg-[#e3efff]"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="relative aspect-[5/4]">
              {/* Quarry image */}
              <Image
                src="https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1800&q=80"
                alt="Quarry site"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/15 to-transparent" />

              {/* Drone image over quarry */}
              <div className="pointer-events-none absolute -right-10 top-2 h-[70%] w-[70%] opacity-95">
                <Image
                  src="https://images.unsplash.com/photo-1524143986875-3b0c1f0b7f53?auto=format&fit=crop&w=1400&q=80"
                  alt="Drone in flight"
                  fill
                  className="object-contain mix-blend-screen"
                  sizes="(max-width: 1024px) 70vw, 35vw"
                />
              </div>

              {/* Dashboard overlay */}
              <div className="absolute left-6 top-6 w-[78%] max-w-[520px] -translate-y-8">
                <div className="relative scale-[0.75] origin-top-left">
                  <div className="gradient-border rounded-2xl bg-[#0b1020]/85 p-4 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold tracking-wide text-white/80">
                        Drone Catalyst Platform
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                        <span className="h-2 w-2 rounded-full bg-white/20" />
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/55">
                          Project
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white">
                          Quarry Inspection — EU
                        </p>
                        <p className="mt-1 text-xs text-white/55">
                          Reports • Imagery • Findings
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/55">
                          Status
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white">
                          Processing complete
                        </p>
                        <p className="mt-1 text-xs text-white/55">
                          Analytics ready in portal
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-white/80">Asset visibility</p>
                        <p className="text-xs text-white/55">Last updated 2m</p>
                      </div>
                      <div className="mt-3 grid grid-cols-6 gap-2">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <span
                            // eslint-disable-next-line react/no-array-index-key
                            key={i}
                            className="h-2 rounded bg-white/10"
                            style={{
                              background:
                                i % 7 === 0 ? "rgba(37,99,235,0.55)" : "rgba(255,255,255,0.12)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer to ensure hero media never touches next section */}
          <div className="h-10" aria-hidden />
        </div>
      </div>
    </section>
  );
}

