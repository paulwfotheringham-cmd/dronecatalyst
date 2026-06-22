import type { SurveyOperationsBasePath } from "@/lib/survey-operations-mock-data";

export type InternalOperationsView =
  | "home"
  | "clients"
  | "assets"
  | "testing"
  | "live-projects"
  | "recent-missions"
  | "webodm";

export const INTERNAL_OPERATIONS_BASE_PATH: SurveyOperationsBasePath = "/internaldashboard";

export const internalOperationsViews: InternalOperationsView[] = [
  "home",
  "clients",
  "assets",
  "testing",
  "live-projects",
  "recent-missions",
  "webodm",
];

export function isInternalOperationsView(value: string | null): value is InternalOperationsView {
  return internalOperationsViews.includes(value as InternalOperationsView);
}

export const internalBottomNavItems = [
  { label: "Users", icon: "Users", href: "/users" as const },
  { label: "Files", icon: "FolderOpen", href: "/files" as const },
] as const;

export type InternalBottomNavItem = (typeof internalBottomNavItems)[number];

export const internalSurveyNavItems = [
  { label: "Home", icon: "LayoutDashboard", view: "home" as const },
  { label: "Clients", icon: "Building2", view: "clients" as const },
  { label: "Assets", icon: "Package", view: "assets" as const },
  { label: "Testing", icon: "FlaskConical", view: "testing" as const },
  { label: "Live Projects", icon: "FolderKanban", view: "live-projects" as const },
  { label: "Recent Missions", icon: "History", view: "recent-missions" as const },
  { label: "WebODM", icon: "Layers", view: "webodm" as const },
  { label: "Live Telemetry", icon: "Radio", view: null, href: "/telemetry" as const },
] as const;

export type InternalNavItem = (typeof internalSurveyNavItems)[number];

export const internalViewTitles: Record<
  InternalOperationsView,
  { title: string; subtitle: string }
> = {
  home: { title: "Internal Operations", subtitle: "Drone Catalyst" },
  clients: { title: "Client Directory", subtitle: "Internal Operations" },
  assets: { title: "Asset Registry", subtitle: "Internal Operations" },
  testing: { title: "Flight Simulator Testing", subtitle: "Internal Operations" },
  "live-projects": { title: "Live Projects", subtitle: "Internal Operations" },
  "recent-missions": { title: "Recent Missions", subtitle: "Internal Operations" },
  webodm: { title: "WebODM Processing", subtitle: "Internal Operations" },
};

export const internalHomeTiles = [
  {
    view: "clients" as const,
    title: "Clients",
    description: "Client accounts, contracts, and contacts.",
    accent: "from-sky-500/20 to-blue-600/10 border-sky-400/30",
  },
  {
    view: "assets" as const,
    title: "Assets",
    description: "Matrice 4T registry — Barcelona, Porto, Oxford.",
    accent: "from-violet-500/20 to-indigo-600/10 border-violet-400/30",
  },
  {
    view: "testing" as const,
    title: "Testing",
    description: "FlightHub simulator and flight path validation.",
    accent: "from-emerald-500/20 to-teal-600/10 border-emerald-400/30",
  },
  {
    view: "live-projects" as const,
    title: "Live Projects",
    description: "Active operations, progress, and airframes.",
    accent: "from-amber-500/20 to-orange-600/10 border-amber-400/30",
  },
  {
    view: "recent-missions" as const,
    title: "Recent Missions",
    description: "Mission history across all regions.",
    accent: "from-cyan-500/20 to-sky-600/10 border-cyan-400/30",
  },
  {
    view: "webodm" as const,
    title: "WebODM",
    description: "Orthophotos, point clouds, and 3D models.",
    accent: "from-fuchsia-500/20 to-purple-600/10 border-fuchsia-400/30",
  },
  {
    view: null,
    href: "/telemetry" as const,
    title: "Live Telemetry",
    description: "Real-time drone OSD and telemetry feed.",
    accent: "from-rose-500/20 to-red-600/10 border-rose-400/30",
  },
] as const;

export function getInternalNavHref(
  view: InternalOperationsView | null,
  externalHref: string | undefined,
) {
  if (externalHref === "/telemetry") {
    return externalHref;
  }

  if (!view || view === "home") {
    return INTERNAL_OPERATIONS_BASE_PATH;
  }

  return `${INTERNAL_OPERATIONS_BASE_PATH}?view=${view}`;
}

export function isInternalBottomNavItemActive(pathname: string, item: InternalBottomNavItem) {
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function isInternalNavItemActive(
  pathname: string,
  item: InternalNavItem,
  activeView: InternalOperationsView = "home",
) {
  if ("href" in item && item.href === "/telemetry") {
    return pathname === "/telemetry";
  }

  if (pathname !== INTERNAL_OPERATIONS_BASE_PATH) {
    return false;
  }

  return item.view === activeView;
}
