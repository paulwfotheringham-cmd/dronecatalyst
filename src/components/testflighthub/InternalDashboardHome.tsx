"use client";

import {
  internalSurveyNavSections,
  type InternalOperationsView,
} from "@/lib/internal-operations-data";
import { getHomeModule, homeKpis } from "@/lib/internal-home-modules";
import { cn } from "@/lib/utils";
import {
  Binoculars,
  Building2,
  CalendarDays,
  ChevronRight,
  Compass,
  ContactRound,
  Film,
  FlaskConical,
  FolderKanban,
  FolderOpen,
  History,
  Layers,
  Mail,
  MessageSquare,
  Package,
  PenLine,
  Plane,
  Radio,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

const iconMap = {
  Building2,
  ContactRound,
  Wallet,
  FolderKanban,
  History,
  Package,
  Plane,
  FolderOpen,
  CalendarDays,
  Mail,
  MessageSquare,
  Compass,
  Binoculars,
  PenLine,
  Film,
  FlaskConical,
  Layers,
  Radio,
  Users,
} as const;

type InternalDashboardHomeProps = {
  onNavigate: (view: InternalOperationsView) => void;
  onViewMockups?: () => void;
};

function ModuleCard({
  label,
  description,
  accent,
  iconKey,
  onClick,
  featured = false,
}: {
  label: string;
  description: string;
  accent: string;
  iconKey: string;
  onClick: () => void;
  featured?: boolean;
}) {
  const Icon = iconMap[iconKey as keyof typeof iconMap] ?? Compass;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-xl border bg-gradient-to-br from-white/[0.04] to-transparent p-3 text-left shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] sm:gap-3.5 sm:rounded-2xl sm:p-3.5",
        accent,
        featured && "sm:col-span-2 lg:col-span-1",
      )}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/[0.03] blur-2xl transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-sky-300 transition-colors group-hover:border-white/20 group-hover:bg-black/30 sm:h-10 sm:w-10">
        <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-white sm:text-[15px]">{label}</h3>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/25 transition-all group-hover:translate-x-0.5 group-hover:text-white/60" />
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-white/50 sm:text-[13px]">{description}</p>
      </div>
    </button>
  );
}

export default function InternalDashboardHome({
  onNavigate,
  onViewMockups,
}: InternalDashboardHomeProps) {
  const sections = internalSurveyNavSections.filter((section) => section.label !== null);

  return (
    <section aria-label="Internal operations home" className="min-w-0 space-y-5 pb-6 sm:space-y-6">
      <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-[#0b1220] to-[#060a12] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5 lg:p-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 0% 0%, rgba(56, 189, 248, 0.14), transparent 55%), radial-gradient(ellipse 50% 60% at 100% 0%, rgba(99, 102, 241, 0.12), transparent 50%)",
          }}
        />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300/90">
              <Sparkles className="h-3 w-3" />
              Command center
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Operations at a glance
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-white/55 sm:text-[15px]">
              Live projects, revenue, and field activity — grouped the same way as your sidebar.
            </p>
          </div>
          {onViewMockups ? (
            <button
              type="button"
              onClick={onViewMockups}
              className="shrink-0 self-start rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white lg:self-auto"
            >
              Compare 3 design concepts
            </button>
          ) : null}
        </div>

        <div className="relative mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {homeKpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-white/[0.08] bg-black/25 px-3 py-2.5 backdrop-blur-sm sm:px-3.5 sm:py-3"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40 sm:text-[11px]">
                {kpi.label}
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-white sm:text-xl">{kpi.value}</p>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-white/45 sm:text-xs">{kpi.hint}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="space-y-5 sm:space-y-6">
        {sections.map((section) => (
          <div key={section.label} className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-400/90">
                {section.label}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {section.items.map((item) => {
                const module = getHomeModule(item);
                if (!module) return null;

                return (
                  <ModuleCard
                    key={item.view}
                    label={item.label}
                    description={module.description}
                    accent={module.accent}
                    iconKey={module.icon}
                    onClick={() => onNavigate(item.view)}
                    featured={item.view === "projects"}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
