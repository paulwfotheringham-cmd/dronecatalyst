"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getSurveyNavHref,
  isSurveyNavItemActive,
  isSurveyOperationsDashboardPath,
  surveyNavItems,
  type SurveyOperationsBasePath,
  type SurveyOperationsView,
} from "@/lib/survey-operations-mock-data";
import { cn } from "@/lib/utils";
import {
  Building2,
  LayoutDashboard,
  MapPin,
  Package,
  Plane,
  Radio,
  ScrollText,
  Target,
  X,
  Zap,
} from "lucide-react";

const iconMap = {
  LayoutDashboard,
  Building2,
  Package,
  MapPin,
  Target,
  Plane,
  Radio,
  ScrollText,
} as const;

type SurveyOperationsSidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
  activeView?: SurveyOperationsView;
  onViewChange?: (view: SurveyOperationsView) => void;
  basePath?: SurveyOperationsBasePath;
};

export default function SurveyOperationsSidebar({
  mobileOpen = false,
  onClose,
  activeView,
  onViewChange,
  basePath = "/testflighthub",
}: SurveyOperationsSidebarProps) {
  const pathname = usePathname() ?? "";
  const inAppNavigation =
    isSurveyOperationsDashboardPath(pathname, basePath) && onViewChange != null;

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(280px,88vw)] flex-col overflow-hidden border-r border-white/[0.08] bg-[#07111F] transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-[240px] lg:shrink-0 lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.08] px-4 lg:h-16 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-white/90">DRONE CATALYST</p>
            <p className="text-[10px] text-white/35">Survey Operations</p>
          </div>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/60 lg:hidden"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="shrink-0 border-b border-white/[0.08] px-4 py-4 lg:px-6 lg:py-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">Workspace</p>
        <p className="mt-1.5 text-sm font-medium leading-snug text-white/85">
          Barcelona · Porto · Oxford
        </p>
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 py-3 lg:px-3 lg:py-4">
        {surveyNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          const active = isSurveyNavItemActive(pathname, item, activeView ?? null, basePath);
          const externalHref = "href" in item ? item.href : undefined;
          const navHref = getSurveyNavHref(item.view, externalHref, basePath);
          const className = cn(
            "flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-[13px] transition-colors",
            active
              ? "bg-[#0D1B2A] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
              : "text-white/45 hover:bg-[#0D1B2A]/60 hover:text-white/75",
          );

          if (inAppNavigation && item.view) {
            return (
              <button
                key={item.label}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  onViewChange(item.view!);
                  onClose?.();
                }}
                className={className}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={navHref}
              aria-current={active ? "page" : undefined}
              onClick={onClose}
              className={className}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
