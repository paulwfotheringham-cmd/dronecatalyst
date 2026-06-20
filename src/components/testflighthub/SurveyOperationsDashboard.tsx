"use client";

import { useCallback, useState } from "react";

import type { Telemetry } from "@/lib/telemetry";

import FleetPanel from "./FleetPanel";
import FlightHubSandbox from "./FlightHubSandbox";
import MissionOverviewPanel from "./MissionOverviewPanel";
import RecentMissionsPanel from "./RecentMissionsPanel";
import SurveyOperationsShell from "./SurveyOperationsShell";

export default function SurveyOperationsDashboard() {
  const [liveTelemetry, setLiveTelemetry] = useState<Telemetry | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleTelemetryChange = useCallback((telemetry: Telemetry | null, running: boolean) => {
    setLiveTelemetry(telemetry);
    setIsRunning(running);
  }, []);

  return (
    <SurveyOperationsShell>
      <div className="relative px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37, 99, 235, 0.12), transparent 70%)",
          }}
        />

        <div className="relative space-y-6">
          <MissionOverviewPanel />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6">
              <FlightHubSandbox onTelemetryChange={handleTelemetryChange} />
            </div>

            <div className="space-y-6">
              <FleetPanel liveTelemetry={liveTelemetry} isRunning={isRunning} />
              <RecentMissionsPanel />
            </div>
          </div>
        </div>
      </div>
    </SurveyOperationsShell>
  );
}
