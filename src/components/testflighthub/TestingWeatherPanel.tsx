"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CloudRain, Droplets, Loader2, Wind } from "lucide-react";

import {
  FLIGHT_PROFILES,
  getProfileWeatherLocation,
  inferFlightProfile,
  TESTING_FLIGHT_PROFILE_IDS,
  type FlightProfile,
  type FlightProfileId,
} from "@/lib/flight-simulation";
import type { Telemetry } from "@/lib/telemetry";
import {
  formatForecastDay,
  formatWindDirection,
  type LocationWeather,
  weatherCodeEmoji,
  weatherCodeLabel,
} from "@/lib/weather-data";

type TestingWeatherPanelProps = {
  liveTelemetry: Telemetry | null;
};

type ProfileWeatherState = {
  profileId: FlightProfileId;
  profile: FlightProfile;
  weather: LocationWeather | null;
  loading: boolean;
  error: string | null;
};

function profileAccent(profileId: FlightProfileId) {
  switch (profileId) {
    case "random":
      return {
        border: "border-[#2563eb]/35",
        glow: "from-[#2563eb]/20 via-[#2563eb]/5 to-transparent",
        badge: "bg-[#2563eb]/20 text-[#93c5fd]",
        activeRing: "ring-[#2563eb]/50",
      };
    case "spain":
      return {
        border: "border-amber-500/35",
        glow: "from-amber-500/20 via-amber-500/5 to-transparent",
        badge: "bg-amber-500/20 text-amber-200",
        activeRing: "ring-amber-400/50",
      };
    case "oxford":
      return {
        border: "border-emerald-500/35",
        glow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
        badge: "bg-emerald-500/20 text-emerald-200",
        activeRing: "ring-emerald-400/50",
      };
    default:
      return {
        border: "border-white/15",
        glow: "from-white/10 to-transparent",
        badge: "bg-white/10 text-white/70",
        activeRing: "ring-white/30",
      };
  }
}

