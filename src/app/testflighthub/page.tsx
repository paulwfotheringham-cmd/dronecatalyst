export default function TestFlightHubPage() {
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

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <header className="border-b border-white/10 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
            DroneCatalyst Project
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            FlightHub Integration Sandbox
          </h1>
        </header>

        <section className="mt-10 rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
          <h2 className="text-lg font-semibold text-white">Mock FlightHub Data</h2>
          <p className="mt-4 text-base text-white/60">No telemetry received yet.</p>
          <button
            type="button"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#2563eb] px-5 text-sm font-semibold text-white shadow-[0_0_32px_rgba(37,99,235,0.35)] transition-colors hover:bg-[#1d4ed8]"
          >
            Generate Test Drone
          </button>
        </section>
      </div>
    </div>
  );
}
