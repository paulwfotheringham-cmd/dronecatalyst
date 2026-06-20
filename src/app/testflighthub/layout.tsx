import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DroneCatalyst FlightHub Test",
  description: "FlightHub integration sandbox for DroneCatalyst telemetry testing.",
  robots: { index: false, follow: false },
};

export default function TestFlightHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
