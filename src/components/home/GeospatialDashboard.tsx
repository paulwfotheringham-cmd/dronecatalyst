import Image from "next/image";
import type { ReactNode } from "react";

const ORTHO_MAP = "/images/site-intelligence.jpg";

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/[0.1] bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/45 sm:text-[9px]">
      {children}
    </p>
  );
}

function StatusPill({
  tone = "ok",
  children,
}: {
  tone?: "ok" | "live" | "warn";
  children: ReactNode;
}) {
  const tones = {
    ok: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    live: "border-sky-400/30 bg-sky-500/10 text-sky-200",
    warn: "border-amber-400/30 bg-amber-500/10 text-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.12em] sm:text-[8px] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function DtmPreview() {
  return (
    <svg viewBox="0 0 200 120" className="h-[88px] w-full sm:h-[96px]" aria-hidden>
      <defs>
        <linearGradient id="dtmBase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="dtmSurface" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#2563eb" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#dtmBase)" rx="4" />
      {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="rgba(148,163,184,0.08)" strokeWidth="0.5" />
      ))}
      {[24, 48, 72, 96].map((y) => (
        <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(148,163,184,0.08)" strokeWidth="0.5" />
      ))}
      <path
        d="M8,92 L42,78 L78,68 L112,58 L148,62 L192,74 L192,112 L8,112 Z"
        fill="url(#dtmSurface)"
      />
      <path
        d="M8,92 L42,78 L78,68 L112,58 L148,62 L192,74"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1.25"
      />
      <text x="10" y="14" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="system-ui">
        142.8 m ASL
      </text>
      <text x="152" y="14" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="system-ui">
        156.2 m
      </text>
    </svg>
  );
}

