"use client";

import {
  internalHomeTileRows,
  type InternalHomeTile,
  type InternalOperationsView,
} from "@/lib/internal-operations-data";
import { cn } from "@/lib/utils";
import {
  Building2,
  Compass,
  ContactRound,
  FlaskConical,
  FolderKanban,
  FolderOpen,
  History,
  Layers,
  MessageSquare,
  Package,
  Radio,
  Users,
} from "lucide-react";

const tileIcons = {
  clients: Building2,
  crm: ContactRound,
  assets: Package,
  testing: FlaskConical,
  projects: FolderKanban,
  "recent-missions": History,
  messaging: MessageSquare,
  files: FolderOpen,
  users: Users,
  telemetry: Radio,
  webodm: Layers,
  strategy: Compass,
} as const;

type InternalDashboardHomeProps = {
  onNavigate: (view: InternalOperationsView) => void;
};

function renderTile(
  tile: InternalHomeTile,
  onNavigate: (view: InternalOperationsView) => void,
) {
  const Icon = tileIcons[tile.icon];
  const className = cn(
    "group flex w-full min-w-0 flex-col rounded-xl border bg-gradient-to-br p-3.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.36)] sm:rounded-2xl sm:p-4 2xl:min-h-0 2xl:h-full 2xl:p-5",
    "min-h-[8.75rem] sm:min-h-[9.25rem]",
    tile.accent,
  );

  return (
    <button
      key={tile.id}
      type="button"
      onClick={() => onNavigate(tile.view)}
      className={className}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-[#60a5fa] transition-colors group-hover:bg-white/[0.1] sm:h-9 sm:w-9 sm:rounded-xl 2xl:h-10 2xl:w-10">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 2xl:h-[18px] 2xl:w-[18px]" />
      </div>
      <h3 className="mt-2.5 line-clamp-1 text-base font-semibold leading-tight text-white sm:mt-3 sm:text-lg 2xl:text-[22px]">
        {tile.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/55 sm:mt-2 sm:text-[0.9375rem] sm:leading-relaxed 2xl:text-lg">
        {tile.description}
      </p>
    </button>
  );
}

const homeTiles = internalHomeTileRows.flat();

export default function InternalDashboardHome({ onNavigate }: InternalDashboardHomeProps) {
  return (
    <section
      aria-label="Internal operations home"
      className="min-w-0 2xl:flex 2xl:min-h-0 2xl:flex-1 2xl:flex-col 2xl:overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-3 p-1 pb-4 sm:grid-cols-2 sm:gap-3.5 sm:p-2 xl:grid-cols-3 xl:gap-4 2xl:min-h-0 2xl:flex-1 2xl:grid-rows-4 2xl:overflow-hidden 2xl:pb-0">
        {homeTiles.map((tile) => (
          <div key={tile.id} className="min-w-0 2xl:min-h-0">
            {renderTile(tile, onNavigate)}
          </div>
        ))}
      </div>
    </section>
  );
}
