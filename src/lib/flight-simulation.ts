import { DRONE_ID, type Telemetry } from "@/lib/telemetry";

/** Survey anchor — custom home location for the FlightHub orbit simulation. */
export const SIMULATION_HOME = {
  latitude: 41.69372065284066,
  longitude: 2.202927395766477,
  label: "Survey Home",
} as const;

/** Orbit radius in metres (2 km circle). */
export const SIMULATION_ORBIT_RADIUS_M = 2000;

export const SIMULATION_TICK_SECONDS = 3;

/** Typical tangential speed while orbiting (mph). */
export const SIMULATION_CRUISE_SPEED_MPH = 28;

const METERS_PER_DEGREE_LAT = 111_320;

function metersPerDegreeLng(latitude: number) {
  return METERS_PER_DEGREE_LAT * Math.cos((latitude * Math.PI) / 180);
}

export function positionOnOrbit(angleRadians: number) {
  const latOffset =
    (SIMULATION_ORBIT_RADIUS_M / METERS_PER_DEGREE_LAT) * Math.cos(angleRadians);
  const lngOffset =
    (SIMULATION_ORBIT_RADIUS_M / metersPerDegreeLng(SIMULATION_HOME.latitude)) *
    Math.sin(angleRadians);

  return {
    latitude: SIMULATION_HOME.latitude + latOffset,
    longitude: SIMULATION_HOME.longitude + lngOffset,
  };
}

export function angleFromPosition(latitude: number, longitude: number) {
  const deltaLatM = (latitude - SIMULATION_HOME.latitude) * METERS_PER_DEGREE_LAT;
  const deltaLngM =
    (longitude - SIMULATION_HOME.longitude) * metersPerDegreeLng(SIMULATION_HOME.latitude);

  return Math.atan2(deltaLngM, deltaLatM);
}

export function orbitAngleStep(speedMph: number, tickSeconds = SIMULATION_TICK_SECONDS) {
  const distanceM = speedMph * 0.44704 * tickSeconds;
  const circumference = 2 * Math.PI * SIMULATION_ORBIT_RADIUS_M;
  return (distanceM / circumference) * 2 * Math.PI;
}

export function createInitialTelemetry(): Telemetry {
  const position = positionOnOrbit(0);

  return {
    droneId: DRONE_ID,
    status: "STOPPED",
    latitude: position.latitude,
    longitude: position.longitude,
    altitudeFt: 280,
    speedMph: SIMULATION_CRUISE_SPEED_MPH,
    batteryPct: 94.2,
    lastUpdated: new Date(),
  };
}

export function advanceOrbitTelemetry(previous: Telemetry, angleRadians: number) {
  const nextAngle = angleRadians + orbitAngleStep(previous.speedMph);
  const position = positionOnOrbit(nextAngle);
  const altitudeDelta = (Math.random() - 0.5) * 6;

  return {
    nextAngle,
    telemetry: {
      ...previous,
      status: "IN FLIGHT" as const,
      latitude: position.latitude,
      longitude: position.longitude,
      altitudeFt: Math.max(220, Math.min(340, previous.altitudeFt + altitudeDelta)),
      speedMph: SIMULATION_CRUISE_SPEED_MPH + (Math.random() - 0.5) * 2,
      batteryPct: Math.max(0, previous.batteryPct - 0.15 - Math.random() * 0.2),
      lastUpdated: new Date(),
    },
  };
}

export function getOrbitPathSamples(steps = 72): [number, number][] {
  return Array.from({ length: steps }, (_, index) => {
    const angle = (index / steps) * 2 * Math.PI;
    const point = positionOnOrbit(angle);
    return [point.latitude, point.longitude] as [number, number];
  });
}
