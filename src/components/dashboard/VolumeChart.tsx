"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EARTHWORKS_VOLUME_DATA } from "@/lib/mock-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0D1B2A] px-4 py-3 shadow-2xl">
      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
        {label}
      </p>
      <p className="font-mono text-sm text-white/90">{payload[0].value}k m³</p>
    </div>
  );
}

export default function VolumeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earthworks Volume</CardTitle>
        <CardDescription>Monthly earthworks volume — cubic metres (000s)</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={EARTHWORKS_VOLUME_DATA} barSize={32}>
              <CartesianGrid
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                tickFormatter={(v) => `${v}k`}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar
                dataKey="volume"
                name="Volume"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                opacity={0.9}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
