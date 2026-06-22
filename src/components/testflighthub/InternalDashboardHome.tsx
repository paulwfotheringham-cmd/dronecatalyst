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
    "group flex h-full min-h-0 w-full min-w-0 flex-col rounded-xl border bg-gradient-to-br p-3 text-left shadow-[0_8px_24px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.36)]",
    tile.accent,
  );

  const content = (
    <>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-[#60a5fa] transition-colors group-hover:bg-white/[0.1]">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mt-2.5 line-clamp-1 text-[13px] font-semibold leading-tight text-white">
        {tile.title}
      </h3>
      <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-snug text-white/50">
        {tile.description}
      </p>
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
    <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
      <p className="mb-2 shrink-0 text-[10px] text-white/45">Barcelona · Porto · Oxford</p>

      <div className="flex min-h-0 flex-1 justify-start xl:justify-center">
        <div className="grid h-full w-full max-w-[36rem] min-w-0 grid-cols-3 grid-rows-4 gap-x-3 gap-y-2 sm:gap-x-3.5 sm:gap-y-2.5">
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
      </div>
    </section>
  );
}
