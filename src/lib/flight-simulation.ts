import { DRONE_ID, type Telemetry } from "@/lib/telemetry";

export type FlightProfileId = "random" | "spain" | "austin";

type GeoPoint = {
  latitude: number;
  longitude: number;
  label: string;
};

type BaseFlightProfile = {
  id: FlightProfileId;
  buttonLabel: string;
  description: string;
  cruiseSpeedMph: number;
  startPosition: GeoPoint;
};

export type OrbitFlightProfile = BaseFlightProfile & {
  mode: "orbit";
  orbitCenter: GeoPoint;
  orbitRadiusM: number;
};

export type RandomFlightProfile = BaseFlightProfile & {
  mode: "random";
};

export type FlightProfile = OrbitFlightProfile | RandomFlightProfile;

export const SIMULATION_TICK_SECONDS = 3;

const METERS_PER_DEGREE_LAT = 111_320;

/** Original demo — random walk near Perth, Australia. */
export const RANDOM_FLIGHT_PROFILE: RandomFlightProfile = {
  id: "random",
  buttonLabel: "Start Random Drone",
  description: "Random telemetry jitter near Perth, Australia (original demo behaviour).",
  mode: "random",
  cruiseSpeedMph: 24.6,
  startPosition: {
    latitude: 31.9523,
    longitude: 115.8613,
    label: "Perth Demo Site",
  },
};

/** 2 km orbit around survey home; takeoff at Carrer Pau Casals 17. */
export const SPAIN_FLIGHT_PROFILE: OrbitFlightProfile = {
  id: "spain",
  buttonLabel: "Start Spain Drone",
  description:
    "2 km orbit around Riells del Fai survey home. Takeoff at 17 Carrer Pau Casals, Barcelona province.",
  mode: "orbit",
  cruiseSpeedMph: 28,
  orbitCenter: {
    latitude: 41.693728664180846,
    longitude: 2.202948853438009,
    label: "Survey Home",
  },
  startPosition: {
    latitude: 41.6932577,
    longitude: 2.2018296,
    label: "17 Carrer Pau Casals, Riells del Fai",
  },
  orbitRadiusM: 2000,
};

/** 2 km orbit around Austin survey point; takeoff at Avalon Tech Ridge. */
export const AUSTIN_FLIGHT_PROFILE: OrbitFlightProfile = {
  id: "austin",
  buttonLabel: "Start Austin Drone",
  description:
    "2 km orbit around Austin survey point. Takeoff at Avalon Tech Ridge, Pflugerville.",
  mode: "orbit",
  cruiseSpeedMph: 28,
  orbitCenter: {
    latitude: 30.426462028009638,
    longitude: -97.65306271456492,
    label: "Austin Survey Point",
  },
  startPosition: {
    latitude: 30.456901,
    longitude: -97.648278,
    label: "Avalon Tech Ridge, 14100 John Henry Faulk Dr",
  },
  orbitRadiusM: 2000,
};

export const FLIGHT_PROFILES: FlightProfile[] = [
  RANDOM_FLIGHT_PROFILE,
  SPAIN_FLIGHT_PROFILE,
  AUSTIN_FLIGHT_PROFILE,
];

export function getFlightProfile(id: FlightProfileId): FlightProfile {
  const profile = FLIGHT_PROFILES.find((entry) => entry.id === id);
  if (!profile) {
    throw new Error(`Unknown flight profile: ${id}`);
  }
  return profile;
}

function metersPerDegreeLng(latitude: number) {
  return METERS_PER_DEGREE_LAT * Math.cos((latitude * Math.PI) / 180);
}

function isOrbitProfile(profile: FlightProfile): profile is OrbitFlightProfile {
  return profile.mode === "orbit";
}

function positionOnOrbit(profile: OrbitFlightProfile, angleRadians: number) {
  const latOffset =
    (profile.orbitRadiusM / METERS_PER_DEGREE_LAT) * Math.cos(angleRadians);
  const lngOffset =
    (profile.orbitRadiusM / metersPerDegreeLng(profile.orbitCenter.latitude)) *
    Math.sin(angleRadians);

  return {
    latitude: profile.orbitCenter.latitude + latOffset,
    longitude: profile.orbitCenter.longitude + lngOffset,
  };
}

export function angleFromPosition(
  profile: OrbitFlightProfile,
  latitude: number,
  longitude: number,
) {
  const deltaLatM = (latitude - profile.orbitCenter.latitude) * METERS_PER_DEGREE_LAT;
  const deltaLngM =
    (longitude - profile.orbitCenter.longitude) *
    metersPerDegreeLng(profile.orbitCenter.latitude);

  return Math.atan2(deltaLngM, deltaLatM);
}

