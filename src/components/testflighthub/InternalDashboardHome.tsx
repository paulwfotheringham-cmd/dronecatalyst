"use client";

import Link from "next/link";

import {
  getInternalNavHref,
  internalHomeTiles,
  type InternalOperationsView,
} from "@/lib/internal-operations-data";
import { cn } from "@/lib/utils";
import {
  Building2,
  FlaskConical,
  FolderKanban,
  History,
  Layers,
  Package,
  Radio,
} from "lucide-react";

const tileIcons = {
  clients: Building2,
  assets: Package,
  testing: FlaskConical,
  "live-projects": FolderKanban,
  "recent-missions": History,
  webodm: Layers,
  telemetry: Radio,
} as const;

type InternalDashboardHomeProps = {
  onNavigate: (view: InternalOperationsView) => void;
};

export default function InternalDashboardHome({ onNavigate }: InternalDashboardHomeProps) {
  return (
    <section>
      <div className="mb-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
          Workspace
        </p>
        <h2 className="mt-0.5 text-base font-semibold text-white sm:text-lg">Internal Operations</h2>
        <p className="mt-1 text-xs text-white/50">
          Barcelona · Porto · Oxford
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
        {internalHomeTiles.map((tile) => {
          const iconKey =
            tile.view === "clients"
              ? "clients"
              : tile.view === "assets"
                ? "assets"
                : tile.view === "testing"
                  ? "testing"
                  : tile.view === "live-projects"
                    ? "live-projects"
                    : tile.view === "recent-missions"
                      ? "recent-missions"
                      : tile.view === "webodm"
                        ? "webodm"
                        : "telemetry";
          const Icon = tileIcons[iconKey];
          const className = cn(
            "group flex gap-2.5 rounded-xl border bg-gradient-to-br p-2.5 text-left shadow-[0_12px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] sm:p-3",
            tile.accent,
          );

          const content = (
            <>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-[#60a5fa] transition-colors group-hover:bg-white/[0.1]">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold leading-tight text-white">{tile.title}</h3>
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/50">
                  {tile.description}
                </p>
                <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35 transition-colors group-hover:text-sky-300">
                  Open →
                </p>
              </div>
            </>
          );

          if (tile.view) {
            return (
              <button key={tile.title} type="button" onClick={() => onNavigate(tile.view)} className={className}>
                {content}
              </button>
            );
          }

          return (
            <Link
              key={tile.title}
              href={getInternalNavHref(null, tile.href)}
              className={className}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
