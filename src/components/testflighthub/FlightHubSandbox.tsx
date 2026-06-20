"use client";

import { useCallback, useEffect, useState } from "react";

const DRONE_ID = "DC-TEST-001";

type Telemetry = {
  droneId: string;
  status: "IN FLIGHT" | "STOPPED";
  latitude: number;
  longitude: number;
  altitudeFt: number;
  speedMph: number;
  batteryPct: number;
  lastUpdated: Date;
};

function createInitialTelemetry(): Telemetry {
  return {
    droneId: DRONE_ID,
    status: "IN FLIGHT",
    latitude: 31.9523,
    longitude: 115.8613,
    altitudeFt: 285,
    speedMph: 24.6,
    batteryPct: 94.2,
    lastUpdated: new Date(),
  };
}

function jitterTelemetry(prev: Telemetry): Telemetry {
  const latDelta = (Math.random() - 0.5) * 0.0004;
  const lngDelta = (Math.random() - 0.5) * 0.0004;
  const altDelta = (Math.random() - 0.5) * 8;
  const speedDelta = (Math.random() - 0.5) * 4;

  return {
    ...prev,
    latitude: prev.latitude + latDelta,
    longitude: prev.longitude + lngDelta,
    altitudeFt: Math.max(120, Math.min(400, prev.altitudeFt + altDelta)),
    speedMph: Math.max(8, Math.min(42, prev.speedMph + speedDelta)),
    batteryPct: Math.max(0, prev.batteryPct - 0.15 - Math.random() * 0.2),
    lastUpdated: new Date(),
  };
}

function formatCoord(value: number, decimals: number) {
  return value.toFixed(decimals);
}

function formatTimestamp(date: Date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function TelemetryField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

export default function FlightHubSandbox() {
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const startSimulation = useCallback(() => {
    setTelemetry(createInitialTelemetry());
    setIsRunning(true);
  }, []);

  const stopSimulation = useCallback(() => {
    setIsRunning(false);
    setTelemetry((prev) =>
      prev ? { ...prev, status: "STOPPED", lastUpdated: new Date() } : prev,
    );
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => (prev ? jitterTelemetry(prev) : prev));
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <section className="mt-10 rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Mock FlightHub Data</h2>
        {telemetry && (
          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              telemetry.status === "IN FLIGHT"
                ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                : "border-white/20 bg-white/10 text-white/60"
            }`}
          >
            {telemetry.status === "IN FLIGHT" ? "IN FLIGHT" : "STOPPED"}
          </span>
        )}
      </div>

      {!telemetry ? (
        <>
          <p className="mt-4 text-base text-white/60">No telemetry received yet.</p>
          <button
            type="button"
            onClick={startSimulation}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#2563eb] px-5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(37,99,235,0.35)] transition-colors hover:bg-[#1d4ed8]"
          >
            Generate Test Drone
          </button>
        </>
      ) : (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <TelemetryField label="Drone ID" value={telemetry.droneId} />
            <TelemetryField label="Status" value={telemetry.status} />
            <TelemetryField
              label="Latitude"
              value={formatCoord(telemetry.latitude, 6)}
            />
            <TelemetryField
              label="Longitude"
              value={formatCoord(telemetry.longitude, 6)}
            />
            <TelemetryField
              label="Altitude (ft)"
              value={telemetry.altitudeFt.toFixed(1)}
            />
            <TelemetryField
              label="Speed (mph)"
              value={telemetry.speedMph.toFixed(1)}
            />
            <TelemetryField
              label="Battery (%)"
              value={telemetry.batteryPct.toFixed(1)}
            />
            <TelemetryField
              label="Last Updated"
              value={formatTimestamp(telemetry.lastUpdated)}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {isRunning ? (
              <button
                type="button"
                onClick={stopSimulation}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-red-500/40 bg-red-500/15 px-5 text-sm font-semibold text-red-300 transition-colors hover:border-red-400/60 hover:bg-red-500/25"
              >
                Stop Simulation
              </button>
            ) : (
              <button
                type="button"
                onClick={startSimulation}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2563eb] px-5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(37,99,235,0.35)] transition-colors hover:bg-[#1d4ed8]"
              >
                Generate Test Drone
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
