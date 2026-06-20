"use client";

import { useCallback, useEffect, useState } from "react";

import type { TelemetryRow } from "@/lib/telemetry";

type DbStatus = "loading" | "connected" | "unconfigured" | "error";

type TelemetryFeedResponse = {
  status: DbStatus;
  records: TelemetryRow[];
  total: number;
  error?: string;
};

const REFRESH_INTERVAL_MS = 10_000;

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatNumber(value: number | null, decimals = 2) {
  if (value === null || Number.isNaN(value)) return "—";
  return value.toFixed(decimals);
}

function statusBadgeClass(status: string | null) {
  if (status === "IN FLIGHT") {
    return "border-emerald-400/40 bg-emerald-500/15 text-emerald-300";
  }
  if (status === "STOPPED") {
    return "border-white/20 bg-white/10 text-white/60";
  }
  return "border-white/15 bg-white/5 text-white/50";
}

function dbStatusMeta(status: DbStatus) {
  switch (status) {
    case "connected":
      return {
        label: "Database connected",
        dotClass: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]",
        badgeClass: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
      };
    case "unconfigured":
      return {
        label: "Database not configured",
        dotClass: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]",
        badgeClass: "border-amber-400/30 bg-amber-500/10 text-amber-100",
      };
    case "error":
      return {
        label: "Database error",
        dotClass: "bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]",
        badgeClass: "border-red-400/30 bg-red-500/10 text-red-200",
      };
    default:
      return {
        label: "Connecting to database...",
        dotClass: "bg-sky-400 animate-pulse shadow-[0_0_12px_rgba(56,189,248,0.8)]",
        badgeClass: "border-sky-400/30 bg-sky-500/10 text-sky-100",
      };
  }
}

async function fetchTelemetryFeed(): Promise<TelemetryFeedResponse> {
  const response = await fetch("/api/telemetry/records?limit=50", { cache: "no-store" });
  const payload = (await response.json()) as TelemetryFeedResponse & { error?: string };

  if (response.status === 503) {
    return {
      status: "unconfigured",
      records: [],
      total: 0,
      error: payload.error,
    };
  }

  if (!response.ok) {
    return {
      status: "error",
      records: [],
      total: 0,
      error: payload.error ?? "Failed to load telemetry records",
    };
  }

  return {
    status: "connected",
    records: payload.records ?? [],
    total: payload.total ?? 0,
  };
}

export default function TelemetryFeed() {
  const [records, setRecords] = useState<TelemetryRow[]>([]);
  const [total, setTotal] = useState(0);
  const [dbStatus, setDbStatus] = useState<DbStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    try {
      const payload = await fetchTelemetryFeed();
      setRecords(payload.records);
      setTotal(payload.total);
      setDbStatus(payload.status);
      setError(payload.error ?? null);
      setLastRefreshed(new Date());
    } catch (fetchError) {
      setDbStatus("error");
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load telemetry records");
    }
  }, []);

  useEffect(() => {
    void refresh();
    const interval = setInterval(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [refresh]);

  const statusMeta = dbStatusMeta(dbStatus);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div
          className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium ${statusMeta.badgeClass}`}
        >
          <span className={`h-2.5 w-2.5 rounded-full ${statusMeta.dotClass}`} aria-hidden />
          {statusMeta.label}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
          <p>
            Total records:{" "}
            <span className="font-mono font-semibold text-white">{total.toLocaleString()}</span>
          </p>
          {lastRefreshed && (
            <p>
              Last refreshed:{" "}
              <span className="font-mono text-white/80">{formatTimestamp(lastRefreshed.toISOString())}</span>
            </p>
          )}
          <p className="text-white/45">Auto-refresh every 10s</p>
        </div>
      </div>

      {error && dbStatus !== "connected" && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <section className="mt-6 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                {[
                  "Timestamp",
                  "Drone ID",
                  "Status",
                  "Latitude",
                  "Longitude",
                  "Altitude",
                  "Speed",
                  "Battery",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-white/50">
                    {dbStatus === "loading"
                      ? "Loading telemetry records..."
                      : "No telemetry records found."}
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-white/80">
                      {formatTimestamp(record.timestamp)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono font-semibold text-white">
                      {record.drone_id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusBadgeClass(record.status)}`}
                      >
                        {record.status ?? "UNKNOWN"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-white/80">
                      {formatNumber(record.latitude, 6)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-white/80">
                      {formatNumber(record.longitude, 6)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-white/80">
                      {formatNumber(record.altitude, 1)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-white/80">
                      {formatNumber(record.speed, 1)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-white/80">
                      {formatNumber(record.battery, 1)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
