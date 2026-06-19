import Image from "next/image";
import type { ReactNode } from "react";

const SITE_MAP = "/images/site-intelligence.jpg";

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-white/[0.14] bg-gradient-to-br from-white/[0.1] to-white/[0.03] shadow-[0_12px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function TerrainMini() {
  return (
    <svg viewBox="0 0 200 100" className="h-[88px] w-full" aria-hidden>
      <defs>
        <linearGradient id="heatSurface" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#2563eb" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <rect width="200" height="100" fill="#0f172a" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M10,${78 - i * 5} Q100,${65 - i * 8} 190,${58 - i * 4}`}
          fill="none"
          stroke="rgba(96,165,250,0.3)"
          strokeWidth="0.75"
        />
      ))}
      <path
        d="M15,72 L60,58 L100,52 L140,58 L185,65 L185,88 L15,88 Z"
        fill="url(#heatSurface)"
        opacity="0.88"
      />
      <path d="M15,72 L60,58 L100,52 L140,58 L185,65" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
    </svg>
  );
}

export default function GeospatialDashboard() {
  return (
    <div className="w-full max-w-[680px] overflow-hidden rounded-2xl border border-white/22 bg-[#060d18]/90 p-3 shadow-[0_40px_100px_rgba(0,0,0,0.8),0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-3xl sm:max-w-[720px] sm:p-4">
      {/* Header row */}
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="hidden gap-1 sm:flex">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-[#60a5fa]">
              Intelligence Platform
            </p>
            <p className="truncate text-[12px] font-semibold text-white">Westport Logistics Hub</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden gap-1 rounded-md border border-white/8 bg-white/[0.04] p-0.5 sm:flex">
            {["Overview", "Analytics", "Terrain"].map((tab, i) => (
              <span
                key={tab}
                className={`rounded px-2 py-0.5 text-[8px] font-medium ${
                  i === 0 ? "bg-[#2563eb]/25 text-white" : "text-white/40"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="rounded-full border border-[#2563eb]/35 bg-[#2563eb]/15 px-2 py-0.5 text-[8px] font-medium text-[#93c5fd]">
            Live
          </span>
        </div>
      </div>

      {/* Main horizontal panels */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <GlassCard className="p-2">
          <p className="text-[8px] font-medium text-white/55">3D Terrain</p>
          <TerrainMini />
        </GlassCard>

        <GlassCard className="p-2">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[8px] font-medium text-white/55">Progress</p>
              <p className="text-lg font-bold text-white">68.4%</p>
            </div>
            <span className="text-[8px] text-emerald-300">+4.2%</span>
          </div>
          <svg viewBox="0 0 160 56" className="mt-1 h-14 w-full" aria-hidden>
            <defs>
              <linearGradient id="progFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,48 L30,42 L60,36 L90,28 L120,20 L150,14 L160,12 L160,56 L0,56 Z"
              fill="url(#progFill)"
            />
            <polyline
              points="0,48 30,42 60,36 90,28 120,20 150,14 160,12"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </GlassCard>

        <GlassCard className="p-2">
          <p className="text-[8px] font-medium text-white/55">Volume</p>
          <p className="text-lg font-bold text-white">842K</p>
          <svg viewBox="0 0 160 56" className="mt-1 h-14 w-full" aria-hidden>
            {[
              { x: 8, h: 22 },
              { x: 30, h: 32 },
              { x: 52, h: 26 },
              { x: 74, h: 40 },
              { x: 96, h: 34 },
              { x: 118, h: 44 },
              { x: 140, h: 36 },
            ].map((bar) => (
              <rect
                key={bar.x}
                x={bar.x}
                y={52 - bar.h}
                width="14"
                height={bar.h}
                rx="2"
                fill="#2563eb"
                opacity="0.9"
              />
            ))}
          </svg>
        </GlassCard>

        <GlassCard className="relative overflow-hidden p-0">
          <div className="relative h-[108px]">
            <Image src={SITE_MAP} alt="" fill className="object-cover" sizes="180px" />
            <div className="absolute inset-0 bg-[#020617]/25" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.12)_1px,transparent_1px)] bg-[size:10px_10px]" />
            <div className="absolute left-[38%] top-[42%] h-2 w-2 rounded-full border border-white bg-[#2563eb]" />
            <div className="absolute left-[58%] top-[55%] h-2 w-2 rounded-full border border-white bg-[#60a5fa]" />
            <div className="absolute left-1.5 top-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[7px] text-white/80">
              Site map
            </div>
          </div>
        </GlassCard>
      </div>

      {/* KPI strip ? horizontal */}
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {[
          { label: "Reports", value: "12", sub: "3 pending" },
          { label: "Issues", value: "3", sub: "Zone B,D,F", warn: true },
          { label: "Coverage", value: "96.8%", sub: "On schedule" },
          { label: "Cut/Fill", value: "+18K", sub: "On tolerance" },
        ].map((kpi) => (
          <GlassCard key={kpi.label} className="px-2 py-1.5">
            <p className="text-[7px] uppercase tracking-wide text-white/40">{kpi.label}</p>
            <p className={`text-[11px] font-semibold ${kpi.warn ? "text-amber-300" : "text-white"}`}>
              {kpi.value}
            </p>
            <p className="text-[7px] text-[#60a5fa]">{kpi.sub}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
