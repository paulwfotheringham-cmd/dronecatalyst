import Image from "next/image";

const SITE_MAP = "/images/site-intelligence.jpg";

export default function GeospatialDashboard() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a1220]/98 shadow-[0_48px_120px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3b82f6]">
            Intelligence Platform
          </p>
          <p className="mt-0.5 text-sm font-semibold text-white">Westport Logistics Hub</p>
        </div>
        <div className="rounded-md border border-[#2563eb]/30 bg-[#2563eb]/10 px-2.5 py-1 text-[10px] font-medium text-[#93c5fd]">
          Live
        </div>
      </div>

      <div className="grid gap-3 p-3 sm:grid-cols-4">
        {[
          { label: "Cut Volume", value: "842K m³", delta: "+12.4%" },
          { label: "Fill Volume", value: "618K m³", delta: "+8.1%" },
          { label: "Net Change", value: "224K m³", delta: "+4.2%" },
          { label: "Survey Coverage", value: "96.8%", delta: "On track" },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2.5"
          >
            <p className="text-[10px] text-white/45">{metric.label}</p>
            <p className="mt-1 text-base font-semibold text-white">{metric.value}</p>
            <p className="mt-0.5 text-[10px] font-medium text-[#60a5fa]">{metric.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 px-3 pb-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] font-medium text-white/70">Earthworks Progress</p>
            <p className="text-[10px] text-white/40">Last 8 weeks</p>
          </div>
          <svg viewBox="0 0 280 88" className="h-[88px] w-full" aria-hidden>
            <defs>
              <linearGradient id="progressFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                y1={18 + i * 20}
                x2="280"
                y2={18 + i * 20}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            ))}
            <path
              d="M0,72 L35,66 L70,58 L105,52 L140,44 L175,36 L210,28 L245,22 L280,16 L280,88 L0,88 Z"
              fill="url(#progressFill)"
            />
            <polyline
              points="0,72 35,66 70,58 105,52 140,44 175,36 210,28 245,22 280,16"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
          <p className="text-[11px] font-medium text-white/70">Volume Analytics</p>
          <svg viewBox="0 0 220 88" className="mt-2 h-[88px] w-full" aria-hidden>
            {[
              { x: 18, h: 34 },
              { x: 52, h: 48 },
              { x: 86, h: 42 },
              { x: 120, h: 58 },
              { x: 154, h: 52 },
              { x: 188, h: 66 },
            ].map((bar) => (
              <rect
                key={bar.x}
                x={bar.x}
                y={72 - bar.h}
                width="22"
                height={bar.h}
                rx="3"
                fill="#2563eb"
                opacity="0.85"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="grid gap-3 px-3 pb-3 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-lg border border-white/8 bg-white/[0.03]">
          <div className="border-b border-white/8 px-3 py-2">
            <p className="text-[11px] font-medium text-white/70">Site Map</p>
          </div>
          <div className="relative aspect-[16/10]">
            <Image
              src={SITE_MAP}
              alt=""
              fill
              className="object-cover"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-[#050816]/20" />
            <div className="absolute left-[38%] top-[42%] h-3 w-3 rounded-full border-2 border-white bg-[#2563eb]" />
            <div className="absolute left-[54%] top-[58%] h-3 w-3 rounded-full border-2 border-white bg-[#2563eb]/80" />
          </div>
        </div>

        <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
          <p className="text-[11px] font-medium text-white/70">Reports</p>
          <ul className="mt-3 space-y-2.5">
            {[
              "Weekly Earthworks Summary — Jun 12",
              "Cut / Fill Analysis — Zone B",
              "Volume Reconciliation — Q2",
            ].map((report) => (
              <li
                key={report}
                className="flex items-center justify-between rounded-md border border-white/6 bg-[#050816]/40 px-2.5 py-2"
              >
                <span className="text-[11px] text-white/75">{report}</span>
                <span className="text-[10px] font-medium text-[#60a5fa]">View</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
