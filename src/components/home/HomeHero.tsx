import Image from "next/image";
import Link from "next/link";
import DashboardMockup from "./DashboardMockup";

const HERO_IMAGE = "/images/site-intelligence.jpg";

function HeroDrone() {
  return (
    <div className="relative z-30 flex flex-col items-center" aria-hidden>
      <svg
        viewBox="0 0 160 96"
        className="h-[72px] w-[120px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] sm:h-[84px] sm:w-[140px]"
        fill="none"
      >
        <ellipse cx="80" cy="34" rx="18" ry="10" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
        <ellipse cx="80" cy="34" rx="10" ry="5" fill="#0f172a" />
        <rect x="76" y="38" width="8" height="10" rx="2" fill="#334155" />
        <circle cx="80" cy="50" r="3" fill="#22d3ee" opacity="0.9">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        {[
          { x: 28, y: 28 },
          { x: 132, y: 28 },
          { x: 28, y: 52 },
          { x: 132, y: 52 },
        ].map((arm, i) => (
          <g key={i}>
            <line
              x1="80"
              y1="34"
              x2={arm.x}
              y2={arm.y}
              stroke="#64748b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx={arm.x} cy={arm.y} r="14" stroke="#475569" strokeWidth="1.5" fill="#0f172a" opacity="0.85" />
            <ellipse cx={arm.x} cy={arm.y} rx="14" ry="4" stroke="#22d3ee" strokeWidth="0.75" opacity="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${arm.x} ${arm.y}`}
                to={`360 ${arm.x} ${arm.y}`}
                dur={`${0.35 + i * 0.05}s`}
                repeatCount="indefinite"
              />
            </ellipse>
          </g>
        ))}
        <path
          d="M80 53 L68 88 L92 88 Z"
          fill="url(#scanBeam)"
          opacity="0.55"
        />
        <line x1="80" y1="53" x2="80" y2="88" stroke="#22d3ee" strokeWidth="0.75" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.4s" repeatCount="indefinite" />
        </line>
        <defs>
          <linearGradient id="scanBeam" x1="80" y1="53" x2="80" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function GeospatialScan() {
  const points = [
    [18, 72], [24, 58], [31, 68], [38, 52], [45, 64], [52, 48], [58, 60], [65, 44],
    [72, 56], [78, 42], [85, 54], [92, 38], [98, 50], [105, 36], [112, 48], [118, 34],
    [22, 82], [35, 78], [48, 84], [62, 76], [75, 82], [88, 74], [102, 80], [115, 72],
    [30, 90], [55, 92], [80, 88], [105, 90], [42, 62], [68, 58], [94, 62], [72, 70],
  ];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[28%] z-20" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050816]/20 to-[#071428]/85" />
      <svg viewBox="0 0 160 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="meshGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="35%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        {[
          "M10,92 L35,72 L60,88 L85,68 L110,82 L135,62 L150,78 L150,100 L10,100 Z",
          "M20,78 L45,58 L70,74 L95,54 L120,68 L145,48",
          "M30,88 L55,68 L80,84 L105,64 L130,78",
        ].map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="url(#meshGrad)"
            strokeWidth={i === 0 ? 0.6 : 0.4}
            opacity={0.35 + i * 0.15}
          />
        ))}
        {[
          [35, 72, 60, 88, 85, 68],
          [45, 58, 70, 74, 95, 54],
          [55, 68, 80, 84, 105, 64],
          [65, 48, 88, 62, 112, 48],
        ].map((coords, i) => (
          <polygon
            key={i}
            points={coords.join(" ")}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="0.35"
            opacity="0.25"
          />
        ))}
        {points.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="0.65" fill="#67e8f9" opacity="0.55">
            <animate
              attributeName="opacity"
              values="0.2;0.9;0.2"
              dur={`${1.8 + (i % 5) * 0.4}s`}
              begin={`${i * 0.12}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        <rect x="0" y="0" width="160" height="4" fill="#22d3ee" opacity="0.5">
          <animate attributeName="y" values="20;95;20" dur="4.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.55;0.15" dur="4.5s" repeatCount="indefinite" />
        </rect>
        <path
          d="M80 8 L55 92 L105 92 Z"
          fill="url(#meshGrad)"
          opacity="0.12"
        />
      </svg>
      <div className="absolute inset-x-[12%] bottom-[8%] h-[38%] rounded-lg border border-cyan-400/20 bg-[#071428]/40 shadow-[inset_0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-[1px]" />
    </div>
  );
}

export default function HomeHero() {
  return (
    <section className="relative overflow-x-hidden bg-[#050816]">
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

          {/* Right column — real-world capture → digital intelligence */}
          <div className="relative mx-auto w-full max-w-[560px] pb-28 sm:pb-32 lg:mx-0 lg:max-w-none lg:pb-36">
            <div className="relative aspect-[4/3] overflow-visible">
              <div className="absolute -top-10 left-1/2 z-30 -translate-x-1/2 sm:-top-12">
                <HeroDrone />
              </div>

              <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1a1208] shadow-[0_32px_80px_rgba(0,0,0,0.55)] sm:rounded-3xl">
                <Image
                  src={HERO_IMAGE}
                  alt="Aerial view of a large-scale quarry and industrial earthworks site"
                  fill
                  priority
                  className="object-cover saturate-[0.72] contrast-[1.12] brightness-[0.82]"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,80,40,0.12),transparent_65%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1208]/90 via-[#050816]/15 to-[#050816]/30" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-transparent to-transparent" />

                <GeospatialScan />

                <div className="absolute inset-x-0 bottom-0 z-[25] h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              </div>
            </div>

            {/* Floating platform preview — ~30% larger, high-contrast digital layer */}
            <div className="absolute -bottom-6 left-1/2 z-40 w-[140%] max-w-[806px] -translate-x-1/2 sm:-bottom-8 lg:-bottom-10 lg:w-[150%]">
              <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.18),transparent_70%)] blur-xl" />
              <div className="relative rounded-xl border border-cyan-400/25 bg-[#0a1628]/98 p-1.5 shadow-[0_0_0_1px_rgba(37,99,235,0.25),0_48px_96px_rgba(0,0,0,0.65),0_0_80px_rgba(34,211,238,0.15)] backdrop-blur-md sm:rounded-2xl sm:p-2">
                <div className="overflow-hidden rounded-lg sm:rounded-xl">
                  <DashboardMockup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
