import type { SurveyOperationsBasePath } from "@/lib/survey-operations-mock-data";

export type InternalOperationsView =
  | "home"
  | "clients"
  | "crm"
  | "strategy"
  | "whiteboard"
  | "assets"
  | "fleet"
  | "testing"
  | "live-projects"
  | "recent-missions"
  | "webodm"
  | "messaging"
  | "files"
  | "users"
  | "telemetry"
  | "media-example";

export const INTERNAL_OPERATIONS_BASE_PATH: SurveyOperationsBasePath = "/internaldashboard";

export const internalOperationsViews: InternalOperationsView[] = [
  "home",
  "clients",
  "crm",
  "strategy",
  "whiteboard",
  "assets",
  "fleet",
  "testing",
  "live-projects",
  "recent-missions",
  "webodm",
  "messaging",
  "files",
  "users",
  "telemetry",
  "media-example",
];

export function isInternalOperationsView(value: string | null): value is InternalOperationsView {
  return internalOperationsViews.includes(value as InternalOperationsView);
}

export const internalSurveyNavItems = [
  { label: "Home", icon: "LayoutDashboard", view: "home" as const },
  { label: "Clients", icon: "Building2", view: "clients" as const },
  { label: "CRM", icon: "ContactRound", view: "crm" as const },
  { label: "Strategy", icon: "Compass", view: "strategy" as const },
  { label: "Whiteboard", icon: "PenLine", view: "whiteboard" as const },
  { label: "Assets", icon: "Package", view: "assets" as const },
  { label: "Fleet", icon: "Plane", view: "fleet" as const },
  { label: "Live Projects", icon: "FolderKanban", view: "live-projects" as const },
  { label: "Recent Missions", icon: "History", view: "recent-missions" as const },
  { label: "Live Telemetry", icon: "Radio", view: "telemetry" as const },
  { label: "WebODM", icon: "Layers", view: "webodm" as const },
  { label: "Testing", icon: "FlaskConical", view: "testing" as const },
  { label: "Users", icon: "Users", view: "users" as const },
  { label: "Messaging", icon: "MessageSquare", view: "messaging" as const },
  { label: "Files", icon: "FolderOpen", view: "files" as const },
  { label: "Media Example", icon: "Film", view: "media-example" as const },
] as const;

export type InternalNavItem = (typeof internalSurveyNavItems)[number];

export const internalViewTitles: Record<
  InternalOperationsView,
  { title: string; subtitle: string }
> = {
  home: { title: "Internal Operations", subtitle: "Drone Catalyst" },
  clients: { title: "Client Directory", subtitle: "Internal Operations" },
  crm: { title: "CRM", subtitle: "Internal Operations" },
  strategy: { title: "Strategy", subtitle: "Internal Operations" },
  whiteboard: { title: "Whiteboard", subtitle: "Internal Operations" },
  assets: { title: "Asset Registry", subtitle: "Internal Operations" },
  fleet: { title: "Fleet", subtitle: "Internal Operations" },
  testing: { title: "Flight Simulator Testing", subtitle: "Internal Operations" },
  "live-projects": { title: "Live Projects", subtitle: "Internal Operations" },
  "recent-missions": { title: "Recent Missions", subtitle: "Internal Operations" },
  webodm: { title: "WebODM Processing", subtitle: "Internal Operations" },
  messaging: { title: "Messaging", subtitle: "Internal Operations" },
  files: { title: "File Repository", subtitle: "Internal Operations" },
  users: { title: "Users", subtitle: "Internal Operations" },
  telemetry: { title: "Live Telemetry", subtitle: "Internal Operations" },
  "media-example": { title: "Media Example", subtitle: "Internal Operations" },
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
      view: "crm" as const,
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
      view: "messaging" as const,
      icon: "messaging" as const,
      title: "Messaging",
      description: "Internal operator chat.",
      accent: "from-blue-500/20 to-sky-600/10 border-blue-400/30",
    },
    {
      id: "files",
      view: "files" as const,
      icon: "files" as const,
      title: "Files",
      description: "Document repository.",
      accent: "from-slate-500/20 to-zinc-600/10 border-slate-400/30",
    },
    {
      id: "users",
      view: "users" as const,
      icon: "users" as const,
      title: "Users",
      description: "Operator roster and roles.",
      accent: "from-orange-500/20 to-amber-600/10 border-orange-400/30",
    },
  ],
  [
    {
      id: "telemetry",
      view: "telemetry" as const,
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
    {
      id: "strategy",
      view: "strategy" as const,
      icon: "strategy" as const,
      title: "Strategy",
      description: "Capability matrix, notes, and priorities.",
      accent: "from-teal-500/20 to-emerald-600/10 border-teal-400/30",
    },
  ],
] as const;

export type InternalHomeTile = (typeof internalHomeTileRows)[number][number];

export function getInternalNavHref(view: InternalOperationsView | null) {
  if (!view || view === "home") {
    return INTERNAL_OPERATIONS_BASE_PATH;
  }

  return `${INTERNAL_OPERATIONS_BASE_PATH}?view=${view}`;
}

export function isInternalNavItemActive(
  pathname: string,
  item: InternalNavItem,
  activeView: InternalOperationsView = "home",
) {
  if (pathname !== INTERNAL_OPERATIONS_BASE_PATH) {
    return false;
  }

  return item.view === activeView;
}
