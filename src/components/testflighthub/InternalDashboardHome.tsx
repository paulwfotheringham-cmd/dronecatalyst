"use client";

import {
  internalHomeTileRows,
  type InternalHomeTile,
  type InternalOperationsView,
} from "@/lib/internal-operations-data";
import { cn } from "@/lib/utils";
import {
  Building2,
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
  "live-projects": FolderKanban,
  "recent-missions": History,
  messaging: MessageSquare,
  files: FolderOpen,
  users: Users,
  telemetry: Radio,
  webodm: Layers,
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
    "group flex h-full min-h-0 w-full min-w-0 flex-col rounded-xl border bg-gradient-to-br p-3 text-left shadow-[0_8px_24px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.36)] sm:rounded-2xl sm:p-3.5",
    tile.accent,
  );

  return (
    <button
      key={tile.id}
      type="button"
      onClick={() => onNavigate(tile.view)}
      className={className}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-[#60a5fa] transition-colors group-hover:bg-white/[0.1] sm:h-9 sm:w-9 sm:rounded-xl">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </div>
      <h3 className="mt-2.5 line-clamp-1 text-sm font-semibold leading-tight text-white">
        {tile.title}
      </h3>
      <p className="mt-1 line-clamp-2 flex-1 text-xs leading-snug text-white/50">
        {tile.description}
      </p>
    </button>
  );
}

export default function InternalDashboardHome({ onNavigate }: InternalDashboardHomeProps) {
  return (
    <section
      aria-label="Internal operations home"
      className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden"
    >
      <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-4 gap-2.5 sm:gap-3">
        {internalHomeTileRows.flatMap((row, rowIndex) =>
          row.map((tile, tileIndex) => (
            <div
              key={tile.id}
              className={cn(
                "min-h-0 min-w-0",
                row.length === 2 && tileIndex === 0 && "col-start-1",
                row.length === 2 && tileIndex === 1 && "col-start-2",
                rowIndex === 3 && "row-start-4",
              )}
            >
              {renderTile(tile, onNavigate)}
            </div>
          )),
        )}
      </div>
    </section>
  );
}
