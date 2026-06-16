"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WeekBar {
  label: string;
  workouts: number;
  habitRate: number;
}

export function MonthWeekChart({ data }: { data: WeekBar[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#00000010" vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          yAxisId="left"
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          fontSize={12}
          width={28}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
          fontSize={12}
          width={36}
          unit="%"
        />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #00000010" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar
          yAxisId="left"
          dataKey="workouts"
          name="Treinos"
          fill="#045a52"
          radius={[4, 4, 0, 0]}
          barSize={28}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="habitRate"
          name="Hábitos (%)"
          stroke="#f59e0b"
          strokeWidth={2.5}
          dot={{ r: 3 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
