import Image from "next/image";
import type { ReactNode } from "react";

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
      className={`mx-auto flex h-6 w-6 items-center justify-center rounded-md ${
        active ? "bg-[#2563eb]/20 text-[#60a5fa]" : "text-white/35"
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden>
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
    <svg viewBox="0 0 160 64" className="mt-1 h-14 w-full" aria-hidden>
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
    <svg viewBox="0 0 120 24" className="mt-1 h-5 w-full" aria-hidden>
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

export default function GeospatialDashboard() {
  return (
    <div className="relative w-[450px] sm:w-[500px] lg:w-[538px]">
      <div className="overflow-hidden rounded-[14px] border border-white/20 bg-[#0b1118] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
        {/* App chrome */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#101622] px-3 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-[10px] font-semibold tracking-[-0.02em] text-white">dronecatalyst</span>
            <span className="hidden rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[8px] text-white/55 sm:inline">
              Project Alpha ▾
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/35">
            {["⌕", "◉", "◯"].map((icon) => (
              <span key={icon} className="flex h-5 w-5 items-center justify-center rounded-md border border-white/10 text-[9px]">
                {icon}
              </span>
            ))}
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden w-[58px] shrink-0 border-r border-white/10 bg-[#0d121c] py-2 sm:block">
            {SIDEBAR.map((item, index) => (
              <div key={item} className="mb-1 px-1.5 text-center">
                <NavIcon active={index === 0} />
                <p className={`mt-0.5 truncate text-[6px] ${index === 0 ? "text-[#60a5fa]" : "text-white/30"}`}>
                  {item}
                </p>
              </div>
            ))}
          </aside>

          {/* Main workspace */}
          <main className="min-w-0 flex-1 p-2.5">
            <h2 className="text-[12px] font-semibold text-white">Dashboard</h2>

            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {[
                { label: "Projects", value: "24", dot: "bg-emerald-400" },
                { label: "Surveys", value: "156", dot: "bg-sky-400" },
                { label: "Issues", value: "8", dot: "bg-amber-400" },
                { label: "Reports", value: "142", dot: "bg-blue-500" },
              ].map((kpi) => (
                <Shell key={kpi.label} className="px-1.5 py-1.5">
                  <div className="flex items-center gap-1">
                    <span className={`h-1.5 w-1.5 rounded-full ${kpi.dot}`} />
                    <p className="text-[8px] text-white/60">{kpi.label}</p>
                  </div>
                  <p className="mt-0.5 text-[12px] font-semibold text-white">{kpi.value}</p>
                </Shell>
              ))}
            </div>

            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              <Shell className="col-span-1 p-1.5">
                <p className="text-[8px] font-medium text-white/60">Progress Overview</p>
                <ProgressChart />
              </Shell>

              <Shell className="relative col-span-1 overflow-hidden p-0">
                <div className="relative h-[78px]">
                  <Image src={SITE_IMAGE} alt="" fill className="object-cover" sizes="180px" />
                  <div className="absolute inset-0 bg-[#020617]/10" />
                  <div className="absolute left-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[7px] font-medium text-white">
                    Site Overview
                  </div>
                </div>
              </Shell>

              <Shell className="col-span-1 p-1.5">
                <p className="text-[8px] font-medium text-white/60">Volume Change</p>
                <p className="mt-0.5 text-[12px] font-semibold text-white">+12,540 m³</p>
                <p className="text-[7px] text-white/55">vs last survey</p>
                <VolumeSparkline />
              </Shell>
            </div>

            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              <Shell className="p-1.5">
                <p className="text-[8px] font-medium text-white/60">Recent Reports</p>
                <ul className="mt-1 space-y-1 text-[7px] text-white/80">
                  <li>Site Progress · Jul 2026</li>
                  <li>Stockpile Analysis</li>
                  <li>Roof Inspection · Bldg A</li>
                </ul>
              </Shell>

              <Shell className="p-1.5">
                <p className="text-[8px] font-medium text-white/60">Active Issues</p>
                <ul className="mt-1 space-y-1 text-[7px]">
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

              <Shell className="flex flex-col items-center justify-center p-1.5 text-center">
                <p className="text-[8px] font-medium text-white/60">Weather</p>
                <p className="mt-1 text-[15px] font-semibold text-white">24°C</p>
                <p className="text-[7px] text-white/55">Partly cloudy</p>
              </Shell>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
