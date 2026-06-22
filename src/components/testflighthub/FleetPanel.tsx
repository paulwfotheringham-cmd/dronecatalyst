import { DRONE_ID, type Telemetry } from "@/lib/telemetry";
import {
  fleetDrones,
  type FleetDroneStatus,
} from "@/lib/survey-operations-mock-data";
import { cn } from "@/lib/utils";

type FleetPanelProps = {
  liveTelemetry: Telemetry | null;
  isRunning: boolean;
  onOpenAssets?: () => void;
  compact?: boolean;
};

function fleetStatusClass(status: FleetDroneStatus | string) {
  switch (status) {
    case "In Flight":
      return "border-emerald-400/40 bg-emerald-500/15 text-emerald-300";
    case "Standby":
      return "border-sky-400/40 bg-sky-500/15 text-sky-300";
    case "Stopped":
      return "border-white/20 bg-white/10 text-white/60";
    case "Maintenance":
      return "border-amber-400/40 bg-amber-500/15 text-amber-200";
    case "In Hangar":
      return "border-violet-400/40 bg-violet-500/15 text-violet-200";
    default:
      return "border-white/15 bg-white/5 text-white/50";
  }
}

function formatLastContact(date: Date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function buildFleetRows(liveTelemetry: Telemetry | null, isRunning: boolean) {
  return fleetDrones.map((drone) => {
    const linkedId = drone.telemetryDroneId ?? drone.id;
    if (linkedId !== DRONE_ID || !liveTelemetry) {
      return drone;
    }

    const status: FleetDroneStatus = isRunning
      ? "In Flight"
      : liveTelemetry.status === "IN FLIGHT"
        ? "In Flight"
        : "Stopped";

    return {
      ...drone,
      status,
      battery: Math.round(liveTelemetry.batteryPct),
      lastContact: isRunning ? "Live" : formatLastContact(liveTelemetry.lastUpdated),
    };
  });
}

export default function FleetPanel({
  liveTelemetry,
  isRunning,
  onOpenAssets,
  compact = false,
}: FleetPanelProps) {
  const drones = buildFleetRows(liveTelemetry, isRunning);

  return (
    <section
      className={cn(
        "flex h-full flex-col rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl",
        compact ? "p-4" : "p-6",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className={cn("font-semibold text-white", compact ? "text-base" : "text-lg")}>
            Fleet
          </h2>
          <p className="mt-0.5 text-xs text-white/45">3 virtual Matrice 4T assets</p>
        </div>
        <div className="flex items-center gap-2">
          {onOpenAssets && (
            <button
              type="button"
              onClick={onOpenAssets}
              className="inline-flex h-9 items-center rounded-xl border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08]"
            >
              Assets
            </button>
          )}
          <span className="text-xs text-white/45">{drones.length} airframes</span>
        </div>
      </div>

      <div className={cn("flex min-h-0 flex-1 flex-col space-y-3", compact ? "mt-3" : "mt-4")}>
        {drones.map((drone) => (
          <div
            key={drone.id}
            className={cn(
              "rounded-xl border border-white/10 bg-white/[0.03]",
              compact ? "px-3 py-2.5" : "px-4 py-3",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-sm font-semibold text-white">{drone.id}</p>
                <p className="mt-0.5 text-xs text-white/55">{drone.model}</p>
                {!compact && (
                  <p className="mt-0.5 text-xs text-white/45">
                    Based in {drone.homeBase} · Last contact {drone.lastContact}
                  </p>
                )}
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${fleetStatusClass(drone.status)}`}
              >
                {drone.status}
              </span>
            </div>
            <div className={cn(compact ? "mt-2" : "mt-3")}>
              <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-white/45">
                <span>Battery</span>
                <span className="font-mono text-white/70">{drone.battery}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-500"
                  style={{ width: `${Math.max(0, Math.min(100, drone.battery))}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
