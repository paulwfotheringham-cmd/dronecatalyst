"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/layout/Logo";
import {
  getInternalNavHref,
  internalSurveyNavSections,
  isInternalNavItemActive,
  type InternalNavItem,
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
  Wallet,
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
  Mail,
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
  Wallet,
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
  Mail,
  Users,
  Film,
  PenLine,
} as const;

const navItemClass = (active: boolean, compact = false) =>
  cn(
    "flex w-full items-center rounded-lg text-left leading-tight transition-colors",
    compact
      ? "gap-2 px-2.5 py-1.5 text-[12px] lg:py-[0.4rem] lg:text-[11.5px]"
      : "gap-2.5 px-3 py-2 text-[13px] leading-snug sm:px-3.5 sm:py-2 sm:text-sm",
    active
      ? "bg-[#0D1B2A] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      : "text-white/50 hover:bg-[#0D1B2A]/60 hover:text-white/80",
  );

const sectionHeaderClass =
  "mb-1.5 px-2.5 pt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-400/90 lg:mb-2 lg:text-[9.5px]";

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
  const logoHref = mode === "internal" ? "/internaldashboard" : basePath;

  function renderNavItem(
    item: { label: string; icon: string },
    active: boolean,
    onNavigate: () => void,
    asLink: boolean,
    href: string,
    compact = false,
  ) {
    const Icon = iconMap[item.icon as keyof typeof iconMap];
    const content = (
      <>
        <Icon
          className={cn(
            "shrink-0",
            compact ? "h-3.5 w-3.5 lg:h-[15px] lg:w-[15px]" : "h-4 w-4 sm:h-[18px] sm:w-[18px]",
          )}
        />
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
          className={navItemClass(active, compact)}
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
        className={navItemClass(active, compact)}
      >
        {content}
      </button>
    );
  }

  function renderInternalNavItemBlock(item: InternalNavItem) {
    const active = isInternalNavItemActive(
      pathname,
      item,
      (activeView as InternalOperationsView | undefined) ?? "home",
    );
    const navHref = getInternalNavHref(item.view as InternalOperationsView);

    if (inAppNavigation) {
      return renderNavItem(
        item,
        active,
        () => {
          (onViewChange as (view: InternalOperationsView) => void)(item.view as InternalOperationsView);
          onClose?.();
        },
        false,
        navHref,
        true,
      );
    }

    return renderNavItem(item, active, () => undefined, true, navHref, true);
  }

  function renderInternalSection(
    section: (typeof internalSurveyNavSections)[number],
    className?: string,
  ) {
    return (
      <div key={section.label ?? "home"} className={className}>
        {section.label ? <p className={sectionHeaderClass}>{section.label}</p> : null}
        <div className="space-y-0.5 lg:space-y-1">
          {section.items.map((item) => renderInternalNavItemBlock(item))}
        </div>
      </div>
    );
  }

  const internalHomeSection = internalSurveyNavSections[0];
  const internalBusinessCentralSection = internalSurveyNavSections[1];
  const internalFillSections = internalSurveyNavSections.slice(2);
  const isInternalCompact = mode === "internal";

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(280px,88vw)] flex-col overflow-hidden border-r border-white/[0.08] bg-[#07111F] transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-[240px] lg:shrink-0 lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-between border-b border-white/[0.08]",
          isInternalCompact ? "px-2.5 pb-2 pt-2 lg:px-3" : "px-3 pb-4 pt-2.5 lg:px-3.5 lg:pb-5 lg:pt-3",
        )}
      >
        <div
          className={cn(
            "min-w-0 flex-1 rounded-lg bg-white",
            isInternalCompact ? "px-2 py-1" : "px-2.5 py-1.5",
          )}
        >
          <Logo
            height={isInternalCompact ? 24 : 30}
            href={logoHref}
            className="block w-full max-w-none"
          />
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

      <nav
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-x-hidden px-2 pb-3 lg:px-2.5 lg:pb-4",
          isInternalCompact
            ? "overflow-y-auto pt-3 [scrollbar-width:none] lg:overflow-hidden lg:pt-3.5 [&::-webkit-scrollbar]:hidden"
            : "overflow-y-auto pt-4 lg:px-3 lg:pt-5",
        )}
      >
        {mode === "internal" ? (
          <div className="flex min-h-0 flex-1 flex-col">
            {renderInternalSection(internalHomeSection, "mb-5 shrink-0 lg:mb-7")}
            {renderInternalSection(internalBusinessCentralSection, "mb-5 shrink-0 lg:mb-7")}
            <div className="flex min-h-0 flex-1 flex-col justify-between gap-4 lg:gap-0">
              {internalFillSections.map((section) => renderInternalSection(section))}
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {surveyNavItems.map((item) => {
              const active = isSurveyNavItemActive(
                pathname,
                item as (typeof surveyNavItems)[number],
                activeView as SurveyOperationsView | null | undefined,
                basePath,
              );
              const externalHref = "href" in item ? item.href : undefined;
              const navHref = getSurveyNavHref(
                item.view as SurveyOperationsView | null,
                externalHref,
                basePath,
              );

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
        )}
      </nav>
    </aside>
  );
}
