"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Point {
  label: string;
  weight: number;
}

export function WeightLineChart({ data }: { data: Point[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#00000010" vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          domain={["dataMin - 1", "dataMax + 1"]}
          tickLine={false}
          axisLine={false}
          fontSize={12}
          width={40}
          unit=" kg"
        />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #00000010" }}
          formatter={(value) => [`${value} kg`, "Peso"]}
        />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#045a52"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#045a52" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
