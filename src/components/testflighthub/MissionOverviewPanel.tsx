import { activeMission } from "@/lib/survey-operations-mock-data";

function OverviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function statusClass(status: string) {
  switch (status) {
    case "Active":
      return "border-emerald-400/40 bg-emerald-500/15 text-emerald-300";
    case "Scheduled":
      return "border-sky-400/40 bg-sky-500/15 text-sky-300";
    case "Completed":
      return "border-white/20 bg-white/10 text-white/60";
    default:
      return "border-amber-400/40 bg-amber-500/15 text-amber-200";
  }
}

export default function MissionOverviewPanel() {
  return (
    <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
            Mission Overview
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">{activeMission.name}</h2>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusClass(activeMission.status)}`}
        >
          {activeMission.status}
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewField label="Mission Name" value={activeMission.name} />
        <OverviewField label="Client" value={activeMission.client} />
        <OverviewField label="Site" value={activeMission.site} />
        <OverviewField label="Assigned Drone" value={activeMission.assignedDrone} />
        <OverviewField label="Pilot" value={activeMission.pilot} />
        <OverviewField label="Status" value={activeMission.status} />
        <OverviewField label="Start Date" value={activeMission.startDate} />
        <OverviewField label="End Date" value={activeMission.endDate} />
      </div>
    </section>
  );
}
