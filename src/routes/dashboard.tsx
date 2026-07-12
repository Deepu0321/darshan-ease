import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CalendarCheck, HeartHandshake, Sparkles, Ticket, Wallet } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { BookingCard } from "@/components/BookingCard";
import { useAuth } from "@/context/AuthContext";
import { useRequireRole } from "@/hooks/useRequireRole";
import { bookings, donations } from "@/data/mockData";
import { inr } from "@/utils/format";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — DarshanEase" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const user = useRequireRole(["USER", "ORGANIZER", "ADMIN"]);
  const { user: authUser } = useAuth();
  useEffect(() => {}, []);

  const upcoming = bookings.filter((b) => b.status === "Upcoming");
  const totalDonations = donations.reduce((s, d) => s + d.amount, 0);

  if (!user || !authUser) return null;

  return (
    <MainLayout>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-8 text-primary-foreground shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-80">Namaste 🙏</p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{authUser.name}</h1>
              <p className="mt-1 max-w-xl text-sm opacity-90">May your darshan bring peace and prosperity. Here's a quick look at your journey.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/temples" className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow"><Sparkles className="mr-1 inline h-4 w-4" />Book Darshan</Link>
              <Link to="/donations" className="rounded-full bg-primary-foreground/15 px-4 py-2 text-sm font-semibold backdrop-blur"><HeartHandshake className="mr-1 inline h-4 w-4" />Donate</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard label="Upcoming" value={upcoming.length} icon={CalendarCheck} tone="primary" delta="Next: Somnath" />
          <DashboardCard label="Total Bookings" value={bookings.length} icon={Ticket} tone="secondary" />
          <DashboardCard label="Donations" value={inr(totalDonations)} icon={HeartHandshake} tone="primary" />
          <DashboardCard label="Wallet" value={inr(0)} icon={Wallet} tone="muted" />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Upcoming bookings</h2>
              <Link to="/bookings" className="text-sm font-semibold text-primary hover:underline">See all →</Link>
            </div>
            <div className="space-y-3">
              {upcoming.length ? upcoming.map((b) => <BookingCard key={b.id} booking={b} />) : (
                <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">No upcoming bookings yet.</div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Recent donations</h2>
            <div className="space-y-3">
              {donations.slice(0, 3).map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-card)]">
                  <div>
                    <p className="text-sm font-semibold">{d.templeName}</p>
                    <p className="text-xs text-muted-foreground">{d.method} · {d.date}</p>
                  </div>
                  <span className="text-base font-bold text-primary">{inr(d.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}