"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";

const FlightPathMap = dynamic(() => import("./FlightPathMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] items-center justify-center rounded-xl border border-white/10 bg-[#0f172a] text-sm text-white/50">
      Loading map...
    </div>
  ),
});

const DRONE_ID = "DC-TEST-001";

type LatLng = [number, number];

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

function toLatLng(telemetry: Telemetry): LatLng {
  return [telemetry.latitude, telemetry.longitude];
}

function haversineFeet([lat1, lon1]: LatLng, [lat2, lon2]: LatLng) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const earthRadiusFt = 20902231;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadiusFt * Math.asin(Math.sqrt(a));
}

function calculateDistanceFeet(path: LatLng[]) {
  if (path.length < 2) return 0;
  return path.slice(1).reduce((total, point, index) => {
    return total + haversineFeet(path[index], point);
  }, 0);
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
  const [flightHistory, setFlightHistory] = useState<LatLng[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const totalPoints = flightHistory.length;
  const distanceFeet = useMemo(() => calculateDistanceFeet(flightHistory), [flightHistory]);

  const startSimulation = useCallback(() => {
    const initial = createInitialTelemetry();
    setTelemetry(initial);
    setFlightHistory([toLatLng(initial)]);
    setIsRunning(true);
  }, []);

  const stopSimulation = useCallback(() => {
    setIsRunning(false);
    setTelemetry((prev) =>
      prev ? { ...prev, status: "STOPPED", lastUpdated: new Date() } : prev,
    );
  }, []);

  const resetFlight = useCallback(() => {
    setTelemetry(null);
    setFlightHistory([]);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        if (!prev) return prev;
        const next = jitterTelemetry(prev);
        setFlightHistory((history) => [...history, toLatLng(next)]);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <>
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
              <TelemetryField label="Latitude" value={formatCoord(telemetry.latitude, 6)} />
              <TelemetryField label="Longitude" value={formatCoord(telemetry.longitude, 6)} />
              <TelemetryField label="Altitude (ft)" value={telemetry.altitudeFt.toFixed(1)} />
              <TelemetryField label="Speed (mph)" value={telemetry.speedMph.toFixed(1)} />
              <TelemetryField label="Battery (%)" value={telemetry.batteryPct.toFixed(1)} />
              <TelemetryField label="Last Updated" value={formatTimestamp(telemetry.lastUpdated)} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {isRunning && (
                <button
                  type="button"
                  onClick={stopSimulation}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-red-500/40 bg-red-500/15 px-5 text-sm font-semibold text-red-300 transition-colors hover:border-red-400/60 hover:bg-red-500/25"
                >
                  Stop Simulation
                </button>
              )}
              <button
                type="button"
                onClick={resetFlight}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08]"
              >
                Reset Flight
              </button>
            </div>
          </>
        )}
      </section>

      {telemetry && (
        <section className="mt-6 rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Flight Path Map</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <p className="text-white/60">
                Total Points Collected:{" "}
                <span className="font-mono font-semibold text-white">{totalPoints}</span>
              </p>
              <p className="text-white/60">
                Distance Traveled (ft):{" "}
                <span className="font-mono font-semibold text-white">
                  {distanceFeet.toFixed(1)}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-4">
            <FlightPathMap position={toLatLng(telemetry)} path={flightHistory} />
          </div>
        </section>
      )}
    </>
  );
}
