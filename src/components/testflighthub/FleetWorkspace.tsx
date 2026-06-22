"use client";

import { useEffect, useState } from "react";

import type { Telemetry } from "@/lib/telemetry";
import FleetPanel from "./FleetPanel";

const FLEET_LOCATIONS_STORAGE_KEY = "dc-fleet-current-locations";

const defaultLocations: Record<string, string> = {
  "DC-M4T-BCN": "Barcelona",
  "DC-M4T-PRT": "Porto",
  "DC-M4T-OXF": "Oxford",
};

type FleetWorkspaceProps = {
  liveTelemetry: Telemetry | null;
  isRunning: boolean;
  onOpenAssets?: () => void;
};

export default function FleetWorkspace({
  liveTelemetry,
  isRunning,
  onOpenAssets,
}: FleetWorkspaceProps) {
  const [currentLocations, setCurrentLocations] = useState<Record<string, string>>(defaultLocations);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FLEET_LOCATIONS_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Record<string, string>;
      setCurrentLocations((current) => ({ ...current, ...parsed }));
    } catch {
      // ignore invalid storage
    }
  }, []);

  function updateLocation(droneId: string, value: string) {
    setCurrentLocations((current) => {
      const next = { ...current, [droneId]: value };
      try {
        localStorage.setItem(FLEET_LOCATIONS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }

  return (
    <FleetPanel
      liveTelemetry={liveTelemetry}
      isRunning={isRunning}
      onOpenAssets={onOpenAssets}
      showCurrentLocation
      currentLocations={currentLocations}
      onCurrentLocationChange={updateLocation}
    />
  );
}
