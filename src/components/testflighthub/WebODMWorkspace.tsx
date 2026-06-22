import { WEBODM_DASHBOARD_URL } from "@/lib/webodm-config";
import { ExternalLink, Layers, Map, Sparkles } from "lucide-react";

export default function WebODMWorkspace() {
  return (
    <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
            Photogrammetry
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">WebODM Processing</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/55">
            Orthophotos, point clouds, and 3D models from survey imagery. Connected to your local
            WebODM instance for now — FlightHub simulation uploads will plug in here next.
          </p>
        </div>
        <a
          href={WEBODM_DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#2563eb] px-5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(37,99,235,0.35)] transition-colors hover:bg-[#1d4ed8]"
        >
          Open WebODM
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <Layers className="h-5 w-5 text-sky-400" />
          <h3 className="mt-3 font-semibold text-white">2D Orthophotos</h3>
          <p className="mt-2 text-sm text-white/50">
            Georeferenced survey maps from overlapping nadir imagery.
          </p>
        </article>
        <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <Map className="h-5 w-5 text-emerald-400" />
          <h3 className="mt-3 font-semibold text-white">Point Clouds</h3>
          <p className="mt-2 text-sm text-white/50">
            Dense 3D point data for volume and terrain analysis.
          </p>
        </article>
        <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <Sparkles className="h-5 w-5 text-violet-400" />
          <h3 className="mt-3 font-semibold text-white">3D Models</h3>
          <p className="mt-2 text-sm text-white/50">
            Textured meshes for client deliverables and visual QA.
          </p>
        </article>
      </div>

      <div className="mt-8 rounded-xl border border-amber-400/25 bg-amber-500/10 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200">
          Coming next
        </p>
        <ul className="mt-3 space-y-2 text-sm text-white/60">
          <li>Simulated FlightHub 2 mission imagery pushed to WebODM after test flights</li>
          <li>Processing status and deliverables linked to Live Projects and client records</li>
          <li>Hosted WebODM endpoint for production (replace localhost in env config)</li>
        </ul>
        <p className="mt-4 font-mono text-xs text-white/40">
          NEXT_PUBLIC_WEBODM_URL={WEBODM_DASHBOARD_URL}
        </p>
      </div>
    </section>
  );
}
