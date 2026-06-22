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
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-4 shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
          Workspace
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl">Internal Operations</h2>
        <p className="mt-1 text-sm text-white/50">Barcelona · Porto · Oxford</p>
      </div>

      <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
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
            "group flex h-full min-h-[7.5rem] flex-col rounded-2xl border bg-gradient-to-br p-4 text-left shadow-[0_16px_48px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(0,0,0,0.45)] sm:min-h-[8.5rem] sm:p-5",
            tile.accent,
          );

          const content = (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#60a5fa] transition-colors group-hover:bg-white/[0.1]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-white">{tile.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-snug text-white/55">{tile.description}</p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40 transition-colors group-hover:text-sky-300">
                Open →
              </p>
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
