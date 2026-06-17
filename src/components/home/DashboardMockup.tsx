/** Platform dashboard UI — matches homepage mockup */
export default function DashboardMockup() {
  return (
    <div className="w-full max-w-[640px] overflow-hidden rounded-lg border border-white/10 bg-[#0d1528] shadow-[0_40px_80px_rgba(0,0,0,0.55)]">
      <div className="flex border-b border-white/10">
        <div className="w-36 shrink-0 border-r border-white/10 bg-[#0a1020] p-3">
          <p className="text-[10px] font-semibold text-white/90">Project Alpha</p>
          <ul className="mt-3 space-y-2 text-[9px] text-white/50">
            <li className="text-accent">Dashboard</li>
            <li>Reports</li>
            <li>Imagery</li>
            <li>Analytics</li>
          </ul>
        </div>
        <div className="min-w-0 flex-1 p-3">
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Projects", value: "24" },
              { label: "Surveys", value: "156" },
              { label: "Reports", value: "89" },
              { label: "Issues", value: "12" },
            ].map((s) => (
              <div key={s.label} className="rounded border border-white/10 bg-white/5 p-2">
                <p className="text-[8px] text-white/45">{s.label}</p>
                <p className="text-sm font-semibold text-white">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded border border-white/10 bg-white/5 p-2">
              <p className="text-[8px] text-white/45">Progress Overview</p>
              <div className="mt-2 flex h-12 items-end gap-0.5">
                {[40, 55, 45, 70, 60, 80, 75].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t bg-accent/60"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded border border-white/10 bg-white/5 p-2">
              <p className="text-[8px] text-white/45">Site Overview</p>
              <div className="mt-1 h-12 rounded bg-gradient-to-br from-emerald-900/40 to-slate-800/60" />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[8px]">
            <div className="rounded border border-white/10 bg-white/5 p-2">
              <p className="text-white/45">Recent Reports</p>
              <p className="mt-1 text-white/70">Quarry Survey Q1</p>
              <p className="text-white/50">Solar Inspection</p>
            </div>
            <div className="rounded border border-white/10 bg-white/5 p-2">
              <p className="text-white/45">Active Issues</p>
              <p className="mt-1 text-amber-400/90">3 flagged areas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
