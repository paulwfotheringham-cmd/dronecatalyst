import Image from "next/image";

const SITE_MAP = "/images/site-intelligence.jpg";

export default function GeospatialDashboard() {
  return (
    <div className="w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/20 bg-[#070f1c]/90 shadow-[0_32px_80px_rgba(0,0,0,0.75),0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:max-w-[360px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
            Intelligence Platform
          </p>
          <p className="text-[13px] font-semibold text-white">Westport Logistics Hub</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/15 px-2.5 py-0.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[9px] font-medium text-[#93c5fd]">Live</span>
        </div>
      </div>

      <div className="p-3">
        {/* Terrain + map row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#020617]/50">
            <div className="border-b border-white/8 px-2 py-1.5">
              <p className="text-[9px] font-medium text-white/70">3D Terrain</p>
            </div>
            <svg viewBox="0 0 160 88" className="h-[88px] w-full" aria-hidden>
              <defs>
                <linearGradient id="miniHeat" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <rect width="160" height="88" fill="#0f172a" />
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  d={`M10,${72 - i * 5} Q80,${60 - i * 8} 150,${55 - i * 5}`}
                  fill="none"
                  stroke="rgba(96,165,250,0.3)"
                  strokeWidth="0.75"
                />
              ))}
              <path
                d="M15,65 L55,52 L95,48 L135,55 L145,62 L145,80 L15,80 Z"
                fill="url(#miniHeat)"
                opacity="0.85"
              />
              <path d="M15,65 L55,52 L95,48 L135,55 L145,62" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="relative h-[88px] overflow-hidden rounded-lg border border-white/10">
            <Image src={SITE_MAP} alt="" fill className="object-cover" sizes="180px" />
            <div className="absolute inset-0 bg-[#020617]/30" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.15)_1px,transparent_1px)] bg-[size:12px_12px]" />
            <div className="absolute left-[40%] top-[45%] h-2 w-2 rounded-full border border-white bg-[#2563eb]" />
            <div className="absolute left-[62%] top-[58%] h-2 w-2 rounded-full border border-white bg-[#60a5fa]" />
            <div className="absolute left-2 top-2 rounded bg-black/50 px-1.5 py-0.5 text-[8px] text-white/80">
              Site map
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-2 rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-white/55">Earthworks Progress</p>
              <p className="text-xl font-bold text-white">68.4%</p>
            </div>
            <span className="text-[9px] font-medium text-[#60a5fa]">+4.2%</span>
          </div>
          <svg viewBox="0 0 300 48" className="mt-2 h-12 w-full" aria-hidden>
            <defs>
              <linearGradient id="progFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,40 L50,32 L100,26 L150,18 L200,12 L250,8 L300,4 L300,48 L0,48 Z"
              fill="url(#progFill)"
            />
            <polyline
              points="0,40 50,32 100,26 150,18 200,12 250,8 300,4"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* KPIs */}
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            { label: "Volume", value: "842K m³" },
            { label: "Coverage", value: "96.8%" },
            { label: "Reports", value: "12" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg border border-white/8 bg-white/[0.03] px-2 py-2"
            >
              <p className="text-[8px] uppercase tracking-wide text-white/40">{kpi.label}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-white">{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
