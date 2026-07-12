import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { monthlyStats } from "@/data/mockData";

export function BookingsChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={monthlyStats} margin={{ left: -20, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.48 0.09 175)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="oklch(0.48 0.09 175)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
        <XAxis dataKey="month" stroke="oklch(0.5 0.02 240)" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="oklch(0.5 0.02 240)" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 220)" }} />
        <Area type="monotone" dataKey="bookings" stroke="oklch(0.48 0.09 175)" strokeWidth={2} fill="url(#g1)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={monthlyStats} margin={{ left: -20, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
        <XAxis dataKey="month" stroke="oklch(0.5 0.02 240)" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="oklch(0.5 0.02 240)" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 220)" }} />
        <Bar dataKey="revenue" fill="oklch(0.78 0.15 75)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}