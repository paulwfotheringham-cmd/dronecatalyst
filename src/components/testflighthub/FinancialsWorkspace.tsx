"use client";

import { useState } from "react";

import ExpensesWorkspace from "./ExpensesWorkspace";
import { ChartTooltip } from "@/components/dashboard/ChartTooltip";
import {
  FINANCIAL_KPIS,
  MONTHLY_REVENUE_DATA,
  PIPELINE_BY_REGION_DATA,
  PROFIT_LOSS_DATA,
  REVENUE_BY_SERVICE_DATA,
} from "@/lib/financials-mock-data";
import { cn } from "@/lib/utils";
import { Receipt, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function panelClassName() {
  return "rounded-2xl border border-white/10 bg-[#0a1422]/80 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:p-5";
}

function KpiCard({ kpi }: { kpi: (typeof FINANCIAL_KPIS)[number] }) {
  const TrendIcon = kpi.trend === "down" ? TrendingDown : TrendingUp;

  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
        {kpi.label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-white">{kpi.value}</p>
      <div className="mt-2 flex items-center gap-1.5">
        {kpi.trend !== "neutral" && (
          <TrendIcon
            className={cn(
              "h-3.5 w-3.5",
              kpi.trend === "up" ? "text-emerald-400" : "text-rose-400",
            )}
          />
        )}
        <span
          className={cn(
            "text-xs font-medium",
            kpi.trend === "up"
              ? "text-emerald-300"
              : kpi.trend === "down"
                ? "text-rose-300"
                : "text-white/50",
          )}
        >
          {kpi.change}
        </span>
      </div>
      <p className="mt-2 text-[11px] text-white/35">{kpi.hint}</p>
    </article>
  );
}

export default function FinancialsWorkspace() {
  const [view, setView] = useState<"overview" | "expenses">("overview");

  if (view === "expenses") {
    return <ExpensesWorkspace onBackToFinancials={() => setView("overview")} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10">
            <Wallet className="h-5 w-5 text-emerald-300" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
              Finance
            </p>
            <h2 className="mt-0.5 text-lg font-semibold text-white">Financials</h2>
            <p className="mt-1 text-sm text-white/55">
              Mock operational finance view — revenue, pipeline, and P&amp;L.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setView("expenses")}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 text-xs font-semibold text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/25"
          >
            <Receipt className="h-3.5 w-3.5" />
            Expenses
          </button>
          <span className="rounded-lg border border-amber-400/25 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-200">
            Preview data only
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {FINANCIAL_KPIS.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className={panelClassName()}>
          <h3 className="text-base font-semibold text-white">Monthly revenue</h3>
          <p className="mt-1 text-xs text-white/45">Recognised revenue vs target (€ thousands)</p>
          <div className="mt-4 h-[280px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[...MONTHLY_REVENUE_DATA]}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                  tickFormatter={(value) => `€${value}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => (
                    <ChartTooltip
                      active={active}
                      label={String(label ?? "")}
                      suffix="k"
                      payload={payload?.map((entry) => ({
                        name: entry.name === "revenue" ? "Revenue" : "Target",
                        value: entry.value as number,
                        color: entry.name === "revenue" ? "#38bdf8" : "#94a3b8",
                      }))}
                    />
                  )}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}
                  formatter={(value) => (value === "revenue" ? "Revenue" : "Target")}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#38bdf8" }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className={panelClassName()}>
          <h3 className="text-base font-semibold text-white">Profit &amp; loss</h3>
          <p className="mt-1 text-xs text-white/45">Monthly revenue, direct costs, and net profit (€ thousands)</p>
          <div className="mt-4 h-[280px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...PROFIT_LOSS_DATA]} barGap={4}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                  tickFormatter={(value) => `€${value}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => (
                    <ChartTooltip
                      active={active}
                      label={String(label ?? "")}
                      suffix="k"
                      payload={payload?.map((entry) => ({
                        name:
                          entry.dataKey === "revenue"
                            ? "Revenue"
                            : entry.dataKey === "costs"
                              ? "Costs"
                              : "Profit",
                        value: entry.value as number,
                        color:
                          entry.dataKey === "revenue"
                            ? "#38bdf8"
                            : entry.dataKey === "costs"
                              ? "#f87171"
                              : "#34d399",
                      }))}
                    />
                  )}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}
                  formatter={(value) =>
                    value === "revenue" ? "Revenue" : value === "costs" ? "Costs" : "Profit"
                  }
                />
                <Bar dataKey="revenue" fill="#38bdf8" radius={[4, 4, 0, 0]} maxBarSize={18} />
                <Bar dataKey="costs" fill="#f87171" radius={[4, 4, 0, 0]} maxBarSize={18} />
                <Bar dataKey="profit" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <section className={panelClassName()}>
          <h3 className="text-base font-semibold text-white">Pipeline by region</h3>
          <p className="mt-1 text-xs text-white/45">Forecast contract value (€ thousands)</p>
          <div className="mt-4 h-[260px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...PIPELINE_BY_REGION_DATA]} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                  tickFormatter={(value) => `€${value}k`}
                />
                <YAxis
                  type="category"
                  dataKey="region"
                  axisLine={false}
                  tickLine={false}
                  width={72}
                  tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                />
                <Tooltip
                  content={({ active, payload, label }) => (
                    <ChartTooltip
                      active={active}
                      label={String(label ?? "")}
                      suffix="k"
                      payload={payload?.map(() => ({
                        name: "Pipeline",
                        value: payload?.[0]?.value as number,
                        color: "#a78bfa",
                      }))}
                    />
                  )}
                />
                <Bar dataKey="value" fill="#a78bfa" radius={[0, 4, 4, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className={panelClassName()}>
          <h3 className="text-base font-semibold text-white">Revenue mix</h3>
          <p className="mt-1 text-xs text-white/45">Share of YTD revenue by service line</p>
          <div className="mt-4 h-[260px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[...REVENUE_BY_SERVICE_DATA]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={88}
                  paddingAngle={2}
                >
                  {REVENUE_BY_SERVICE_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => (
                    <ChartTooltip
                      active={active}
                      label={String(payload?.[0]?.name ?? "")}
                      suffix="%"
                      payload={payload?.map((entry) => ({
                        name: "Share",
                        value: entry.value as number,
                        color: (entry.payload as { color: string }).color,
                      }))}
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {REVENUE_BY_SERVICE_DATA.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs text-white/55">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}</span>
                <span className="ml-auto font-mono text-white/75">{entry.value}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