function CutFillHeatmap() {
  const cells = [
    ["cut", "cut", "neutral", "fill", "fill"],
    ["cut", "cut", "cut", "neutral", "fill"],
    ["neutral", "cut", "neutral", "fill", "fill"],
    ["fill", "neutral", "neutral", "cut", "cut"],
  ];
  const colors = {
    cut: "#ef4444",
    fill: "#22c55e",
    neutral: "#334155",
  };

  return (
    <div className="mt-1.5">
      <div className="grid grid-cols-5 gap-0.5">
        {cells.flat().map((type, i) => (
          <div
            key={i}
            className="aspect-square rounded-[3px]"
            style={{ backgroundColor: colors[type as keyof typeof colors], opacity: type === "neutral" ? 0.55 : 0.82 }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[7px] text-white/45">
        <span>Cut 14,280 m³</span>
        <span>Fill 9,650 m³</span>
      </div>
    </div>
  );
}

function ElevationProfile() {
  return (
    <svg viewBox="0 0 240 56" className="mt-1.5 h-12 w-full sm:h-14" aria-hidden>
      <defs>
        <linearGradient id="elevFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="44" x2="240" y2="44" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
      <path
        d="M0,44 L0,38 L24,34 L48,30 L72,26 L96,24 L120,22 L144,24 L168,28 L192,32 L216,36 L240,38 L240,44 Z"
        fill="url(#elevFill)"
      />
      <polyline
        points="0,38 24,34 48,30 72,26 96,24 120,22 144,24 168,28 192,32 216,36 240,38"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line x1="120" y1="8" x2="120" y2="48" stroke="rgba(251,191,36,0.55)" strokeDasharray="2 2" strokeWidth="0.75" />
      <text x="124" y="14" fill="rgba(251,191,36,0.85)" fontSize="6.5" fontFamily="system-ui">
        Section A-A&apos;
      </text>
    </svg>
  );
}

function ProjectTimeline() {
  const phases = [
    { label: "Baseline", done: true },
    { label: "Capture", done: true },
    { label: "Process", done: true, active: true },
    { label: "QA", done: false },
    { label: "Issue", done: false },
  ];

  return (
    <div className="mt-2 flex items-center gap-1">
      {phases.map((phase, index) => (
        <div key={phase.label} className="flex min-w-0 flex-1 items-center gap-1">
          <div className="min-w-0 flex-1">
            <div
              className={`h-1 rounded-full ${
                phase.done ? "bg-[#2563eb]" : phase.active ? "bg-[#2563eb]/60" : "bg-white/10"
              }`}
            />
            <p
              className={`mt-1 truncate text-[7px] sm:text-[8px] ${
                phase.active ? "font-semibold text-white" : "text-white/40"
              }`}
            >
              {phase.label}
            </p>
          </div>
          {index < phases.length - 1 ? <span className="h-px w-1 shrink-0 bg-white/10" /> : null}
        </div>
      ))}
    </div>
  );
}

const RECENT_MISSIONS = [
  { id: "WM-2026-047", type: "Orthomosaic", date: "17 Jun", status: "Processing" },
  { id: "WM-2026-046", type: "DSM / DTM", date: "16 Jun", status: "Complete" },
  { id: "WM-2026-044", type: "GCP Survey", date: "14 Jun", status: "Complete" },
];

const STOCKPILES = [
  { id: "SP-01", name: "Crushed aggregate", volume: "12,480 m³", change: "+320 m³" },
  { id: "SP-02", name: "Overburden", volume: "8,240 m³", change: "-145 m³" },
  { id: "SP-03", name: "Subgrade fill", volume: "4,150 m³", change: "+88 m³" },
];

export default function GeospatialDashboard() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-[#030912]/80 p-3 shadow-[0_48px_120px_rgba(0,0,0,0.55),0_20px_48px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-3xl sm:p-4">
      {/* Platform header */}
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2 border-b border-white/[0.08] pb-3">
        <div className="min-w-0">
          <PanelLabel>Site Intelligence · Earthworks</PanelLabel>
          <p className="mt-0.5 truncate text-[13px] font-semibold text-white sm:text-sm">
            Westport Logistics Hub — Phase 2
          </p>
          <p className="mt-0.5 text-[9px] text-white/45">EPSG:2157 · 335 ha · Updated 17 Jun 2026</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <StatusPill tone="ok">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            RTK Fixed
          </StatusPill>
          <StatusPill tone="live">
            <span className="h-1 w-1 animate-pulse rounded-full bg-sky-400" />
            Live ortho
          </StatusPill>
        </div>
      </div>

      {/* Nav tabs — FlightHub / Propeller style */}
      <div className="mb-3 flex flex-wrap gap-1 rounded-lg border border-white/[0.06] bg-black/20 p-0.5">
        {["Orthomosaic", "DTM", "Volumes", "Cut/Fill", "Reports"].map((tab, i) => (
          <span
            key={tab}
            className={`rounded-md px-2 py-1 text-[8px] font-medium sm:text-[9px] ${
              i === 0 ? "bg-white/[0.1] text-white" : "text-white/40"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Primary workspace */}
      <div className="grid gap-2 lg:grid-cols-12">
        {/* Live orthomosaic */}
        <Panel className="relative overflow-hidden p-0 lg:col-span-7">
          <div className="relative aspect-[16/10] min-h-[140px] sm:min-h-[168px]">
            <Image src={ORTHO_MAP} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 420px" />
            <div className="absolute inset-0 bg-[#020617]/20" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.14)_1px,transparent_1px)] bg-[size:12px_12px]" />
            <svg className="absolute inset-0 h-full w-full" aria-hidden>
              <path
                d="M28,78 L92,52 L148,68 L178,44"
                fill="none"
                stroke="#fbbf24"
                strokeDasharray="4 3"
                strokeWidth="1"
              />
              <polygon
                points="28,78 92,52 148,68 118,92 48,96"
                fill="rgba(37,99,235,0.12)"
                stroke="#60a5fa"
                strokeWidth="0.75"
              />
            </svg>
            <div className="absolute left-2 top-2 rounded-md border border-white/10 bg-black/55 px-2 py-1 backdrop-blur-sm">
              <p className="text-[8px] font-semibold text-white">Live orthomosaic</p>
              <p className="text-[7px] text-white/55">GSD 2.1 cm/px · 248.6 ha captured</p>
            </div>
            <div className="absolute bottom-2 right-2 flex gap-1">
              {["+","−","⟲"].map((btn) => (
                <span
                  key={btn}
                  className="flex h-5 w-5 items-center justify-center rounded border border-white/15 bg-black/45 text-[9px] text-white/70"
                >
                  {btn}
                </span>
              ))}
            </div>
          </div>
        </Panel>

        {/* Right stack */}
        <div className="grid gap-2 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          <Panel className="p-2.5">
            <PanelLabel>Digital terrain model</PanelLabel>
            <DtmPreview />
            <p className="mt-1 text-[8px] text-white/50">RMSE 2.4 cm · 14,280 points/m²</p>
          </Panel>

          <Panel className="p-2.5">
            <PanelLabel>Cut / fill heat map</PanelLabel>
            <CutFillHeatmap />
            <p className="mt-1 text-[8px] text-amber-200/80">Net variance −4,630 m³ · within tolerance</p>
          </Panel>
        </div>
      </div>

      {/* Survey metrics row */}
      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Panel className="p-2.5">
          <PanelLabel>Survey progress</PanelLabel>
          <div className="mt-1 flex items-end justify-between gap-2">
            <p className="text-lg font-bold text-white sm:text-xl">74.2%</p>
            <p className="text-[8px] text-emerald-300">248.6 / 335 ha</p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[74.2%] rounded-full bg-gradient-to-r from-[#1d4ed8] to-[#60a5fa]" />
          </div>
          <p className="mt-1.5 text-[8px] text-white/45">Flight 12 of 16 · Block C–F remaining</p>
        </Panel>

        <Panel className="p-2.5">
          <PanelLabel>RTK status</PanelLabel>
          <p className="mt-1 text-sm font-semibold text-emerald-200 sm:text-base">Fixed solution</p>
          <div className="mt-1.5 space-y-0.5 text-[8px] text-white/55">
            <p>14 satellites · HDOP 0.9</p>
            <p>Horizontal 8 mm + 1 ppm</p>
            <p>Vertical 12 mm + 1 ppm</p>
          </div>
        </Panel>

        <Panel className="p-2.5 sm:col-span-2 lg:col-span-1">
          <PanelLabel>Elevation profile</PanelLabel>
          <ElevationProfile />
          <p className="mt-0.5 text-[8px] text-white/45">Design vs as-built · Chainage 0+240 m</p>
        </Panel>

        <Panel className="p-2.5 sm:col-span-2 lg:col-span-1">
          <PanelLabel>Project timeline</PanelLabel>
          <ProjectTimeline />
        </Panel>
      </div>

      {/* Stockpiles + recent missions */}
      <div className="mt-2 grid gap-2 lg:grid-cols-12">
        <Panel className="p-2.5 lg:col-span-7">
          <PanelLabel>Stockpile volumes</PanelLabel>
          <div className="mt-2 space-y-1.5">
            {STOCKPILES.map((pile) => (
              <div
                key={pile.id}
                className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-black/20 px-2 py-1.5"
              >
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold text-white">
                    {pile.id} · {pile.name}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[9px] font-semibold text-white">{pile.volume}</p>
                  <p className="text-[8px] text-sky-300">{pile.change}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-2.5 lg:col-span-5">
          <PanelLabel>Recent survey missions</PanelLabel>
          <div className="mt-2 space-y-1.5">
            {RECENT_MISSIONS.map((mission) => (
              <div
                key={mission.id}
                className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-black/20 px-2 py-1.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-semibold text-white">{mission.id}</p>
                  <p className="text-[8px] text-white/45">
                    {mission.type} · {mission.date}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.08em] ${
                    mission.status === "Complete"
                      ? "bg-emerald-500/15 text-emerald-200"
                      : "bg-sky-500/15 text-sky-200"
                  }`}
                >
                  {mission.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
