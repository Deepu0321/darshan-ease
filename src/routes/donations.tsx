import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { DonationModal } from "@/components/DonationModal";
import { useRequireRole } from "@/hooks/useRequireRole";
import { donations } from "@/data/mockData";
import { inr, prettyDate } from "@/utils/format";

export const Route = createFileRoute("/donations")({
  head: () => ({ meta: [{ title: "Donations — DarshanEase" }] }),
  component: DonationsPage,
});

function DonationsPage() {
  const user = useRequireRole(["USER", "ORGANIZER", "ADMIN"]);
  const [open, setOpen] = useState(false);
  const total = donations.reduce((s, d) => s + d.amount, 0);
  if (!user) return null;
  return (
    <MainLayout>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Donations</h1>
            <p className="mt-1 text-sm text-muted-foreground">You've contributed <span className="font-semibold text-primary">{inr(total)}</span> to sacred temples.</p>
          </div>
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-[var(--shadow-soft)]"><HeartHandshake className="h-4 w-4" /> New Donation</button>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left">Temple</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Method</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {donations.map((d) => (
                <tr key={d.id} className="hover:bg-accent/40">
                  <td className="px-5 py-3 font-semibold">{d.templeName}</td>
                  <td className="px-5 py-3 text-muted-foreground">{prettyDate(d.date)}</td>
                  <td className="px-5 py-3"><span className="rounded-full bg-muted px-2 py-0.5 text-xs">{d.method}</span></td>
                  <td className="px-5 py-3 text-right font-bold text-primary">{inr(d.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <DonationModal open={open} onClose={() => setOpen(false)} />
    </MainLayout>
  );
}