function orbitAngleStep(profile: OrbitFlightProfile, speedMph: number) {
  const distanceM = speedMph * 0.44704 * SIMULATION_TICK_SECONDS;
  const circumference = 2 * Math.PI * profile.orbitRadiusM;
  return (distanceM / circumference) * 2 * Math.PI;
}

function jitterTelemetry(previous: Telemetry, profile: RandomFlightProfile): Telemetry {
  const latDelta = (Math.random() - 0.5) * 0.0004;
  const lngDelta = (Math.random() - 0.5) * 0.0004;
  const altDelta = (Math.random() - 0.5) * 8;
  const speedDelta = (Math.random() - 0.5) * 4;

  return {
    ...previous,
    status: "IN FLIGHT",
    latitude: previous.latitude + latDelta,
    longitude: previous.longitude + lngDelta,
    altitudeFt: Math.max(120, Math.min(400, previous.altitudeFt + altDelta)),
    speedMph: Math.max(8, Math.min(42, previous.speedMph + speedDelta)),
    batteryPct: Math.max(0, previous.batteryPct - 0.15 - Math.random() * 0.2),
    lastUpdated: new Date(),
  };
}

export function createInitialTelemetry(profile: FlightProfile): Telemetry {
  return {
    droneId: DRONE_ID,
    status: "STOPPED",
    latitude: profile.startPosition.latitude,
    longitude: profile.startPosition.longitude,
    altitudeFt: profile.mode === "orbit" ? 280 : 285,
    speedMph: profile.cruiseSpeedMph,
    batteryPct: 94.2,
    lastUpdated: new Date(),
  };
}

export function getInitialOrbitAngle(profile: FlightProfile) {
  if (!isOrbitProfile(profile)) return 0;
  return angleFromPosition(
    profile,
    profile.startPosition.latitude,
    profile.startPosition.longitude,
  );
}

export function advanceTelemetry(
  profile: FlightProfile,
  previous: Telemetry,
  angleRadians: number,
) {
  if (profile.mode === "random") {
    return {
      nextAngle: 0,
      telemetry: jitterTelemetry(previous, profile),
    };
  }

  const nextAngle = angleRadians + orbitAngleStep(profile, previous.speedMph);
  const position = positionOnOrbit(profile, nextAngle);
  const altitudeDelta = (Math.random() - 0.5) * 6;

  return {
    nextAngle,
    telemetry: {
      ...previous,
      status: "IN FLIGHT" as const,
      latitude: position.latitude,
      longitude: position.longitude,
      altitudeFt: Math.max(220, Math.min(340, previous.altitudeFt + altitudeDelta)),
      speedMph: profile.cruiseSpeedMph + (Math.random() - 0.5) * 2,
      batteryPct: Math.max(0, previous.batteryPct - 0.15 - Math.random() * 0.2),
      lastUpdated: new Date(),
    },
  };
}

export function getOrbitPathSamples(profile: FlightProfile, steps = 72): [number, number][] {
  if (!isOrbitProfile(profile)) return [];

  return Array.from({ length: steps }, (_, index) => {
    const angle = (index / steps) * 2 * Math.PI;
    const point = positionOnOrbit(profile, angle);
    return [point.latitude, point.longitude] as [number, number];
  });
}

export function getMapHomePosition(profile: FlightProfile): [number, number] | null {
  if (!isOrbitProfile(profile)) return null;
  return [profile.orbitCenter.latitude, profile.orbitCenter.longitude];
}

export function inferFlightProfile(latitude: number, longitude: number): FlightProfile {
  const candidates: { profile: FlightProfile; maxDistanceM: number }[] = [
    { profile: SPAIN_FLIGHT_PROFILE, maxDistanceM: 5000 },
    { profile: AUSTIN_FLIGHT_PROFILE, maxDistanceM: 8000 },
    { profile: RANDOM_FLIGHT_PROFILE, maxDistanceM: 5000 },
  ];

  for (const candidate of candidates) {
    const anchor =
      candidate.profile.mode === "orbit"
        ? candidate.profile.orbitCenter
        : candidate.profile.startPosition;
    const deltaLatM = (latitude - anchor.latitude) * METERS_PER_DEGREE_LAT;
    const deltaLngM =
      (longitude - anchor.longitude) * metersPerDegreeLng(anchor.latitude);
    const distanceM = Math.hypot(deltaLatM, deltaLngM);

    if (distanceM <= candidate.maxDistanceM) {
      return candidate.profile;
    }
  }

  return RANDOM_FLIGHT_PROFILE;
}

export function getProfileStartPosition(profile: FlightProfile): [number, number] {
  return [profile.startPosition.latitude, profile.startPosition.longitude];
}
