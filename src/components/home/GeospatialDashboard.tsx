"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import SectionHoverInfo from "./SectionHoverInfo";
import { HomeDashboardFlightPathPanel, HomeDashboardFpvPanel } from "./HomeDashboardLivePanels";
import { cn } from "@/lib/utils";

const SITE_IMAGE = "/images/westport-site.jpg";

const SIDEBAR_NAV = [
  { label: "Dashboard", active: true },
  { label: "Analytics", active: false },
  { label: "Site Maps", active: false },
  { label: "Reports", active: false },
  { label: "Documents", active: false },
  { label: "Alerts", active: false },
  { label: "Settings", active: false },
] as const;

const KPI_DETAILS = [
  { label: "Projects", value: "24", dot: "bg-emerald-400" },
  { label: "Surveys", value: "156", dot: "bg-sky-400" },
  { label: "Issues", value: "8", dot: "bg-amber-400" },
  { label: "Reports", value: "142", dot: "bg-blue-500" },
] as const;

const ZONE_PROGRESS = [
  { label: "North Warehouse", value: 82 },
  { label: "South Warehouse", value: 49 },
  { label: "Utilities Corridor", value: 61 },
  { label: "Truck Yard", value: 78 },
] as const;

const SITE_ZONES = [
  { label: "North Warehouse", className: "left-[18%] top-[22%]" },
  { label: "Utility Corridor", className: "left-[44%] top-[38%]" },
  { label: "South Warehouse", className: "left-[62%] top-[58%]" },
  { label: "Truck Yard", className: "left-[28%] top-[68%]" },
] as const;

const REPORTS = [
  { title: "June Progress Report", age: "Generated 2 days ago" },
  { title: "Earthworks Analysis", age: "Generated 4 days ago" },
  { title: "Executive Summary", age: "Generated 5 days ago" },
  { title: "Monthly Progress Pack", age: "Generated 8 days ago" },
] as const;

const EARTHWORKS = [42, 58, 51, 67, 74, 63];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-white/[0.14] bg-[#151b26]", className)}>
      {children}
    </div>
  );
}

function SidebarIcon({ active = false }: { active?: boolean }) {
  return (
    <span
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded",
        active ? "text-[#60a5fa]" : "text-white/35",
      )}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
        <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
        <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity="0.55" />
        <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.55" />
        <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.35" />
      </svg>
    </span>
  );
}

