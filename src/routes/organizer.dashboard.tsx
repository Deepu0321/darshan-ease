import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Church, HeartHandshake, LayoutDashboard, Ticket, UserCog } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { BookingsChart, RevenueChart } from "@/components/StatsChart";
import { useRequireRole } from "@/hooks/useRequireRole";
import { bookings, donations, temples } from "@/data/mockData";
import { inr } from "@/utils/format";

export const items = [
  { to: "/organizer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/organizer/temples", label: "Temples", icon: Church },
  { to: "/organizer/slots", label: "Slots", icon: CalendarDays },
  { to: "/organizer/bookings", label: "Bookings", icon: Ticket },
  { to: "/organizer/donations", label: "Donations", icon: HeartHandshake },
  { to: "/profile", label: "Profile", icon: UserCog },
];

export const Route = createFileRoute("/organizer/dashboard")({
  head: () => ({ meta: [{ title: "Organizer Dashboard — DarshanEase" }] }),
  component: OrganizerDashboard,
});

function OrganizerDashboard() {
  const user = useRequireRole(["ORGANIZER", "ADMIN"]);
  if (!user) return null;
  const totalDonations = donations.reduce((s, d) => s + d.amount, 0);
  const revenue = bookings.reduce((s, b) => s + b.amount, 0);
  return (
    <DashboardLayout title="Organizer Panel" items={items} subtitle={`Welcome, ${user.name}`}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Temples" value={temples.length} icon={Church} tone="primary" />
        <DashboardCard label="Bookings" value={bookings.length} icon={Ticket} tone="secondary" />
        <DashboardCard label="Donations" value={inr(totalDonations)} icon={HeartHandshake} tone="primary" />
        <DashboardCard label="Revenue" value={inr(revenue)} icon={CalendarDays} tone="muted" delta="+12% this month" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
          <h3 className="mb-4 text-sm font-semibold">Bookings trend</h3>
          <BookingsChart />
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
          <h3 className="mb-4 text-sm font-semibold">Revenue</h3>
          <RevenueChart />
        </div>
      </div>
    </DashboardLayout>
  );
}