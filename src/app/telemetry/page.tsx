import SurveyOperationsShell from "@/components/testflighthub/SurveyOperationsShell";
import TelemetryDashboard from "@/components/telemetry/TelemetryDashboard";

export default function TelemetryPage() {
  return (
    <SurveyOperationsShell title="Live Telemetry" subtitle="Survey Operations">
      <TelemetryDashboard />
    </SurveyOperationsShell>
  );
}
