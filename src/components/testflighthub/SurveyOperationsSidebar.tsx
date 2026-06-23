"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/layout/Logo";
import {
  getInternalNavHref,
  internalSurveyNavItems,
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
  Binoculars,
  Building2,
  Compass,
  ContactRound,
  Film,
  FlaskConical,
  FolderKanban,
  FolderOpen,
  History,
  Layers,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  CalendarDays,
  Package,
  PenLine,
  Plane,
  Radio,
  ScrollText,
  Target,
  Users,
  X,
} from "lucide-react";

const iconMap = {
  LayoutDashboard,
  Binoculars,
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
  CalendarDays,
  Users,
  Film,
  PenLine,
} as const;

const navItemClass = (active: boolean) =>
  cn(
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] leading-snug transition-colors sm:px-3.5 sm:py-2 sm:text-sm",
    active
      ? "bg-[#0D1B2A] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      : "text-white/50 hover:bg-[#0D1B2A]/60 hover:text-white/80",
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
    item: (typeof navItems)[number],
    active: boolean,
    onNavigate: () => void,
    asLink: boolean,
    href: string,
  ) {
    const Icon = iconMap[item.icon as keyof typeof iconMap];
    const content = (
      <>
        <Icon className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
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
      <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-3 pb-4 pt-2.5 lg:px-3.5 lg:pb-5 lg:pt-3">
        <div className="min-w-0 flex-1 rounded-lg bg-white px-2.5 py-1.5">
          <Logo height={30} href={logoHref} className="block w-full max-w-none" />
        </div>
        <button
          type="button"
          className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] text-white/60 lg:hidden"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-2.5 pt-4 pb-2 lg:px-3 lg:pt-5">
        <div className="space-y-1">
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
      </nav>
    </aside>
  );
}
