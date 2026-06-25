"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import SectionHoverInfo from "./SectionHoverInfo";
import { cn } from "@/lib/utils";

const SITE_IMAGE = "/images/westport-site.jpg";

function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-white/[0.14] bg-[#151b26] ${className}`}>
      {children}
    </div>
  );
}

function NavIcon({ active = false }: { active?: boolean }) {
  return (
    <span
      className={`mx-auto flex h-9 w-9 items-center justify-center rounded-md ${
        active ? "bg-[#2563eb]/20 text-[#60a5fa]" : "text-white/35"
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
        <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
        <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity="0.55" />
        <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.55" />
        <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.35" />
      </svg>
    </span>
  );
}

function ProgressChart() {
  return (
    <svg viewBox="0 0 160 64" className="mt-1.5 h-[84px] w-full" aria-hidden>
      <defs>
        <linearGradient id="progressFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[16, 32, 48].map((y) => (
        <line key={y} x1="0" y1={y} x2="160" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      ))}
      <path
        d="M0,48 L20,44 L40,40 L60,34 L80,28 L100,24 L120,18 L140,14 L160,10 L160,64 L0,64 Z"
        fill="url(#progressFill)"
      />
      <polyline
        points="0,48 20,44 40,40 60,34 80,28 100,24 120,18 140,14 160,10"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VolumeSparkline() {
  return (
    <svg viewBox="0 0 120 24" className="mt-1.5 h-7 w-full" aria-hidden>
      <polyline
        points="0,18 15,14 30,16 45,10 60,12 75,8 90,10 105,6 120,8"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SIDEBAR = ["Dashboard", "Projects", "Maps", "Reports", "Analytics", "Inspections"];

const KPI_DETAILS = [
  {
    label: "Projects",
    value: "24",
    dot: "bg-emerald-400",
    info: "Active client projects with live survey schedules, deliverable tracking and team access controls.",
  },
  {
    label: "Surveys",
    value: "156",
    dot: "bg-sky-400",
    info: "Completed aerial capture missions indexed by site, date and sensor type for audit and replay.",
  },
  {
    label: "Issues",
    value: "8",
    dot: "bg-amber-400",
    info: "Open findings flagged from inspections or analytics workflows, prioritised by severity and assignee.",
  },
  {
    label: "Reports",
    value: "142",
    dot: "bg-blue-500",
    info: "Published PDF and data exports available to stakeholders through the secure client portal.",
  },
] as const;

type GeospatialDashboardProps = {
  className?: string;
};

export default function GeospatialDashboard({ className }: GeospatialDashboardProps) {
  return (
    <div className={cn("relative mx-auto w-full", className)}>
      <div className="overflow-visible rounded-[20px] border border-white/20 bg-[#0b1118] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#101622] px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">dronecatalyst</span>
            <span className="hidden rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[12px] text-white/55 sm:inline">
              Project Alpha ▾
            </span>
          </div>
        </div>

        <div className="flex">
          <aside className="hidden w-[87px] shrink-0 border-r border-white/10 bg-[#0d121c] py-3 sm:block">
            {SIDEBAR.map((item, index) => (
              <div key={item} className="mb-1.5 px-2 text-center">
                <NavIcon active={index === 0} />
                <p className={`mt-1 truncate text-[9px] ${index === 0 ? "text-[#60a5fa]" : "text-white/30"}`}>
                  {item}
                </p>
              </div>
            ))}
          </aside>

          <main className="min-w-0 flex-1 overflow-visible p-4">
            <h2 className="text-[18px] font-semibold text-white">Dashboard</h2>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {KPI_DETAILS.map((kpi) => (
                <SectionHoverInfo
                  key={kpi.label}
                  title={kpi.label}
                  description={kpi.info}
                  variant="soft"
                  className="min-w-0"
                >
                  <Shell className="cursor-default px-2.5 py-2.5 transition-colors hover:border-[#2563eb]/40">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${kpi.dot}`} />
                      <p className="text-[12px] text-white/60">{kpi.label}</p>
                    </div>
                    <p className="mt-1 text-[18px] font-semibold text-white">{kpi.value}</p>
                  </Shell>
                </SectionHoverInfo>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2">
              <SectionHoverInfo
                title="Progress Overview"
                description="Track earthworks, grading and programme milestones against baseline schedules with trend visualisation."
                variant="soft"
                className="col-span-1 min-w-0"
              >
                <Shell className="cursor-default p-2.5 transition-colors hover:border-[#2563eb]/40">
                  <p className="text-[12px] font-medium text-white/60">Progress Overview</p>
                  <ProgressChart />
                </Shell>
              </SectionHoverInfo>

              <SectionHoverInfo
                title="Site Overview"
                description="Live orthophoto and site context for the active project, linked to maps, layers and annotation tools."
                variant="soft"
                className="col-span-1 min-w-0"
              >
                <Shell className="relative col-span-1 cursor-default overflow-hidden p-0 transition-colors hover:border-[#2563eb]/40">
                  <div className="relative h-[117px]">
                    <Image src={SITE_IMAGE} alt="" fill className="object-cover" sizes="280px" />
                    <div className="absolute inset-0 bg-[#020617]/10" />
                    <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-[10px] font-medium text-white">
                      Site Overview
                    </div>
                  </div>
                </Shell>
              </SectionHoverInfo>

              <SectionHoverInfo
                title="Volume Change"
                description="Compare cut, fill and stockpile volumes between survey epochs to support reconciliation and billing."
                variant="soft"
                className="col-span-1 min-w-0"
              >
                <Shell className="cursor-default p-2.5 transition-colors hover:border-[#2563eb]/40">
                  <p className="text-[12px] font-medium text-white/60">Volume Change</p>
                  <p className="mt-1 text-[18px] font-semibold text-white">+12,540 m³</p>
                  <p className="text-[10px] text-white/55">vs last survey</p>
                  <VolumeSparkline />
                </Shell>
              </SectionHoverInfo>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2">
              <SectionHoverInfo
                title="Recent Reports"
                description="Quick access to the latest published deliverables, formatted for project directors and site teams."
                variant="soft"
                className="min-w-0"
              >
                <Shell className="cursor-default p-2.5 transition-colors hover:border-[#2563eb]/40">
                  <p className="text-[12px] font-medium text-white/60">Recent Reports</p>
                  <ul className="mt-1.5 space-y-1.5 text-[10px] text-white/80">
                    <li>Site Progress · Jul 2026</li>
                    <li>Stockpile Analysis</li>
                    <li>Roof Inspection · Bldg A</li>
                  </ul>
                </Shell>
              </SectionHoverInfo>

              <SectionHoverInfo
                title="Active Issues"
                description="Inspection and analytics findings with severity, status and responsible party for closed-loop remediation."
                variant="soft"
                className="min-w-0"
              >
                <Shell className="cursor-default p-2.5 transition-colors hover:border-[#2563eb]/40">
                  <p className="text-[12px] font-medium text-white/60">Active Issues</p>
                  <ul className="mt-1.5 space-y-1.5 text-[10px]">
                    <li className="flex items-center justify-between gap-1 text-white/80">
                      <span className="truncate">Roof membrane</span>
                      <span className="rounded bg-orange-500/20 px-1 text-orange-200">High</span>
                    </li>
                    <li className="flex items-center justify-between gap-1 text-white/80">
                      <span className="truncate">Drainage blocked</span>
                      <span className="rounded bg-amber-500/20 px-1 text-amber-200">Med</span>
                    </li>
                    <li className="flex items-center justify-between gap-1 text-white/80">
                      <span className="truncate">Crack detected</span>
                      <span className="rounded bg-emerald-500/20 px-1 text-emerald-200">Low</span>
                    </li>
                  </ul>
                </Shell>
              </SectionHoverInfo>

              <SectionHoverInfo
                title="Weather"
                description="On-site conditions and forecast context to support flight planning and survey scheduling decisions."
                variant="soft"
                className="min-w-0"
              >
                <Shell className="flex cursor-default flex-col items-center justify-center p-2.5 text-center transition-colors hover:border-[#2563eb]/40">
                  <p className="text-[12px] font-medium text-white/60">Weather</p>
                  <p className="mt-1.5 text-[22px] font-semibold text-white">24°C</p>
                  <p className="text-[10px] text-white/55">Partly cloudy</p>
                </Shell>
              </SectionHoverInfo>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
