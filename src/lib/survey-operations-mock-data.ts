export type MissionStatus = "Active" | "Scheduled" | "Completed" | "On Hold";

export type FleetDroneStatus =
  | "In Flight"
  | "Standby"
  | "In Hangar"
  | "Maintenance"
  | "Stopped";

export type FleetDroneSummary = {
  id: string;
  model: string;
  homeBase: string;
  status: FleetDroneStatus;
  battery: number;
  lastContact: string;
  telemetryDroneId?: string;
};

export const fleetDrones: FleetDroneSummary[] = [
  {
    id: "DC-M4T-BCN",
    model: "DJI Matrice 4T",
    homeBase: "Barcelona",
    status: "Standby",
    battery: 96,
    lastContact: "4 min ago",
  },
  {
    id: "DC-M4T-PRT",
    model: "DJI Matrice 4T",
    homeBase: "Porto",
    status: "In Hangar",
    battery: 100,
    lastContact: "18 min ago",
  },
  {
    id: "DC-M4T-OXF",
    model: "DJI Matrice 4T",
    homeBase: "Oxford",
    status: "Standby",
    battery: 94,
    lastContact: "Awaiting link",
    telemetryDroneId: "DC-TEST-001",
  },
];

export const recentMissions = [
  {
    name: "Riells del Fai Corridor Survey",
    client: "Catalonia Energy Partners",
    status: "Completed" as MissionStatus,
    date: "12 Jun 2026",
  },
  {
    name: "Douro Berth Volumetrics",
    client: "Douro Maritime Logistics",
    status: "Active" as MissionStatus,
    date: "17 Jun 2026",
  },
  {
    name: "Oxford Campus Envelope",
    client: "Oxford Heritage Survey Ltd",
    status: "Scheduled" as MissionStatus,
    date: "22 Jun 2026",
  },
  {
    name: "Iberia Corridor Pilot",
    client: "Iberia Infrastructure Group",
    status: "On Hold" as MissionStatus,
    date: "28 Jun 2026",
  },
] as const;

export type SurveyOperationsView =
  | "dashboard"
  | "clients"
  | "assets"
  | "sites"
  | "missions"
  | "fleet"
  | "flight-logs";

export const surveyNavItems = [
  { label: "Dashboard", icon: "LayoutDashboard", view: "dashboard" as const, href: "/testflighthub" },
  { label: "Clients", icon: "Building2", view: "clients" as const, href: "/testflighthub" },
  { label: "Assets", icon: "Package", view: "assets" as const, href: "/testflighthub" },
  { label: "Sites", icon: "MapPin", view: "sites" as const, href: "/testflighthub" },
  { label: "Missions", icon: "Target", view: "missions" as const, href: "/testflighthub" },
  { label: "Fleet", icon: "Plane", view: "fleet" as const, href: "/testflighthub" },
  { label: "Live Telemetry", icon: "Radio", view: null, href: "/telemetry" },
  { label: "Flight Logs", icon: "ScrollText", view: "flight-logs" as const, href: "/testflighthub" },
] as const;

const surveyOperationsViews: SurveyOperationsView[] = [
  "dashboard",
  "clients",
  "assets",
  "sites",
  "missions",
  "fleet",
  "flight-logs",
];

export function isSurveyOperationsView(value: string | null): value is SurveyOperationsView {
  return surveyOperationsViews.includes(value as SurveyOperationsView);
}

export function getSurveyNavHref(view: SurveyOperationsView | null, href: string) {
  if (href === "/telemetry") {
    return href;
  }

  if (!view || view === "dashboard") {
    return "/testflighthub";
  }

  return `/testflighthub?view=${view}`;
}

export function isSurveyNavItemActive(
  pathname: string,
  item: (typeof surveyNavItems)[number],
  activeView?: SurveyOperationsView | null,
) {
  if (item.href === "/telemetry") {
    return pathname === "/telemetry";
  }

  if (pathname === "/testflighthub" && activeView != null) {
    return item.view === activeView;
  }

  return item.view === "dashboard" && pathname === "/testflighthub";
}

export const surveyViewTitles: Record<
  SurveyOperationsView,
  { title: string; subtitle: string }
> = {
  dashboard: { title: "Operations Dashboard", subtitle: "Survey Operations" },
  clients: { title: "Client Directory", subtitle: "Survey Operations" },
  assets: { title: "Asset Registry", subtitle: "Survey Operations" },
  sites: { title: "Site Registry", subtitle: "Survey Operations" },
  missions: { title: "Mission Management", subtitle: "Survey Operations" },
  fleet: { title: "Fleet Overview", subtitle: "Survey Operations" },
  "flight-logs": { title: "Flight Logs", subtitle: "Survey Operations" },
};
