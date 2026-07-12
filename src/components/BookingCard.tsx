import { Calendar, Clock, Users, Ticket } from "lucide-react";
import type { Booking } from "@/data/mockData";
import { inr, prettyDate } from "@/utils/format";

const tone: Record<Booking["status"], string> = {
  Upcoming: "bg-primary/10 text-primary",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-destructive/10 text-destructive",
};

export function BookingCard({ booking, onCancel, onView }: { booking: Booking; onCancel?: (b: Booking) => void; onView?: (b: Booking) => void; }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-semibold text-foreground">{booking.templeName}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tone[booking.status]}`}>{booking.status}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{prettyDate(booking.date)}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{booking.time}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{booking.persons} persons</span>
          <span className="flex items-center gap-1"><Ticket className="h-3.5 w-3.5" />{booking.ticketNo}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:flex-col sm:items-end">
        <span className="text-lg font-bold text-foreground">{inr(booking.amount)}</span>
        <div className="flex gap-2">
          {onView && (
            <button onClick={() => onView(booking)} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-accent">View Ticket</button>
          )}
          {onCancel && booking.status === "Upcoming" && (
            <button onClick={() => onCancel(booking)} className="rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/20">Cancel</button>
          )}
        </div>
      </div>
    </div>
  );
}