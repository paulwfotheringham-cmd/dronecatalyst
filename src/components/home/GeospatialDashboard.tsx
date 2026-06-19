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
      className={`rounded-xl border border-white/[0.16] bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.02] shadow-[0_24px_60px_rgba(0,0,0,0.55),0_12px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(0,0,0,0.2)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function TerrainModel3D() {
  return (
    <div className="relative min-h-[168px] overflow-hidden rounded-xl border border-[#2563eb]/20 bg-[#020617]/60">
      <svg viewBox="0 0 640 200" className="h-[168px] w-full" aria-hidden>
        <defs>
          <linearGradient id="terrainBase" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="heatSurface" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#2563eb" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <rect width="640" height="200" fill="url(#terrainBase)" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path
            key={`trow-${i}`}
            d={`M40,${170 - i * 6} Q200,${140 - i * 14} 360,${120 - i * 12} T620,${100 - i * 8}`}
            fill="none"
            stroke="rgba(96,165,250,0.25)"
            strokeWidth="1"
          />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={`tcol-${i}`}
            x1={80 + i * 85}
            y1="200"
            x2={120 + i * 75}
            y2="70"
            stroke="rgba(37,99,235,0.22)"
            strokeWidth="1"
          />
        ))}
        <path
          d="M60,145 L160,110 L280,95 L400,78 L520,92 L600,108 L600,175 L60,175 Z"
          fill="url(#heatSurface)"
          opacity="0.88"
        />
        <path
          d="M60,145 L160,110 L280,95 L400,78 L520,92 L600,108"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="2"
          opacity="0.7"
        />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={`contour-${i}`}
            d={`M${100 + i * 20},${130 - i * 8} Q280,${105 - i * 10} 460,${115 - i * 6} T580,${100 - i * 5}`}
            fill="none"
            stroke="rgba(224,242,254,0.35)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        ))}
        <circle cx="280" cy="95" r="5" fill="#e0f2fe" opacity="0.95" />
        <circle cx="400" cy="78" r="4" fill="#38bdf8" />
        <circle cx="520" cy="92" r="4" fill="#60a5fa" />
      </svg>
      <div className="absolute left-3 top-2.5 flex items-center gap-2 rounded-md border border-white/10 bg-black/40 px-2 py-1 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
        <span className="text-[9px] font-medium tracking-wide text-white/80">LiDAR point cloud</span>
      </div>
      <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
        <div className="flex h-2 w-20 overflow-hidden rounded-sm">
          {["#1e3a8a", "#2563eb", "#3b82f6", "#60a5fa", "#38bdf8"].map((c) => (
            <span key={c} className="h-full flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="font-mono text-[8px] text-[#60a5fa]">142m - 318m</span>
      </div>
      <div className="absolute bottom-2.5 right-3 rounded-md border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[8px] text-white/60 backdrop-blur-sm">
        842K pts / 2.4cm GSD
      </div>
    </div>
  );
}

function SiteMapPanel() {
  return (
    <div className="relative min-h-[140px] overflow-hidden rounded-xl border border-white/10">
      <Image src={SITE_MAP} alt="" fill className="object-cover" sizes="430px" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-[#020617]/20 to-[#020617]/30" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.12)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden>
        <polygon
          points="60,100 140,60 260,70 340,90 300,130 120,140"
          fill="rgba(37,99,235,0.15)"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <line x1="140" y1="60" x2="140" y2="140" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1" />
        <line x1="260" y1="70" x2="260" y2="130" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1" />
      </svg>
      <div className="absolute left-[34%] top-[38%] h-3 w-3 rounded-full border-2 border-white bg-[#2563eb] shadow-[0_0_16px_rgba(37,99,235,0.9)]" />
      <div className="absolute left-[52%] top-[52%] h-3 w-3 rounded-full border-2 border-white bg-[#60a5fa] shadow-[0_0_16px_rgba(96,165,250,0.9)]" />
      <div className="absolute left-[68%] top-[44%] h-3 w-3 rounded-full border-2 border-white bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
      <div className="absolute left-3 top-3 rounded-md border border-white/10 bg-black/50 px-2 py-1 backdrop-blur-sm">
        <p className="text-[10px] font-semibold text-white">Site Intelligence</p>
        <p className="text-[9px] text-[#60a5fa]">Orthomosaic / 3 zones</p>
      </div>
      <div className="absolute bottom-2 left-3 font-mono text-[8px] text-white/50">1:2,500</div>
    </div>
  );
}

export default function GeospatialDashboard() {
  return (
    <div className="w-full max-w-[400px] overflow-hidden rounded-[20px] border border-white/25 bg-[#060d18]/88 p-4 shadow-[0_48px_120px_rgba(0,0,0,0.85),0_20px_48px_rgba(0,0,0,0.55),0_0_60px_rgba(37,99,235,0.1),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-3xl sm:max-w-[430px] sm:p-5">
      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
              Intelligence Platform
            </p>
            <p className="text-[13px] font-semibold text-white">Westport Logistics Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <div className="rounded-full border border-[#2563eb]/40 bg-[#2563eb]/20 px-2.5 py-0.5 text-[9px] font-semibold text-[#93c5fd]">
            Live
          </div>
        </div>
      </div>

      <div className="mb-3 flex gap-1 rounded-lg border border-white/8 bg-white/[0.04] p-1">
        {["Overview", "Analytics", "Terrain", "Reports"].map((tab, i) => (
          <span
            key={tab}
            className={`rounded-md px-2.5 py-1 text-[9px] font-medium ${
              i === 0
                ? "bg-[#2563eb]/25 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                : "text-white/45"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <GlassCard className="mb-3 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-white">3D Terrain Model</p>
            <p className="text-[9px] text-white/50">Today LiDAR survey</p>
          </div>
          <span className="rounded-md border border-[#2563eb]/30 bg-[#2563eb]/10 px-2 py-0.5 font-mono text-[8px] text-[#60a5fa]">
            DEM v2.4
          </span>
        </div>
        <TerrainModel3D />
      </GlassCard>

      <div className="mb-3 grid gap-2.5 sm:grid-cols-2">
        <GlassCard className="p-3">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold text-white">Earthworks Progress</p>
              <p className="mt-1 text-xl font-bold leading-none text-white">68.4%</p>
            </div>
            <p className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-300">
              +4.2%
            </p>
          </div>
          <svg viewBox="0 0 400 160" className="h-[100px] w-full" aria-hidden>
            <defs>
              <linearGradient id="heroProgressFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1="0"
                y1={16 + i * 22}
                x2="400"
                y2={16 + i * 22}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            ))}
            <path
              d="M0,136 L50,122 L100,108 L150,92 L200,74 L250,58 L300,42 L350,28 L400,14 L400,160 L0,160 Z"
              fill="url(#heroProgressFill)"
            />
            <polyline
              points="0,136 50,122 100,108 150,92 200,74 250,58 300,42 350,28 400,14"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="400" cy="14" r="5" fill="#60a5fa" stroke="#e0f2fe" strokeWidth="2" />
          </svg>
        </GlassCard>

        <GlassCard className="p-3">
          <p className="text-[10px] font-semibold text-white">Volume Analytics</p>
          <p className="mt-1 text-xl font-bold text-white">842K m3</p>
          <p className="mt-0.5 font-mono text-[8px] text-white/40">Cut 412K / Fill 430K</p>
          <svg viewBox="0 0 300 110" className="mt-2 h-[80px] w-full" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="0"
                y1={14 + i * 22}
                x2="300"
                y2={14 + i * 22}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            ))}
            {[
              { x: 20, h: 42, fill: "#1e40af" },
              { x: 58, h: 62, fill: "#2563eb" },
              { x: 96, h: 50, fill: "#3b82f6" },
              { x: 134, h: 78, fill: "#2563eb" },
              { x: 172, h: 68, fill: "#3b82f6" },
              { x: 210, h: 88, fill: "#60a5fa" },
              { x: 248, h: 72, fill: "#3b82f6" },
            ].map((bar) => (
              <rect
                key={bar.x}
                x={bar.x}
                y={102 - bar.h}
                width="24"
                height={bar.h}
                rx="3"
                fill={bar.fill}
              />
            ))}
          </svg>
        </GlassCard>
      </div>

      <GlassCard className="mb-3 overflow-hidden p-0">
        <SiteMapPanel />
      </GlassCard>

      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Reports", value: "12 active", sub: "3 pending", bar: 75 },
          { label: "Issues", value: "3 flagged", sub: "Zone B, D, F", warn: true },
          { label: "Coverage", value: "96.8%", sub: "On schedule", spark: true },
          { label: "Cut / Fill", value: "+18K m3", sub: "On tolerance", bar: 60 },
        ].map((kpi) => (
          <GlassCard key={kpi.label} className="p-2.5">
            <p className="text-[8px] font-medium uppercase tracking-wider text-white/45">{kpi.label}</p>
            <p className="mt-1 text-[13px] font-semibold text-white">{kpi.value}</p>
            {kpi.bar !== undefined && (
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${kpi.warn ? "bg-amber-400" : "bg-[#2563eb]"}`}
                  style={{ width: `${kpi.bar}%` }}
                />
              </div>
            )}
            {kpi.spark && (
              <svg viewBox="0 0 80 20" className="mt-1.5 h-4 w-full" aria-hidden>
                <polyline
                  points="0,16 10,12 20,14 30,8 40,10 50,5 60,7 70,3 80,6"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {kpi.warn && (
              <div className="mt-1.5 flex gap-1">
                {[1, 2, 3].map((n) => (
                  <span key={n} className="h-1 flex-1 rounded-full bg-amber-400/80" />
                ))}
              </div>
            )}
            <p className={`mt-1 text-[8px] ${kpi.warn ? "text-amber-300/90" : "text-[#60a5fa]"}`}>
              {kpi.sub}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
