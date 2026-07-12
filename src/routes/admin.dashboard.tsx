import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CalendarDays, Church, HeartHandshake, LayoutDashboard, Settings, Ticket, TrendingUp, Users, UserCog } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { BookingsChart, RevenueChart } from "@/components/StatsChart";
import { useRequireRole } from "@/hooks/useRequireRole";
import { adminUsers, bookings, donations, temples } from "@/data/mockData";
import { inr } from "@/utils/format";

export const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/organizers", label: "Organizers", icon: UserCog },
  { to: "/admin/temples", label: "Temples", icon: Church },
  { to: "/admin/slots", label: "Slots", icon: CalendarDays },
  { to: "/admin/bookings", label: "Bookings", icon: Ticket },
  { to: "/admin/donations", label: "Donations", icon: HeartHandshake },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — DarshanEase" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const user = useRequireRole(["ADMIN"]);
  if (!user) return null;
  const totalUsers = adminUsers.filter((u) => u.role === "USER").length;
  const totalOrganizers = adminUsers.filter((u) => u.role === "ORGANIZER").length;
  const revenue = bookings.reduce((s, b) => s + b.amount, 0) + donations.reduce((s, d) => s + d.amount, 0);
  return (
    <DashboardLayout title="Admin Console" items={items} subtitle="Bird's eye view of the platform.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <DashboardCard label="Users" value={totalUsers} icon={Users} tone="primary" delta="+18 this week" />
        <DashboardCard label="Organizers" value={totalOrganizers} icon={UserCog} tone="secondary" />
        <DashboardCard label="Temples" value={temples.length} icon={Church} tone="primary" />
        <DashboardCard label="Bookings" value={bookings.length} icon={Ticket} tone="muted" />
        <DashboardCard label="Revenue" value={inr(revenue)} icon={TrendingUp} tone="secondary" delta="+24% MoM" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
          <h3 className="mb-4 text-sm font-semibold">Booking trend</h3>
          <BookingsChart />
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
          <h3 className="mb-4 text-sm font-semibold">Monthly revenue</h3>
          <RevenueChart />
        </div>
      </div>
    </DashboardLayout>
  );
}