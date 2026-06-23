import type { InternalNavItem, InternalOperationsView } from "@/lib/internal-operations-data";

export type HomeModuleMeta = {
  description: string;
  accent: string;
  icon: string;
};

export const homeModuleMeta: Partial<Record<InternalOperationsView, HomeModuleMeta>> = {
  clients: {
    description: "Accounts, contracts, and contacts.",
    accent: "border-sky-400/25 bg-sky-500/[0.07] hover:border-sky-400/45",
    icon: "Building2",
  },
  crm: {
    description: "Lead pipeline and next actions.",
    accent: "border-indigo-400/25 bg-indigo-500/[0.07] hover:border-indigo-400/45",
    icon: "ContactRound",
  },
  projects: {
    description: "Live and upcoming mobilisations.",
    accent: "border-amber-400/25 bg-amber-500/[0.07] hover:border-amber-400/45",
    icon: "FolderKanban",
  },
  "recent-missions": {
    description: "Mission history by region.",
    accent: "border-cyan-400/25 bg-cyan-500/[0.07] hover:border-cyan-400/45",
    icon: "History",
  },
  financials: {
    description: "Revenue, pipeline, and P&L.",
    accent: "border-emerald-400/25 bg-emerald-500/[0.07] hover:border-emerald-400/45",
    icon: "Wallet",
  },
  assets: {
    description: "Matrice 4T fleet registry.",
    accent: "border-violet-400/25 bg-violet-500/[0.07] hover:border-violet-400/45",
    icon: "Package",
  },
  fleet: {
    description: "Operator assignments and maps.",
    accent: "border-blue-400/25 bg-blue-500/[0.07] hover:border-blue-400/45",
    icon: "Plane",
  },
  files: {
    description: "Shared document repository.",
    accent: "border-slate-400/25 bg-slate-500/[0.07] hover:border-slate-400/45",
    icon: "FolderOpen",
  },
  calendar: {
    description: "Meetings and onsite visits.",
    accent: "border-sky-400/25 bg-sky-500/[0.07] hover:border-sky-400/45",
    icon: "CalendarDays",
  },
  "info-email": {
    description: "Shared info@ inbox.",
    accent: "border-teal-400/25 bg-teal-500/[0.07] hover:border-teal-400/45",
    icon: "Mail",
  },
  messaging: {
    description: "Internal operator channels.",
    accent: "border-blue-400/25 bg-blue-500/[0.07] hover:border-blue-400/45",
    icon: "MessageSquare",
  },
  strategy: {
    description: "Capability matrix and priorities.",
    accent: "border-teal-400/25 bg-teal-500/[0.07] hover:border-teal-400/45",
    icon: "Compass",
  },
  competitors: {
    description: "Market intelligence by region.",
    accent: "border-orange-400/25 bg-orange-500/[0.07] hover:border-orange-400/45",
    icon: "Binoculars",
  },
  whiteboard: {
    description: "Collaborative planning boards.",
    accent: "border-fuchsia-400/25 bg-fuchsia-500/[0.07] hover:border-fuchsia-400/45",
    icon: "PenLine",
  },
  "media-example": {
    description: "Deliverable media samples.",
    accent: "border-rose-400/25 bg-rose-500/[0.07] hover:border-rose-400/45",
    icon: "Film",
  },
  testing: {
    description: "FlightHub simulator lab.",
    accent: "border-emerald-400/25 bg-emerald-500/[0.07] hover:border-emerald-400/45",
    icon: "FlaskConical",
  },
  webodm: {
    description: "Orthophotos and 3D models.",
    accent: "border-purple-400/25 bg-purple-500/[0.07] hover:border-purple-400/45",
    icon: "Layers",
  },
  telemetry: {
    description: "Live drone OSD feed.",
    accent: "border-rose-400/25 bg-rose-500/[0.07] hover:border-rose-400/45",
    icon: "Radio",
  },
  users: {
    description: "Operator roster and roles.",
    accent: "border-orange-400/25 bg-orange-500/[0.07] hover:border-orange-400/45",
    icon: "Users",
  },
};

export const homeKpis = [
  { label: "Live projects", value: "3", hint: "Field mobilisations" },
  { label: "Monthly revenue", value: "€186k", hint: "Recognised June" },
  { label: "Pipeline", value: "€1.24M", hint: "Signed + forecast" },
  { label: "Operators online", value: "3", hint: "Barcelona · Oxford · Porto" },
] as const;

export function getHomeModule(item: InternalNavItem) {
  const meta = homeModuleMeta[item.view];
  if (!meta) return null;
  return { ...item, ...meta };
}
