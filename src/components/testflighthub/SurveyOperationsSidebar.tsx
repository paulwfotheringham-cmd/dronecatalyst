"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/layout/Logo";
import {
  getInternalNavHref,
  internalBottomNavItems,
  internalSurveyNavItems,
  isInternalBottomNavItemActive,
  isInternalNavItemActive,
  type InternalOperationsView,
} from "@/lib/internal-operations-data";
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
  Compass,
  ContactRound,
  FlaskConical,
  FolderKanban,
  FolderOpen,
  History,
  Layers,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Package,
  Plane,
  Radio,
  ScrollText,
  Target,
  Users,
  X,
} from "lucide-react";

const iconMap = {
  LayoutDashboard,
  Building2,
  Compass,
  ContactRound,
  Package,
  MapPin,
  Target,
  Plane,
  Radio,
  ScrollText,
  FlaskConical,
  FolderKanban,
  FolderOpen,
  History,
  Layers,
  MessageSquare,
  Users,
} as const;

const navItemClass = (active: boolean) =>
  cn(
    "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] leading-tight transition-colors sm:px-3 sm:py-[7px] sm:text-[12px]",
    active
      ? "bg-[#0D1B2A] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      : "text-white/45 hover:bg-[#0D1B2A]/60 hover:text-white/75",
  );

type SurveyOperationsSidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
  mode?: "survey" | "internal";
  activeView?: SurveyOperationsView | InternalOperationsView;
  onViewChange?: (view: SurveyOperationsView | InternalOperationsView) => void;
  basePath?: SurveyOperationsBasePath;
};

export default function SurveyOperationsSidebar({
  mobileOpen = false,
  onClose,
  mode = "survey",
  activeView,
  onViewChange,
  basePath = "/testflighthub",
}: SurveyOperationsSidebarProps) {
  const pathname = usePathname() ?? "";
  const inAppNavigation =
    isSurveyOperationsDashboardPath(pathname, basePath) && onViewChange != null;
  const navItems = mode === "internal" ? internalSurveyNavItems : surveyNavItems;
  const logoHref = mode === "internal" ? "/internaldashboard" : basePath;

  function renderNavItem(
    item: (typeof navItems)[number] | (typeof internalBottomNavItems)[number],
    active: boolean,
    onNavigate: () => void,
    asLink: boolean,
    href: string,
  ) {
    const Icon = iconMap[item.icon as keyof typeof iconMap];
    const content = (
      <>
        <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
        <span className="flex-1 truncate">{item.label}</span>
      </>
    );

    if (asLink) {
      return (
        <Link
          key={item.label}
          href={href}
          aria-current={active ? "page" : undefined}
          onClick={onClose}
          className={navItemClass(active)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        key={item.label}
        type="button"
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
        className={navItemClass(active)}
      >
        {content}
      </button>
    );
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(280px,88vw)] flex-col overflow-hidden border-r border-white/[0.08] bg-[#07111F] transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-[240px] lg:shrink-0 lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.08] px-3 lg:h-14 lg:px-4">
        <Logo height={26} onDark href={logoHref} className="min-w-0 max-w-[170px]" />
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-white/60 lg:hidden"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col overflow-hidden px-2 py-2 lg:px-2.5">
        <div className="flex min-h-0 flex-1 flex-col justify-between gap-1 overflow-hidden">
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const active =
                mode === "internal"
                  ? isInternalNavItemActive(
                      pathname,
                      item as (typeof internalSurveyNavItems)[number],
                      (activeView as InternalOperationsView | undefined) ?? "home",
                    )
                  : isSurveyNavItemActive(
                      pathname,
                      item as (typeof surveyNavItems)[number],
                      activeView as SurveyOperationsView | null | undefined,
                      basePath,
                    );
              const externalHref = "href" in item ? item.href : undefined;
              const navHref =
                mode === "internal"
                  ? getInternalNavHref(item.view as InternalOperationsView)
                  : getSurveyNavHref(
                      item.view as SurveyOperationsView | null,
                      externalHref,
                      basePath,
                    );

              if (mode === "internal" && inAppNavigation) {
                return renderNavItem(
                  item,
                  active,
                  () => {
                    (onViewChange as (view: InternalOperationsView) => void)(
                      item.view as InternalOperationsView,
                    );
                    onClose?.();
                  },
                  false,
                  navHref,
                );
              }

              if (mode === "internal") {
                return renderNavItem(item, active, () => undefined, true, navHref);
              }

              if (inAppNavigation && item.view) {
                return renderNavItem(
                  item,
                  active,
                  () => {
                    (onViewChange as (view: SurveyOperationsView) => void)(
                      item.view as SurveyOperationsView,
                    );
                    onClose?.();
                  },
                  false,
                  navHref,
                );
              }

              return renderNavItem(item, active, () => undefined, true, navHref);
            })}
          </div>

          {mode === "internal" && (
            <div className="space-y-0.5 border-t border-white/[0.08] pt-1">
              {internalBottomNavItems.map((item) => {
                const internalActiveView =
                  (activeView as InternalOperationsView | undefined) ?? "home";
                const active = isInternalBottomNavItemActive(
                  pathname,
                  item,
                  internalActiveView,
                );
                const navHref = getInternalNavHref(item.view);

                if (inAppNavigation) {
                  return renderNavItem(
                    item,
                    active,
                    () => {
                      (onViewChange as (view: InternalOperationsView) => void)(item.view);
                      onClose?.();
                    },
                    false,
                    navHref,
                  );
                }

                return renderNavItem(item, active, () => undefined, true, navHref);
              })}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
