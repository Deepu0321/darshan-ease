import { Clock, Users } from "lucide-react";
import type { Slot } from "@/data/mockData";
import { inr, prettyDate } from "@/utils/format";

export function SlotCard({ slot, onBook }: { slot: Slot; onBook: (s: Slot) => void }) {
  const soldOut = slot.seats === 0;
  const filling = slot.seats > 0 && slot.seats < 15;
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{prettyDate(slot.date)}</p>
          <p className="mt-1 flex items-center gap-1.5 text-base font-semibold text-foreground"><Clock className="h-4 w-4 text-primary" />{slot.time}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${slot.type === "VIP" ? "bg-secondary/20 text-accent-foreground" : slot.type === "Special" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{slot.type}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-4 w-4" />{slot.seats}/{slot.totalSeats} seats</span>
        <span className="text-lg font-bold text-foreground">{inr(slot.price)}</span>
      </div>
      {filling && <p className="text-xs font-medium text-secondary">Filling fast!</p>}
      <button
        onClick={() => onBook(slot)}
        disabled={soldOut}
        className="mt-1 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
      >
        {soldOut ? "Sold out" : "Book Now"}
      </button>
    </div>
  );
}