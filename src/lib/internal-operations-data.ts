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
  { label: "WebODM", icon: "Layers", view: "webodm" as const },
  { label: "Testing", icon: "FlaskConical", view: "testing" as const },
  { label: "Users", icon: "Users", href: "/users" as const },
  { label: "Messaging", icon: "MessageSquare", href: "/messaging" as const },
  { label: "Files", icon: "FolderOpen", href: "/files" as const },
] as const;

export type InternalBottomNavItem = (typeof internalBottomNavItems)[number];

export const internalSurveyNavItems = [
  { label: "Home", icon: "LayoutDashboard", view: "home" as const },
  { label: "Clients", icon: "Building2", view: "clients" as const },
  { label: "CRM", icon: "ContactRound", view: null, href: "/crm" as const },
  { label: "Assets", icon: "Package", view: "assets" as const },
  { label: "Live Projects", icon: "FolderKanban", view: "live-projects" as const },
  { label: "Recent Missions", icon: "History", view: "recent-missions" as const },
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

export const internalHomeTileRows = [
  [
    {
      id: "clients",
      view: "clients" as const,
      icon: "clients" as const,
      title: "Clients",
      description: "Client accounts, contracts, and contacts.",
      accent: "from-sky-500/20 to-blue-600/10 border-sky-400/30",
    },
    {
      id: "live-projects",
      view: "live-projects" as const,
      icon: "live-projects" as const,
      title: "Live Projects",
      description: "Active operations, progress, and airframes.",
      accent: "from-amber-500/20 to-orange-600/10 border-amber-400/30",
    },
    {
      id: "recent-missions",
      view: "recent-missions" as const,
      icon: "recent-missions" as const,
      title: "Recent Missions",
      description: "Mission history by region.",
      accent: "from-cyan-500/20 to-sky-600/10 border-cyan-400/30",
    },
  ],
  [
    {
      id: "crm",
      view: null,
      href: "/crm" as const,
      icon: "crm" as const,
      title: "CRM",
      description: "Lead pipeline, status, and next actions.",
      accent: "from-indigo-500/20 to-blue-600/10 border-indigo-400/30",
    },
    {
      id: "assets",
      view: "assets" as const,
      icon: "assets" as const,
      title: "Assets",
      description: "Matrice 4T fleet registry.",
      accent: "from-violet-500/20 to-indigo-600/10 border-violet-400/30",
    },
    {
      id: "testing",
      view: "testing" as const,
      icon: "testing" as const,
      title: "Testing",
      description: "FlightHub simulator testing.",
      accent: "from-emerald-500/20 to-teal-600/10 border-emerald-400/30",
    },
  ],
  [
    {
      id: "messaging",
      view: null,
      href: "/messaging" as const,
      icon: "messaging" as const,
      title: "Messaging",
      description: "Internal operator chat.",
      accent: "from-blue-500/20 to-sky-600/10 border-blue-400/30",
    },
    {
      id: "files",
      view: null,
      href: "/files" as const,
      icon: "files" as const,
      title: "Files",
      description: "Document repository.",
      accent: "from-slate-500/20 to-zinc-600/10 border-slate-400/30",
    },
    {
      id: "users",
      view: null,
      href: "/users" as const,
      icon: "users" as const,
      title: "Users",
      description: "Operator roster and roles.",
      accent: "from-orange-500/20 to-amber-600/10 border-orange-400/30",
    },
  ],
  [
    {
      id: "telemetry",
      view: null,
      href: "/telemetry" as const,
      icon: "telemetry" as const,
      title: "Live Telemetry",
      description: "Live drone OSD feed.",
      accent: "from-rose-500/20 to-red-600/10 border-rose-400/30",
    },
    {
      id: "webodm",
      view: "webodm" as const,
      icon: "webodm" as const,
      title: "WebODM",
      description: "Orthophotos and 3D models.",
      accent: "from-fuchsia-500/20 to-purple-600/10 border-fuchsia-400/30",
    },
  ],
] as const;

export type InternalHomeTile = (typeof internalHomeTileRows)[number][number];

export function getInternalNavHref(
  view: InternalOperationsView | null,
  externalHref: string | undefined,
) {
  if (externalHref) {
    return externalHref;
  }

  if (!view || view === "home") {
    return INTERNAL_OPERATIONS_BASE_PATH;
  }

  return `${INTERNAL_OPERATIONS_BASE_PATH}?view=${view}`;
}

export function isInternalBottomNavItemActive(
  pathname: string,
  item: InternalBottomNavItem,
  activeView: InternalOperationsView = "home",
) {
  if ("href" in item && item.href) {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  if ("view" in item && item.view) {
    return pathname === INTERNAL_OPERATIONS_BASE_PATH && activeView === item.view;
  }

  return false;
}

export function isInternalNavItemActive(
  pathname: string,
  item: InternalNavItem,
  activeView: InternalOperationsView = "home",
) {
  if ("href" in item && item.href) {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  if (pathname !== INTERNAL_OPERATIONS_BASE_PATH) {
    return false;
  }

  return item.view === activeView;
}
