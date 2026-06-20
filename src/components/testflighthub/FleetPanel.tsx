import { DRONE_ID, type Telemetry } from "@/lib/telemetry";
import {
  fleetDrones,
  type FleetDroneStatus,
} from "@/lib/survey-operations-mock-data";

type FleetPanelProps = {
  liveTelemetry: Telemetry | null;
  isRunning: boolean;
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
    if (drone.id !== DRONE_ID || !liveTelemetry) {
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

export default function FleetPanel({ liveTelemetry, isRunning }: FleetPanelProps) {
  const drones = buildFleetRows(liveTelemetry, isRunning);

  return (
    <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Fleet</h2>
        <span className="text-xs text-white/45">{drones.length} assets</span>
      </div>

      <div className="mt-4 space-y-3">
        {drones.map((drone) => (
          <div
            key={drone.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-sm font-semibold text-white">{drone.id}</p>
                <p className="mt-1 text-xs text-white/45">Last contact · {drone.lastContact}</p>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${fleetStatusClass(drone.status)}`}
              >
                {drone.status}
              </span>
            </div>
            <div className="mt-3">
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