function EarthworksChart() {
  const max = Math.max(...EARTHWORKS);
  return (
    <div className="mt-2 flex h-[84px] items-end gap-1.5">
      {EARTHWORKS.map((value, index) => (
        <div key={MONTHS[index]} className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-sm bg-[#38bdf8]/85"
            style={{ height: `${(value / max) * 68}px` }}
          />
          <span className="text-[8px] text-white/40">{MONTHS[index]}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressVsPlanChart() {
  const actual = [32, 38, 45, 52, 61, 68, 74];
  const planned = [30, 36, 44, 50, 58, 66, 72];
  const width = 160;
  const height = 64;
  const toPoints = (values: number[]) =>
    values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * width;
        const y = height - (value / 100) * height;
        return `${x},${y}`;
      })
      .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 h-[84px] w-full" aria-hidden>
      {[16, 32, 48].map((y) => (
        <line key={y} x1="0" y1={y} x2={width} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      ))}
      <polyline
        points={toPoints(planned)}
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <polyline
        points={toPoints(actual)}
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text x="4" y="10" fill="rgba(255,255,255,0.45)" fontSize="7">
        Actual
      </text>
      <text x="4" y="18" fill="rgba(255,255,255,0.35)" fontSize="7">
        Planned
      </text>
    </svg>
  );
}

type GeospatialDashboardProps = {
  className?: string;
};

export default function GeospatialDashboard({ className }: GeospatialDashboardProps) {
  return (
    <div className={cn("relative mx-auto w-full", className)}>
      <div className="overflow-hidden rounded-[20px] border border-white/20 bg-[#0b1118] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        <div className="flex min-h-[620px]">
          <aside className="hidden w-[196px] shrink-0 border-r border-white/10 bg-[#0d121c] lg:flex lg:flex-col">
            <div className="border-b border-white/10 px-4 py-4">
              <div className="rounded-lg bg-white px-2.5 py-1.5">
                <span className="text-[13px] font-bold tracking-[-0.02em] text-[#1a2b4a]">
                  Drone<span className="text-[#2563eb]">Catalyst</span>
                </span>
              </div>
              <div className="mt-4 space-y-2 text-[10px]">
                <div>
                  <p className="font-semibold uppercase tracking-[0.12em] text-white/35">Client</p>
                  <p className="mt-0.5 font-medium text-white/80">TerraBuild Infrastructure</p>
                </div>
                <div>
                  <p className="font-semibold uppercase tracking-[0.12em] text-white/35">Project</p>
                  <p className="mt-0.5 font-medium text-white/80">Westport Logistics Hub</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 space-y-0.5 px-2 py-3">
              {SIDEBAR_NAV.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[11px]",
                    item.active
                      ? "bg-[#2563eb]/15 text-[#93c5fd]"
                      : "text-white/45 hover:bg-white/[0.04] hover:text-white/70",
                  )}
                >
                  <SidebarIcon active={item.active} />
                  <span>{item.label}</span>
                </div>
              ))}
            </nav>

            <div className="border-t border-white/10 px-4 py-3 text-[11px] text-white/40">
              Test Lab
            </div>
          </aside>

          <main className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {KPI_DETAILS.map((kpi) => (
                <Shell key={kpi.label} className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-2 w-2 rounded-full", kpi.dot)} />
                    <p className="text-[11px] text-white/55">{kpi.label}</p>
                  </div>
                  <p className="mt-1 text-[20px] font-semibold text-white">{kpi.value}</p>
                </Shell>
              ))}
            </div>

            <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
              <SectionHoverInfo
                title="Site Intelligence"
                description="Annotated orthomosaic with warehouse zones, haul routes and survey capture metadata."
                variant="soft"
                className="min-w-0"
              >
                <Shell className="relative overflow-hidden p-0">
                  <div className="relative min-h-[220px] sm:min-h-[260px]">
                    <Image src={SITE_IMAGE} alt="" fill className="object-cover" sizes="(max-width:1280px) 100vw, 60vw" />
                    <div className="absolute inset-0 bg-[#020617]/10" />
                    {SITE_ZONES.map((zone) => (
                      <span
                        key={zone.label}
                        className={cn(
                          "absolute rounded border border-sky-300/50 bg-sky-500/20 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm",
                          zone.className,
                        )}
                      >
                        {zone.label}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-3 py-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] text-white/70">
                        Captured 4 days ago
                      </span>
                      <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[9px] text-emerald-300">
                        RGB Active
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="rounded border border-white/10 px-2 py-0.5 text-[9px] text-white/55">
                        Open Interactive Map
                      </span>
                      <span className="rounded border border-white/10 px-2 py-0.5 text-[9px] text-white/55">
                        View Orthomosaic
                      </span>
                    </div>
                  </div>
                </Shell>
              </SectionHoverInfo>

              <Shell className="p-3">
                <p className="text-[12px] font-semibold text-white">Progress by Zone</p>
                <p className="mt-0.5 text-[10px] text-white/45">
                  Completion percentage and variance vs planned progress
                </p>
                <ul className="mt-3 space-y-3">
                  {ZONE_PROGRESS.map((zone) => (
                    <li key={zone.label}>
                      <div className="flex items-center justify-between gap-2 text-[10px]">
                        <span className="text-white/75">{zone.label}</span>
                        <span className="font-semibold text-white">{zone.value}%</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#38bdf8]"
                          style={{ width: `${zone.value}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </Shell>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Shell className="p-3">
                <p className="text-[11px] font-medium text-white/70">Earthworks Volume</p>
                <EarthworksChart />
              </Shell>

              <Shell className="p-3">
                <p className="text-[11px] font-medium text-white/70">Progress vs Plan</p>
                <ProgressVsPlanChart />
              </Shell>

              <HomeDashboardFlightPathPanel />
              <HomeDashboardFpvPanel />
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                Reports
              </p>
              <p className="mt-0.5 text-[11px] text-white/55">
                Intelligence deliverables for project stakeholders
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {REPORTS.map((report) => (
                  <Shell key={report.title} className="p-3">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded bg-red-500/15 text-[10px] text-red-300">
                        PDF
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-medium text-white">{report.title}</p>
                        <p className="mt-0.5 text-[9px] text-white/45">{report.age}</p>
                      </div>
                    </div>
                    <div className="mt-2.5 flex gap-1.5">
                      <span className="rounded border border-white/10 px-2 py-0.5 text-[9px] text-white/55">
                        View Report
                      </span>
                      <span className="rounded border border-white/10 px-2 py-0.5 text-[9px] text-white/55">
                        Download
                      </span>
                    </div>
                  </Shell>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
