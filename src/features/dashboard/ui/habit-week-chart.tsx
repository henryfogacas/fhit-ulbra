"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DayBar {
  label: string;
  completed: number;
  scheduled: number;
}

export function HabitWeekChart({ data }: { data: DayBar[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#00000010" vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} width={24} />
        <Tooltip
          cursor={{ fill: "#0000000a" }}
          contentStyle={{ borderRadius: 12, border: "1px solid #00000010" }}
        />
        <Bar dataKey="scheduled" name="Agendados" fill="#f5ce99" radius={[4, 4, 0, 0]} />
        <Bar dataKey="completed" name="Concluídos" fill="#045a52" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
