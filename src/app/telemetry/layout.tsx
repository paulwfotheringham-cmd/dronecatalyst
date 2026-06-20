import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telemetry Feed | DroneCatalyst",
  description: "Live telemetry records from the DroneCatalyst FlightHub database.",
  robots: { index: false, follow: false },
};

export default function TelemetryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
