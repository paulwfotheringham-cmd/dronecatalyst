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

export const surveyNavItems = [
  { label: "Dashboard", icon: "LayoutDashboard", href: "/testflighthub" },
  { label: "Clients", icon: "Building2", href: "/testflighthub" },
  { label: "Sites", icon: "MapPin", href: "/testflighthub" },
  { label: "Missions", icon: "Target", href: "/testflighthub" },
  { label: "Fleet", icon: "Plane", href: "/testflighthub" },
  { label: "Live Telemetry", icon: "Radio", href: "/telemetry" },
  { label: "Flight Logs", icon: "ScrollText", href: "/testflighthub" },
] as const;

export function isSurveyNavItemActive(pathname: string, label: string, href: string) {
  if (href === "/telemetry") {
    return pathname === "/telemetry";
  }

  if (label === "Dashboard") {
    return pathname === "/testflighthub";
  }

  return false;
}
