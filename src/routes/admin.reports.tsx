import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { BookingsChart, RevenueChart } from "@/components/StatsChart";
import { useRequireRole } from "@/hooks/useRequireRole";
import { items } from "./admin.dashboard";
import { monthlyStats } from "@/data/mockData";
import { inr } from "@/utils/format";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — Admin — DarshanEase" }] }),
  component: AdminReports,
});

function AdminReports() {
  const user = useRequireRole(["ADMIN"]);
  if (!user) return null;
  return (
    <DashboardLayout title="Admin Console" items={items}>
      <h1 className="mb-6 text-2xl font-bold">Reports & Analytics</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
          <h3 className="mb-4 text-sm font-semibold">Booking volume</h3>
          <BookingsChart />
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
          <h3 className="mb-4 text-sm font-semibold">Revenue</h3>
          <RevenueChart />
        </div>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-4 py-3 text-left">Month</th><th className="px-4 py-3 text-right">Bookings</th><th className="px-4 py-3 text-right">Donations</th><th className="px-4 py-3 text-right">Revenue</th></tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {monthlyStats.map((m) => (
              <tr key={m.month}>
                <td className="px-4 py-3 font-semibold">{m.month}</td>
                <td className="px-4 py-3 text-right">{m.bookings}</td>
                <td className="px-4 py-3 text-right">{inr(m.donations)}</td>
                <td className="px-4 py-3 text-right font-semibold text-primary">{inr(m.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}