"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PROGRESS_VS_PLAN_DATA } from "@/lib/mock-data";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PLANNED_COLOR = "#64748b";
const ACTUAL_COLOR = "#3b82f6";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0D1B2A] px-4 py-3 shadow-2xl">
      <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/40">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-white/50">{entry.name}</span>
          <span className="ml-auto font-mono text-white/90">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
}

export default function ProgressChart() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Progress vs Plan</CardTitle>
        <div className="flex items-center gap-5 text-xs text-white/45">
          <span className="flex items-center gap-2">
            <span
              className="h-0.5 w-5 rounded-full"
              style={{ backgroundColor: ACTUAL_COLOR }}
            />
            Actual
          </span>
          <span className="flex items-center gap-2">
            <span
              className="h-0.5 w-5 rounded-full"
              style={{ backgroundColor: PLANNED_COLOR }}
            />
            Planned
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[280px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PROGRESS_VS_PLAN_DATA}>
              <CartesianGrid
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey="planned"
                name="Planned"
                stroke={PLANNED_COLOR}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: PLANNED_COLOR, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke={ACTUAL_COLOR}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: ACTUAL_COLOR, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