function WindArrow({ degrees, className }: { degrees: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center ${className ?? ""}`}
      style={{ transform: `rotate(${degrees}deg)` }}
      aria-hidden
    >
      <Wind className="h-4 w-4" />
    </span>
  );
}

function MetricTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function WeatherLocationCard({
  entry,
  isActive,
}: {
  entry: ProfileWeatherState;
  isActive: boolean;
}) {
  const accent = profileAccent(entry.profileId);
  const { weather } = entry;

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white/[0.03] shadow-[0_20px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl ${accent.border} ${
        isActive ? `ring-2 ${accent.activeRing}` : ""
      }`}
    >
      <div className={`bg-gradient-to-br px-5 py-4 ${accent.glow}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
              {entry.profile.buttonLabel.replace("Start ", "").replace(" Drone", "")}
            </p>
            <h3 className="mt-1 text-base font-semibold text-white">{entry.profile.startPosition.label}</h3>
            {isActive && (
              <span
                className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${accent.badge}`}
              >
                Active area
              </span>
            )}
          </div>
          {weather && (
            <div className="text-right">
              <p className="text-4xl font-bold tracking-tight text-white">
                {Math.round(weather.current.temperatureC)}°
              </p>
              <p className="mt-1 text-sm text-white/65">
                {weatherCodeEmoji(weather.current.weatherCode)}{" "}
                {weatherCodeLabel(weather.current.weatherCode)}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 px-5 py-4">
        {entry.loading && (
          <div className="flex items-center gap-2 text-sm text-white/55">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading live weather…
          </div>
        )}

        {entry.error && !entry.loading && (
          <p className="text-sm text-red-300/90">{entry.error}</p>
        )}

        {weather && !entry.loading && (
          <>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <MetricTile
                label="Wind"
                value={`${weather.current.windSpeedMph.toFixed(0)} mph ${formatWindDirection(weather.current.windDirectionDeg)}`}
                icon={<WindArrow degrees={weather.current.windDirectionDeg} className="h-3.5 w-3.5 text-sky-300" />}
              />
              <MetricTile
                label="Humidity"
                value={`${Math.round(weather.current.humidityPct)}%`}
                icon={<Droplets className="h-3.5 w-3.5 text-cyan-300" />}
              />
              <MetricTile
                label="Rain"
                value={`${weather.current.rainMm.toFixed(1)} mm`}
                icon={<CloudRain className="h-3.5 w-3.5 text-blue-300" />}
              />
              <MetricTile
                label="Precip"
                value={`${weather.current.precipitationMm.toFixed(1)} mm`}
                icon={<CloudRain className="h-3.5 w-3.5 text-indigo-300" />}
              />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                7-day outlook
              </p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {weather.daily.map((day) => (
                  <div
                    key={day.date}
                    className="min-w-[92px] shrink-0 rounded-xl border border-white/10 bg-[#0b1220]/70 px-3 py-3 text-center"
                  >
                    <p className="text-[11px] font-semibold text-white/75">
                      {formatForecastDay(day.date, weather.timezone)}
                    </p>
                    <p className="mt-2 text-xl">{weatherCodeEmoji(day.weatherCode)}</p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {Math.round(day.tempMaxC)}°
                      <span className="text-white/45"> / {Math.round(day.tempMinC)}°</span>
                    </p>
                    <p className="mt-1 text-[10px] text-sky-300/90">
                      {day.windSpeedMaxMph.toFixed(0)} mph {formatWindDirection(day.windDirectionDeg)}
                    </p>
                    <p className="mt-1 text-[10px] text-white/45">
                      {Math.round(day.humidityMeanPct)}% · {day.rainMm.toFixed(1)} mm
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

async function fetchLocationWeather(
  profile: FlightProfile,
): Promise<LocationWeather> {
  const location = getProfileWeatherLocation(profile);
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    label: location.label,
  });

  const response = await fetch(`/api/weather?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Weather unavailable");
  }

  return (await response.json()) as LocationWeather;
}

export default function TestingWeatherPanel({ liveTelemetry }: TestingWeatherPanelProps) {
  const profiles = useMemo(
    () => FLIGHT_PROFILES.filter((profile) => TESTING_FLIGHT_PROFILE_IDS.includes(profile.id)),
    [],
  );

  const activeProfileId = useMemo(() => {
    if (!liveTelemetry) return null;
    return inferFlightProfile(liveTelemetry.latitude, liveTelemetry.longitude).id;
  }, [liveTelemetry]);

  const [entries, setEntries] = useState<ProfileWeatherState[]>(() =>
    profiles.map((profile) => ({
      profileId: profile.id,
      profile,
      weather: null,
      loading: true,
      error: null,
    })),
  );

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      setEntries(
        profiles.map((profile) => ({
          profileId: profile.id,
          profile,
          weather: null,
          loading: true,
          error: null,
        })),
      );

      await Promise.all(
        profiles.map(async (profile) => {
          try {
            const weather = await fetchLocationWeather(profile);
            if (cancelled) return;

            setEntries((current) =>
              current.map((entry) =>
                entry.profileId === profile.id
                  ? { ...entry, weather, loading: false, error: null }
                  : entry,
              ),
            );
          } catch {
            if (cancelled) return;

            setEntries((current) =>
              current.map((entry) =>
                entry.profileId === profile.id
                  ? { ...entry, loading: false, error: "Could not load weather for this area." }
                  : entry,
              ),
            );
          }
        }),
      );
    }

    void loadWeather();

    return () => {
      cancelled = true;
    };
  }, [profiles]);

  return (
    <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
            Mission Planning
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">Live Weather Intelligence</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            Current conditions and 7-day outlook for each selectable test area — temperature,
            wind, rain, and humidity from live Open-Meteo feeds.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Updates every 30 min
        </span>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        {entries.map((entry) => (
          <WeatherLocationCard
            key={entry.profileId}
            entry={entry}
            isActive={activeProfileId === entry.profileId}
          />
        ))}
      </div>
    </section>
  );
}
