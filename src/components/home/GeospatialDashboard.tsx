import Image from "next/image";

const ORTHO_MAP = "/images/site-intelligence.jpg";

function Terrain3D() {
  return (
    <svg viewBox="0 0 120 72" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="faceTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="faceLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="faceRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#172554" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <polygon points="18,52 60,28 102,52 60,66" fill="url(#faceTop)" stroke="#93c5fd" strokeWidth="0.6" />
      <polygon points="18,52 60,66 60,58 18,44" fill="url(#faceLeft)" stroke="#60a5fa" strokeWidth="0.4" opacity="0.9" />
      <polygon points="102,52 60,66 60,58 102,44" fill="url(#faceRight)" stroke="#3b82f6" strokeWidth="0.4" opacity="0.85" />
      <polyline
        points="28,48 44,40 60,34 76,38 92,46"
        fill="none"
        stroke="#e0f2fe"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {[28, 44, 60, 76, 92].map((x, i) => (
        <circle key={x} cx={x} cy={48 - i * 2} r="1.2" fill="#fff" opacity="0.85" />
      ))}
    </svg>
  );
}

export default function GeospatialDashboard() {
  return (
    <div className="hero-mockup-3d w-[220px] overflow-hidden rounded-xl border border-white/15 bg-[#040a14]/75 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl sm:w-[240px]">
      <div className="mb-1.5 flex items-center justify-between gap-2 border-b border-white/10 pb-1.5">
        <div className="min-w-0">
          <p className="truncate text-[7px] font-semibold uppercase tracking-[0.14em] text-sky-300/80">
            Site Intelligence
          </p>
          <p className="truncate text-[9px] font-semibold text-white">Westport Hub</p>
        </div>
        <span className="shrink-0 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-1.5 py-0.5 text-[6px] font-semibold uppercase tracking-wider text-emerald-200">
          RTK Fixed
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-black/30">
          <Image src={ORTHO_MAP} alt="" fill className="object-cover" sizes="120px" />
          <div className="absolute inset-0 bg-[#020617]/15" />
          <div className="absolute left-1 top-1 rounded bg-black/55 px-1 py-0.5 text-[6px] text-white/80">
            Ortho · 2.1 cm/px
          </div>
        </div>

        <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#020617] p-1">
          <Terrain3D />
        </div>
      </div>

      <div className="mt-1.5 grid grid-cols-3 gap-1 text-center">
        {[
          { label: "Survey", value: "74%" },
          { label: "DTM", value: "2.4 cm" },
          { label: "Area", value: "248 ha" },
        ].map((item) => (
          <div key={item.label} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-1 py-1">
            <p className="text-[6px] uppercase tracking-wide text-white/40">{item.label}</p>
            <p className="text-[8px] font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
