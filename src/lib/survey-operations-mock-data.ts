export type MissionStatus = "Active" | "Scheduled" | "Completed" | "On Hold";

export type FleetDroneStatus =
  | "In Flight"
  | "Standby"
  | "In Hangar"
  | "Maintenance"
  | "Stopped";

export const activeMission = {
  name: "Kalgoorlie North Topographic Survey",
  client: "Mineral Ridge Resources",
  site: "Kalgoorlie North Expansion Zone · WA",
  assignedDrone: "DC-TEST-001",
  pilot: "Sarah Chen · RPAS Lead",
  status: "Active" as MissionStatus,
  startDate: "17 Jun 2026",
  endDate: "21 Jun 2026",
};

export const fleetDrones = [
  {
    id: "DC-TEST-001",
    status: "Standby" as FleetDroneStatus,
    battery: 96,
    lastContact: "Awaiting link",
  },
  {
    id: "DC-SRV-014",
    status: "In Hangar" as FleetDroneStatus,
    battery: 100,
    lastContact: "18 min ago",
  },
  {
    id: "DC-SRV-022",
    status: "Standby" as FleetDroneStatus,
    battery: 87,
    lastContact: "6 min ago",
  },
  {
    id: "DC-SRV-031",
    status: "Maintenance" as FleetDroneStatus,
    battery: 42,
    lastContact: "2 hr ago",
  },
  {
    id: "DC-SRV-008",
    status: "In Hangar" as FleetDroneStatus,
    battery: 100,
    lastContact: "41 min ago",
  },
] as const;

export const recentMissions = [
  {
    name: "Port Hedland Stockpile Volumetrics",
    client: "Iron Coast Logistics",
    status: "Completed" as MissionStatus,
    date: "12 Jun 2026",
  },
  {
    name: "Kalgoorlie North Topographic Survey",
    client: "Mineral Ridge Resources",
    status: "Active" as MissionStatus,
    date: "17 Jun 2026",
  },
  {
    name: "Perth CBD Facade Inspection",
    client: "Harbourline Property Group",
    status: "Scheduled" as MissionStatus,
    date: "22 Jun 2026",
  },
  {
    name: "Esperance Coastal Erosion Mapping",
    client: "Southern Coast Authority",
    status: "On Hold" as MissionStatus,
    date: "28 Jun 2026",
  },
] as const;

export type SurveyOperationsView =
  | "dashboard"
  | "clients"
  | "sites"
  | "missions"
  | "fleet"
  | "flight-logs";

export const surveyNavItems = [
  { label: "Dashboard", icon: "LayoutDashboard", view: "dashboard" as const, href: "/testflighthub" },
  { label: "Clients", icon: "Building2", view: "clients" as const, href: "/testflighthub" },
  { label: "Sites", icon: "MapPin", view: "sites" as const, href: "/testflighthub" },
  { label: "Missions", icon: "Target", view: "missions" as const, href: "/testflighthub" },
  { label: "Fleet", icon: "Plane", view: "fleet" as const, href: "/testflighthub" },
  { label: "Live Telemetry", icon: "Radio", view: null, href: "/telemetry" },
  { label: "Flight Logs", icon: "ScrollText", view: "flight-logs" as const, href: "/testflighthub" },
] as const;

const surveyOperationsViews: SurveyOperationsView[] = [
  "dashboard",
  "clients",
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
  sites: { title: "Site Registry", subtitle: "Survey Operations" },
  missions: { title: "Mission Management", subtitle: "Survey Operations" },
  fleet: { title: "Fleet Overview", subtitle: "Survey Operations" },
  "flight-logs": { title: "Flight Logs", subtitle: "Survey Operations" },
};
