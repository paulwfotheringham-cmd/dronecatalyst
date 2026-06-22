"use client";

import Link from "next/link";

import {
  getInternalNavHref,
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
    "group flex h-full min-h-0 items-center gap-2.5 rounded-xl border bg-gradient-to-br p-2.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all hover:-translate-y-px hover:shadow-[0_12px_32px_rgba(0,0,0,0.36)] sm:gap-3 sm:p-3",
    tile.accent,
  );

  const content = (
    <>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-[#60a5fa] transition-colors group-hover:bg-white/[0.1]">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[13px] font-semibold leading-tight text-white">{tile.title}</h3>
        <p className="mt-0.5 truncate text-[11px] leading-snug text-white/50">{tile.description}</p>
      </div>
    </>
  );

  if (tile.view) {
    return (
      <button
        key={tile.id}
        type="button"
        onClick={() => onNavigate(tile.view)}
        className={className}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      key={tile.id}
      href={getInternalNavHref(null, "href" in tile ? tile.href : undefined)}
      className={className}
    >
      {content}
    </Link>
  );
}

export default function InternalDashboardHome({ onNavigate }: InternalDashboardHomeProps) {
  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden">
      <p className="mb-2 shrink-0 text-xs text-white/45">Barcelona · Porto · Oxford</p>

      <div className="grid min-h-0 flex-1 grid-rows-4 gap-2 sm:gap-2.5">
        {internalHomeTileRows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={cn(
              "grid min-h-0 gap-2 sm:gap-2.5",
              row.length === 3 ? "grid-cols-3" : "grid-cols-3",
            )}
          >
            {row.map((tile, tileIndex) => (
              <div
                key={tile.id}
                className={cn(
                  "min-h-0",
                  row.length === 2 && tileIndex === 0 && "col-start-1",
                  row.length === 2 && tileIndex === 1 && "col-start-2",
                )}
              >
                {renderTile(tile, onNavigate)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
