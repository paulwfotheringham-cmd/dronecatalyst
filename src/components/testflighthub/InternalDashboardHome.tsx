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
    "group flex h-full min-h-0 flex-col rounded-xl border bg-gradient-to-br p-3 text-left shadow-[0_12px_36px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(0,0,0,0.42)] sm:rounded-2xl sm:p-3.5",
    tile.accent,
  );

  const content = (
    <>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-[#60a5fa] transition-colors group-hover:bg-white/[0.1] sm:h-9 sm:w-9 sm:rounded-xl">
        <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </div>
      <h3 className="mt-2 text-sm font-semibold text-white sm:text-[15px]">{tile.title}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-snug text-white/55 sm:text-xs">
        {tile.description}
      </p>
      <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40 transition-colors group-hover:text-sky-300 sm:text-[10px]">
        Open →
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
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-2 shrink-0 sm:mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
          Workspace
        </p>
        <h2 className="mt-0.5 text-base font-semibold text-white sm:text-lg">Internal Operations</h2>
        <p className="mt-0.5 text-xs text-white/50 sm:text-sm">Barcelona · Porto · Oxford</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 sm:gap-2.5">
        {internalHomeTileRows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={cn(
              "grid min-h-0 flex-1 gap-2 sm:gap-2.5",
              row.length === 3 ? "grid-cols-3" : "mx-auto w-full max-w-[calc(66.666%-0.25rem)] grid-cols-2",
            )}
          >
            {row.map((tile) => renderTile(tile, onNavigate))}
          </div>
        ))}
      </div>
    </section>
  );
}
