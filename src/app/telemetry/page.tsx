import TelemetryFeed from "@/components/telemetry/TelemetryFeed";

export default function TelemetryPage() {
  return (
    <div className="relative overflow-hidden bg-[#020617]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37, 99, 235, 0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <header className="border-b border-white/10 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
            DroneCatalyst Project
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Telemetry Feed
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/60">
            Latest telemetry records from Supabase, refreshed automatically every 10 seconds.
          </p>
        </header>

        <TelemetryFeed />
      </div>
    </div>
  );
}
