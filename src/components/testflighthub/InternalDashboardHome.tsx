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
  Package,
  Radio,
} from "lucide-react";

const tileIcons = {
  clients: Building2,
  assets: Package,
  testing: FlaskConical,
  "live-projects": FolderKanban,
  "recent-missions": History,
  telemetry: Radio,
} as const;

type InternalDashboardHomeProps = {
  onNavigate: (view: InternalOperationsView) => void;
};

export default function InternalDashboardHome({ onNavigate }: InternalDashboardHomeProps) {
  return (
    <section>
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
          Workspace
        </p>
        <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">Internal Operations</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/55">
          Barcelona · Porto · Oxford — select a module to manage clients, assets, simulator testing,
          and live field operations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                      : "telemetry";
          const Icon = tileIcons[iconKey];
          const className = cn(
            "group rounded-2xl border bg-gradient-to-br p-5 text-left shadow-[0_24px_64px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_28px_72px_rgba(0,0,0,0.45)]",
            tile.accent,
          );

          const content = (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#60a5fa] transition-colors group-hover:bg-white/[0.1]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{tile.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{tile.description}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 transition-colors group-hover:text-sky-300">
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
