"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/layout/Logo";
import {
  getInternalNavHref,
  internalSurveyNavSections,
  isInternalNavChildActive,
  isInternalNavItemActive,
  type InternalNavChildItem,
  type InternalNavItem,
  type InternalOperationsView,
} from "@/lib/internal-operations-data";
import { OFFICE_LOCATIONS } from "@/lib/office-locations-data";
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
  Handshake,
  History,
  Layers,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Mail,
  Package,
  PenLine,
  Pickaxe,
  Plane,
  Radio,
  ScrollText,
  Settings,
  Share2,
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
  Settings,
  Share2,
  FlaskConical,
  FolderKanban,
  FolderOpen,
  Handshake,
  History,
  Layers,
  MessageSquare,
  CalendarDays,
  Mail,
  Users,
  Film,
  PenLine,
  Pickaxe,
} as const;

const childNavItemClass = (active: boolean) =>
  cn(
    "flex w-full items-center rounded-lg py-1 pl-8 pr-2.5 text-left text-[11px] leading-tight transition-colors lg:py-[0.3rem] lg:text-[10.5px]",
    active
      ? "bg-[#0D1B2A] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      : "text-white/45 hover:bg-[#0D1B2A]/60 hover:text-white/75",
  );

const navItemClass = (active: boolean, compact = false) =>
  cn(
    "flex w-full items-center rounded-lg text-left leading-tight transition-colors",
    compact
      ? "gap-2 px-2.5 py-1 text-[11.5px] lg:py-[0.3rem] lg:text-[11px]"
      : "gap-2.5 px-3 py-2 text-[13px] leading-snug sm:px-3.5 sm:py-2 sm:text-sm",
    active
      ? "bg-[#0D1B2A] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
      : "text-white/50 hover:bg-[#0D1B2A]/60 hover:text-white/80",
  );

const sectionHeaderClass =
  "mb-1 px-2.5 pt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-400/90 lg:mb-1.5 lg:text-[9.5px]";

const officeLocationsTitleClass =
  "mb-1 mt-2 px-2.5 pt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/35";

function renderOfficeLocationsBlock() {
  return (
    <div className="border-t border-white/[0.06]">
      <p className={officeLocationsTitleClass}>Office Locations</p>
      <ul className="space-y-1 px-1 pb-1">
        {OFFICE_LOCATIONS.map((site) => (
          <li
            key={site.id}
            className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-1.5"
          >
            <p className="truncate text-[11px] font-medium text-white/75">{site.name}</p>
            <p className="truncate text-[10px] text-white/40">
              {site.city}, {site.country}
            </p>
            <p className="mt-0.5 text-[9.5px] text-white/30">
              {site.staffCount} staff · {site.timezone}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
  const resolvedActiveView = (activeView as InternalOperationsView | undefined) ?? "home";
  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const autoExpanded: Record<string, boolean> = {};
    internalSurveyNavSections.forEach((section) => {
      section.items.forEach((item) => {
        if (
          item.children?.some((child) => isInternalNavChildActive(child, resolvedActiveView))
        ) {
          autoExpanded[item.label] = true;
        }
      });
    });
    if (Object.keys(autoExpanded).length > 0) {
      setExpandedParents((current) => ({ ...current, ...autoExpanded }));
    }
  }, [resolvedActiveView]);

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

  function renderInternalChildItem(child: InternalNavChildItem) {
    const active = isInternalNavChildActive(child, resolvedActiveView);
    const navHref = getInternalNavHref(child.view);

    if (inAppNavigation) {
      return (
        <button
          key={child.label}
          type="button"
          aria-current={active ? "page" : undefined}
          onClick={() => {
            (onViewChange as (view: InternalOperationsView) => void)(child.view);
            onClose?.();
          }}
          className={childNavItemClass(active)}
        >
          <span className="truncate">{child.label}</span>
        </button>
      );
    }

    return (
      <Link
        key={child.label}
        href={navHref}
        aria-current={active ? "page" : undefined}
        onClick={onClose}
        className={childNavItemClass(active)}
      >
        <span className="truncate">{child.label}</span>
      </Link>
    );
  }

  function renderInternalNavItemBlock(item: InternalNavItem) {
    const active = isInternalNavItemActive(pathname, item, resolvedActiveView);
    const hasChildren = (item.children?.length ?? 0) > 0;
    const expanded = expandedParents[item.label] ?? active;

    if (hasChildren) {
      const Icon = iconMap[item.icon as keyof typeof iconMap];
      const Chevron = expanded ? ChevronDown : ChevronRight;

      return (
        <div key={item.label}>
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() =>
              setExpandedParents((current) => ({
                ...current,
                [item.label]: !expanded,
              }))
            }
            className={navItemClass(active, true)}
          >
            <Icon className="h-3.5 w-3.5 shrink-0 lg:h-[15px] lg:w-[15px]" />
            <span className="flex-1 truncate text-left">{item.label}</span>
            <Chevron className="h-3.5 w-3.5 shrink-0 text-white/35" />
          </button>
          {expanded ? (
            <div className="mt-0.5 space-y-0.5">
              {item.children?.map((child) => renderInternalChildItem(child))}
            </div>
          ) : null}
        </div>
      );
    }

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

  function renderInternalSection(section: (typeof internalSurveyNavSections)[number]) {
    return (
      <div key={section.label ?? "home"}>
        {section.label ? <p className={sectionHeaderClass}>{section.label}</p> : null}
        <div className="space-y-0.5">
          {section.items.map((item) => renderInternalNavItemBlock(item))}
        </div>
        {section.label === "Business Central" ? renderOfficeLocationsBlock() : null}
      </div>
    );
  }

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
          "min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-2 pb-4 lg:px-2.5",
          isInternalCompact ? "pt-2.5 lg:pt-3" : "pt-4 lg:px-3 lg:pt-5",
        )}
      >
        {mode === "internal" ? (
          <div className="space-y-3 lg:space-y-2.5">
            {internalSurveyNavSections.map((section) => renderInternalSection(section))}
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
