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
      className={`rounded-2xl border border-white/[0.14] bg-gradient-to-br from-white/[0.1] to-white/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.45),0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function TerrainHeatmap() {
  return (
    <div className="relative h-full min-h-[148px] overflow-hidden rounded-xl bg-[#020617]/40">
      <svg viewBox="0 0 280 148" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="heatLow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        {/* 3D terrain wireframe */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={`row-${i}`}
            d={`M20,${120 - i * 8} Q80,${100 - i * 12} 140,${90 - i * 10} T260,${75 - i * 8}`}
            fill="none"
            stroke="rgba(96,165,250,0.35)"
            strokeWidth="1"
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`col-${i}`}
            x1={40 + i * 55}
            y1="148"
            x2={60 + i * 50}
            y2="55"
            stroke="rgba(37,99,235,0.3)"
            strokeWidth="1"
          />
        ))}
        {/* Heatmap elevation zones */}
        <ellipse cx="110" cy="95" rx="48" ry="22" fill="#2563eb" opacity="0.35" />
        <ellipse cx="175" cy="82" rx="38" ry="18" fill="#3b82f6" opacity="0.45" />
        <ellipse cx="210" cy="105" rx="32" ry="14" fill="#38bdf8" opacity="0.5" />
        <path
          d="M60,110 L100,85 L145,95 L190,72 L240,88 L260,100 L260,148 L60,148 Z"
          fill="url(#heatLow)"
          opacity="0.55"
        />
      </svg>
      <div className="absolute bottom-2 left-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
        <span className="text-[9px] font-medium text-white/60">Elevation model</span>
      </div>
      <div className="absolute bottom-2 right-3 flex gap-1">
        {["#1e3a8a", "#2563eb", "#3b82f6", "#38bdf8"].map((c) => (
          <span key={c} className="h-3 w-3 rounded-sm" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

export default function GeospatialDashboard() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/20 bg-[#07111f]/75 p-4 shadow-[0_80px_180px_rgba(0,0,0,0.88),0_32px_64px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl sm:p-5">
      <div className="mb-4 flex items-center justify-between px-0.5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
            Intelligence Platform
          </p>
          <p className="mt-1 text-[15px] font-semibold text-white">Westport Logistics Hub</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 sm:inline-block" />
          <div className="rounded-full border border-[#2563eb]/35 bg-[#2563eb]/15 px-3 py-1 text-[10px] font-medium text-[#93c5fd]">
            Live
          </div>
        </div>
      </div>

      {/* Primary row — progress + terrain heatmap */}
      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <GlassCard className="p-5">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Earthworks Progress</p>
              <p className="mt-1.5 text-[2rem] font-bold leading-none text-white">68.4%</p>
            </div>
            <p className="rounded-lg bg-[#2563eb]/15 px-2.5 py-1 text-[11px] font-medium text-[#60a5fa]">
              +4.2% vs plan
            </p>
          </div>
          <svg viewBox="0 0 360 140" className="h-[140px] w-full" aria-hidden>
            <defs>
              <linearGradient id="heroProgressFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1="0"
                y1={18 + i * 22}
                x2="360"
                y2={18 + i * 22}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
              />
            ))}
            <path
              d="M0,118 L45,106 L90,94 L135,82 L180,68 L225,54 L270,40 L315,26 L360,14 L360,140 L0,140 Z"
              fill="url(#heroProgressFill)"
            />
            <polyline
              points="0,118 45,106 90,94 135,82 180,68 225,54 270,40 315,26 360,14"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="360" cy="14" r="5" fill="#60a5fa" />
          </svg>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">3D Terrain Model</p>
            <p className="text-[10px] text-[#60a5fa]">LiDAR capture</p>
          </div>
          <TerrainHeatmap />
        </GlassCard>
      </div>

      {/* Secondary row */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <GlassCard className="p-4">
          <p className="text-xs font-semibold text-white">Volume Analytics</p>
          <p className="mt-1.5 text-xl font-bold text-white">842K m³</p>
          <svg viewBox="0 0 280 96" className="mt-4 h-[96px] w-full" aria-hidden>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line
                key={i}
                x1="0"
                y1={12 + i * 14}
                x2="280"
                y2={12 + i * 14}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            ))}
            {[
              { x: 18, h: 36 },
              { x: 54, h: 52 },
              { x: 90, h: 44 },
              { x: 126, h: 68 },
              { x: 162, h: 58 },
              { x: 198, h: 76 },
              { x: 234, h: 64 },
            ].map((bar) => (
              <rect
                key={bar.x}
                x={bar.x}
                y={88 - bar.h}
                width="22"
                height={bar.h}
                rx="4"
                fill="#2563eb"
                opacity="0.92"
              />
            ))}
          </svg>
        </GlassCard>

        <GlassCard className="overflow-hidden p-0">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-xs font-semibold text-white">Site Intelligence</p>
          </div>
          <div className="relative aspect-[16/11]">
            <Image src={SITE_MAP} alt="" fill className="object-cover" sizes="320px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-[#020617]/10 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute left-[38%] top-[42%] h-3 w-3 rounded-full border-2 border-white bg-[#2563eb] shadow-[0_0_12px_rgba(37,99,235,0.8)]" />
            <div className="absolute left-[56%] top-[58%] h-3 w-3 rounded-full border-2 border-white bg-[#60a5fa] shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
          </div>
        </GlassCard>
      </div>

      {/* Metrics row */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <GlassCard className="p-3.5">
          <p className="text-[10px] font-medium text-white/50">Reports</p>
          <p className="mt-2 text-[15px] font-semibold text-white">12 active</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[75%] rounded-full bg-[#2563eb]" />
          </div>
          <p className="mt-1.5 text-[10px] text-[#60a5fa]">3 pending review</p>
        </GlassCard>

        <GlassCard className="p-3.5">
          <p className="text-[10px] font-medium text-white/50">Issues</p>
          <p className="mt-2 text-[15px] font-semibold text-white">3 flagged</p>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3].map((n) => (
              <span key={n} className="h-1.5 flex-1 rounded-full bg-amber-400/70" />
            ))}
          </div>
          <p className="mt-1.5 text-[10px] text-amber-300/90">Zone B, D, F</p>
        </GlassCard>

        <GlassCard className="p-3.5">
          <p className="text-[10px] font-medium text-white/50">Survey Coverage</p>
          <p className="mt-2 text-[15px] font-semibold text-white">96.8%</p>
          <svg viewBox="0 0 80 24" className="mt-2 h-6 w-full" aria-hidden>
            <polyline
              points="0,18 12,14 24,16 36,10 48,12 60,6 72,8 80,4"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="mt-1 text-[10px] text-[#60a5fa]">On schedule</p>
        </GlassCard>
      </div>
    </div>
  );
}
