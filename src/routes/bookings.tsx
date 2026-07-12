import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MainLayout } from "@/layouts/MainLayout";
import { BookingCard } from "@/components/BookingCard";
import { ConfirmModal, Modal } from "@/components/Modal";
import { useRequireRole } from "@/hooks/useRequireRole";
import { bookings as seed, type Booking } from "@/data/mockData";
import { prettyDate } from "@/utils/format";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "My Bookings — DarshanEase" }] }),
  component: BookingsPage,
});

function BookingsPage() {
  const user = useRequireRole(["USER", "ORGANIZER", "ADMIN"]);
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");
  const [list, setList] = useState<Booking[]>(seed);
  const [toCancel, setToCancel] = useState<Booking | null>(null);
  const [ticket, setTicket] = useState<Booking | null>(null);

  const filtered = list.filter((b) => tab === "Upcoming" ? b.status === "Upcoming" : b.status !== "Upcoming");

  const cancel = (b: Booking) => {
    setList((prev) => prev.map((x) => x.id === b.id ? { ...x, status: "Cancelled" } : x));
    toast.success("Booking cancelled. Refund will be processed in 5-7 days.");
  };

  if (!user) return null;

  return (
    <MainLayout>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage upcoming and view past darshan bookings.</p>
        <div className="mt-6 inline-flex rounded-full bg-muted p-1">
          {(["Upcoming", "Past"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${tab === t ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          {filtered.length ? filtered.map((b) => <BookingCard key={b.id} booking={b} onCancel={setToCancel} onView={setTicket} />) : (
            <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
              <p className="text-lg font-semibold">No {tab.toLowerCase()} bookings</p>
              <p className="mt-1 text-sm text-muted-foreground">You'll see them here once you book a darshan.</p>
            </div>
          )}
        </div>
      </section>

      <ConfirmModal open={!!toCancel} onClose={() => setToCancel(null)} title="Cancel booking?" message={`Are you sure you want to cancel your ${toCancel?.templeName} darshan?`} confirmLabel="Yes, cancel" tone="destructive" onConfirm={() => toCancel && cancel(toCancel)} />

      <Modal open={!!ticket} onClose={() => setTicket(null)} title="E-Ticket" footer={
        <button onClick={() => { toast.success("Ticket downloaded"); setTicket(null); }} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Download</button>
      }>
        {ticket && (
          <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary/5 to-secondary/10 p-6 text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">DarshanEase Ticket</p>
            <p className="mt-3 text-xl font-bold text-foreground">{ticket.templeName}</p>
            <p className="text-sm text-muted-foreground">{prettyDate(ticket.date)} · {ticket.time}</p>
            <p className="mt-3 text-2xl font-mono font-bold tracking-wider text-primary">{ticket.ticketNo}</p>
            <p className="mt-3 text-xs text-muted-foreground">{ticket.persons} person(s) · Please carry an ID proof.</p>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}