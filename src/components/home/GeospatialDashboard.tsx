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
      className={`rounded-2xl border border-white/12 bg-white/[0.07] shadow-[0_24px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export default function GeospatialDashboard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/14 bg-[#07111f]/75 p-3 shadow-[0_56px_140px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-2xl sm:p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
            Intelligence Platform
          </p>
          <p className="mt-1 text-sm font-semibold text-white">Westport Logistics Hub</p>
        </div>
        <div className="rounded-full border border-[#2563eb]/35 bg-[#2563eb]/15 px-3 py-1 text-[10px] font-medium text-[#93c5fd]">
          Live
        </div>
      </div>

      {/* Large primary card */}
      <GlassCard className="p-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Earthworks Progress</p>
            <p className="mt-1 text-2xl font-bold text-white">68.4%</p>
          </div>
          <p className="text-[11px] text-[#60a5fa]">+4.2% vs plan</p>
        </div>
        <svg viewBox="0 0 320 112" className="h-[112px] w-full" aria-hidden>
          <defs>
            <linearGradient id="heroProgressFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={16 + i * 20}
              x2="320"
              y2={16 + i * 20}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
          ))}
          <path
            d="M0,92 L40,84 L80,76 L120,68 L160,58 L200,48 L240,38 L280,28 L320,20 L320,112 L0,112 Z"
            fill="url(#heroProgressFill)"
          />
          <polyline
            points="0,92 40,84 80,76 120,68 160,58 200,48 240,38 280,28 320,20"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
          />
        </svg>
      </GlassCard>

      {/* Medium cards */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <GlassCard className="p-3.5">
          <p className="text-xs font-semibold text-white">Volume Analytics</p>
          <p className="mt-1 text-lg font-bold text-white">842K m³</p>
          <svg viewBox="0 0 240 72" className="mt-3 h-[72px] w-full" aria-hidden>
            {[
              { x: 16, h: 28 },
              { x: 48, h: 40 },
              { x: 80, h: 34 },
              { x: 112, h: 52 },
              { x: 144, h: 46 },
              { x: 176, h: 58 },
              { x: 208, h: 50 },
            ].map((bar) => (
              <rect
                key={bar.x}
                x={bar.x}
                y={64 - bar.h}
                width="18"
                height={bar.h}
                rx="3"
                fill="#2563eb"
                opacity="0.9"
              />
            ))}
          </svg>
        </GlassCard>

        <GlassCard className="overflow-hidden p-0">
          <div className="border-b border-white/8 px-3.5 py-2.5">
            <p className="text-xs font-semibold text-white">Site Intelligence</p>
          </div>
          <div className="relative aspect-[16/10]">
            <Image src={SITE_MAP} alt="" fill className="object-cover" sizes="280px" />
            <div className="absolute inset-0 bg-[#020617]/25" />
            <div className="absolute left-[38%] top-[42%] h-2.5 w-2.5 rounded-full border-2 border-white bg-[#2563eb]" />
            <div className="absolute left-[56%] top-[58%] h-2.5 w-2.5 rounded-full border-2 border-white bg-[#60a5fa]" />
          </div>
        </GlassCard>
      </div>

      {/* Smaller cards */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        <GlassCard className="p-3">
          <p className="text-[10px] font-medium text-white/50">Reports</p>
          <p className="mt-2 text-sm font-semibold text-white">12 active</p>
          <p className="mt-1 text-[10px] text-[#60a5fa]">3 pending review</p>
        </GlassCard>

        <GlassCard className="p-3">
          <p className="text-[10px] font-medium text-white/50">Issues</p>
          <p className="mt-2 text-sm font-semibold text-white">3 flagged</p>
          <p className="mt-1 text-[10px] text-amber-300/90">Zone B, D, F</p>
        </GlassCard>

        <GlassCard className="p-3">
          <p className="text-[10px] font-medium text-white/50">Survey Coverage</p>
          <p className="mt-2 text-sm font-semibold text-white">96.8%</p>
          <p className="mt-1 text-[10px] text-[#60a5fa]">On schedule</p>
        </GlassCard>
      </div>
    </div>
  );
}
