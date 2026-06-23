"use client";

import {
  actionRequiredItems,
  missionStatusClass,
  priorityDotClass,
  progressBar,
  projectsInProgress,
  thisWeekSchedule,
  upcomingMissions,
  type ActionItem,
} from "@/lib/internal-operations-command-data";
import { cn } from "@/lib/utils";

function SectionPanel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.015] shadow-[0_20px_60px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          {title}
        </h3>
      </div>
      <div className="px-5 py-4 sm:px-6 sm:py-5">{children}</div>
    </section>
  );
}

function ActionRow({ item }: { item: ActionItem }) {
  return (
    <tr className="border-b border-white/[0.05] last:border-0">
      <td className="w-10 py-3.5 pr-3 align-middle">
        <span
          className={cn("inline-block h-2 w-2 rounded-full", priorityDotClass(item.priority))}
          aria-label={`${item.priority} priority`}
        />
      </td>
      <td className="py-3.5 pr-4 text-sm text-white/85">{item.task}</td>
      <td className="hidden py-3.5 pr-4 text-sm text-white/50 sm:table-cell">{item.assignedTo}</td>
      <td className="py-3.5 text-right text-sm text-white/45 sm:text-left">{item.due}</td>
    </tr>
  );
}

export default function InternalDashboardHome() {
  return (
    <section aria-label="Internal operations command centre" className="min-w-0 pb-10">
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12">
        <header className="space-y-2 pt-1">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Internal Operations
          </h2>
          <p className="text-base text-white/50 sm:text-[17px]">
            Everything that needs attention this week.
          </p>
        </header>

        <SectionPanel title="Action required">
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.06] text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                  <th className="pb-3 pr-3 font-medium" scope="col">
                    <span className="sr-only">Priority</span>
                  </th>
                  <th className="pb-3 pr-4 font-medium" scope="col">
                    Task
                  </th>
                  <th className="hidden pb-3 pr-4 font-medium sm:table-cell" scope="col">
                    Assigned to
                  </th>
                  <th className="pb-3 font-medium" scope="col">
                    Due
                  </th>
                </tr>
              </thead>
              <tbody>
                {actionRequiredItems.map((item) => (
                  <ActionRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 space-y-3 sm:hidden">
            {actionRequiredItems.map((item) => (
              <div
                key={`${item.id}-mobile`}
                className="flex gap-3 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"
              >
                <span
                  className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", priorityDotClass(item.priority))}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white/85">{item.task}</p>
                  <p className="mt-1 text-xs text-white/40">
                    {item.assignedTo} · {item.due}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionPanel>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,13fr)_minmax(0,7fr)] lg:gap-10">
          <SectionPanel title="This week">
            <div className="space-y-6">
              {thisWeekSchedule.map((day) => (
                <div key={day.day}>
                  <p className="text-sm font-medium text-white/70">{day.day}</p>
                  <ul className="mt-2.5 space-y-2">
                    {day.entries.map((entry, index) => (
                      <li
                        key={`${day.day}-${index}`}
                        className="flex gap-3 text-sm leading-relaxed text-white/55"
                      >
                        {entry.time ? (
                          <span className="w-12 shrink-0 tabular-nums text-white/35">{entry.time}</span>
                        ) : (
                          <span className="w-12 shrink-0" aria-hidden />
                        )}
                        <span className="text-white/75">{entry.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SectionPanel>

          <SectionPanel title="Upcoming missions">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[18rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/[0.06] text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                    <th className="pb-3 pr-3 font-medium" scope="col">
                      Mission
                    </th>
                    <th className="hidden pb-3 pr-3 font-medium sm:table-cell" scope="col">
                      Client
                    </th>
                    <th className="pb-3 pr-3 font-medium" scope="col">
                      Date
                    </th>
                    <th className="hidden pb-3 pr-3 font-medium md:table-cell" scope="col">
                      Pilot
                    </th>
                    <th className="pb-3 font-medium" scope="col">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingMissions.map((mission) => (
                    <tr key={mission.id} className="border-b border-white/[0.05] last:border-0">
                      <td className="py-3 pr-3 align-top">
                        <p className="text-sm font-medium text-white/80">{mission.name}</p>
                        <p className="mt-0.5 text-xs text-white/40 sm:hidden">{mission.client}</p>
                      </td>
                      <td className="hidden py-3 pr-3 text-sm text-white/50 sm:table-cell">
                        {mission.client}
                      </td>
                      <td className="py-3 pr-3 text-sm text-white/45">{mission.date}</td>
                      <td className="hidden py-3 pr-3 text-sm text-white/50 md:table-cell">
                        {mission.pilot}
                      </td>
                      <td className="py-3 align-top">
                        <span
                          className={cn(
                            "inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em]",
                            missionStatusClass(mission.status),
                          )}
                        >
                          {mission.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionPanel>
        </div>

        <SectionPanel title="Projects in progress">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.06] text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                  <th className="pb-3 pr-4 font-medium" scope="col">
                    Project
                  </th>
                  <th className="hidden pb-3 pr-4 font-medium sm:table-cell" scope="col">
                    Client
                  </th>
                  <th className="pb-3 pr-4 font-medium" scope="col">
                    Progress
                  </th>
                  <th className="pb-3 pr-4 font-medium" scope="col">
                    Status
                  </th>
                  <th className="pb-3 font-medium" scope="col">
                    Last update
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectsInProgress.map((project) => (
                  <tr key={project.id} className="border-b border-white/[0.05] last:border-0">
                    <td className="py-3.5 pr-4 text-sm font-medium text-white/80">{project.project}</td>
                    <td className="hidden py-3.5 pr-4 text-sm text-white/50 sm:table-cell">
                      {project.client}
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] tracking-tight text-white/35">
                          {progressBar(project.progress)}
                        </span>
                        <span className="text-xs tabular-nums text-white/45">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-sm text-white/55">{project.status}</td>
                    <td className="py-3.5 text-sm text-white/40">{project.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionPanel>
      </div>
    </section>
  );
}
