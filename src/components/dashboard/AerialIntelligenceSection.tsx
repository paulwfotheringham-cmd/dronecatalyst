"use client";

import { useEffect, useState } from "react";

import SectionHeader from "@/components/dashboard/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  BRIGHTON_BEACH_TASK_NAME,
  type WebODMDeliverable,
  type WebODMDeliverablesMission,
} from "@/lib/webodm-deliverables";
import { cn } from "@/lib/utils";
import {
  Box,
  Cloud,
  Download,
  Eye,
  FileText,
  Layers,
  Loader2,
  Mountain,
} from "lucide-react";

type DeliverablesResponse = {
  configured: boolean;
  error?: string;
  mission: WebODMDeliverablesMission | null;
  deliverables: WebODMDeliverable[];
};

function deliverableIcon(asset: string) {
  switch (asset) {
    case "orthophoto.tif":
      return Layers;
    case "georeferenced_model.laz":
      return Cloud;
    case "dsm.tif":
      return Mountain;
    case "textured_model.glb":
      return Box;
    case "report.pdf":
      return FileText;
    default:
      return FileText;
  }
}

function deliverableAccent(asset: string) {
  switch (asset) {
    case "orthophoto.tif":
      return "border-sky-400/20 bg-sky-500/[0.08] text-sky-300";
    case "georeferenced_model.laz":
      return "border-violet-400/20 bg-violet-500/[0.08] text-violet-300";
    case "dsm.tif":
      return "border-emerald-400/20 bg-emerald-500/[0.08] text-emerald-300";
    case "textured_model.glb":
      return "border-amber-400/20 bg-amber-500/[0.08] text-amber-300";
    case "report.pdf":
      return "border-red-400/20 bg-red-500/[0.08] text-red-300";
    default:
      return "border-white/10 bg-white/[0.06] text-white/60";
  }
}

function formatMissionDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AerialIntelligenceSection() {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<DeliverablesResponse | null>(null);
  const [viewerNotice, setViewerNotice] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDeliverables() {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/webodm/deliverables?task=${encodeURIComponent(BRIGHTON_BEACH_TASK_NAME)}`,
          { cache: "no-store" },
        );
        const data = (await res.json()) as DeliverablesResponse;

        if (!cancelled) {
          setResponse(data);
        }
      } catch {
        if (!cancelled) {
          setResponse({
            configured: false,
            error: "Could not reach the deliverables API.",
            mission: null,
            deliverables: [],
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadDeliverables();

    return () => {
      cancelled = true;
    };
  }, []);

  const mission = response?.mission;
  const deliverables = response?.deliverables ?? [];

  return (
    <section className="space-y-6" aria-label="Aerial intelligence deliverables">
      <div className="rounded-2xl border border-white/[0.07] bg-[#0D1B2A]/80 px-4 py-4 shadow-[0_20px_48px_rgba(0,0,0,0.28)] sm:px-6 sm:py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
          Mission deliverables
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">Aerial Intelligence</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/50">
          Survey outputs from WebODM for the completed Brighton Beach Road capture. Only
          deliverables that exist for this mission are shown below.
        </p>

        {loading ? (
          <div className="mt-5 flex items-center gap-2 text-sm text-white/50">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading deliverables from WebODM…
          </div>
        ) : response?.error ? (
          <p className="mt-5 rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {response.error}
          </p>
        ) : mission ? (
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/35">
                Mission
              </dt>
              <dd className="mt-1 font-medium text-white/85">{mission.name}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/35">
                Status
              </dt>
              <dd className="mt-1 text-white/70">{mission.statusLabel}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/35">
                Images
              </dt>
              <dd className="mt-1 text-white/70">{mission.imagesCount ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/35">
                Processed
              </dt>
              <dd className="mt-1 text-white/70">{formatMissionDate(mission.createdAt)}</dd>
            </div>
          </dl>
        ) : null}
      </div>

      {viewerNotice ? (
        <p className="rounded-xl border border-sky-400/25 bg-sky-500/10 px-3 py-2 text-sm text-sky-100">
          {viewerNotice}
        </p>
      ) : null}

      {!loading && !response?.error ? (
        <div className="space-y-5">
          <SectionHeader
            title="Deliverables"
            description="Ready-to-review aerial surveying outputs for this mission"
          />

          {deliverables.length === 0 ? (
            <p className="text-sm text-white/45">No deliverables are available for this mission.</p>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {deliverables.map((item) => {
                const Icon = deliverableIcon(item.asset);

                return (
                  <article
                    key={item.asset}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0D1B2A] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition-colors hover:border-white/[0.12]"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="relative flex gap-4">
                      <div
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                          deliverableAccent(item.asset),
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-white/90">{item.name}</h3>
                          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-300">
                            Ready
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-white/45">
                          {item.description}
                        </p>

                        <dl className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <dt className="text-white/30">File type</dt>
                            <dd className="mt-0.5 font-medium text-white/70">{item.fileType}</dd>
                          </div>
                          <div>
                            <dt className="text-white/30">File size</dt>
                            <dd className="mt-0.5 font-medium text-white/70">{item.sizeLabel}</dd>
                          </div>
                        </dl>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 rounded-xl text-xs"
                            onClick={() =>
                              setViewerNotice(`Viewer coming soon for ${item.name}.`)
                            }
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Open
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 rounded-xl text-xs"
                            disabled
                            title="Download coming soon"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
