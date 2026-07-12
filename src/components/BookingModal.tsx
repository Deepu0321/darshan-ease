import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Modal } from "./Modal";
import type { Slot, Temple } from "@/data/mockData";
import { inr, prettyDate } from "@/utils/format";

export function BookingModal({ open, onClose, slot, temple }: { open: boolean; onClose: () => void; slot: Slot | null; temple: Temple | null; }) {
  const [persons, setPersons] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const total = useMemo(() => (slot ? slot.price * persons : 0), [slot, persons]);

  const submit = async () => {
    if (!slot) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Booking confirmed! Ticket sent to your email.");
    setPersons(1);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Confirm Booking" footer={
      <>
        <button onClick={onClose} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">Cancel</button>
        <button disabled={submitting} onClick={submit} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] disabled:opacity-60">
          {submitting ? "Booking…" : `Pay ${inr(total)}`}
        </button>
      </>
    }>
      {slot && temple && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-sm font-semibold text-foreground">{temple.name}</p>
            <p className="text-xs text-muted-foreground">{prettyDate(slot.date)} · {slot.time} · {slot.type}</p>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Persons</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setPersons((p) => Math.max(1, p - 1))} className="grid h-9 w-9 place-items-center rounded-full border border-border">−</button>
              <span className="w-8 text-center text-lg font-semibold">{persons}</span>
              <button onClick={() => setPersons((p) => Math.min(10, p + 1))} className="grid h-9 w-9 place-items-center rounded-full border border-border">+</button>
              <span className="ml-auto text-xs text-muted-foreground">{inr(slot.price)} / person</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border/60 pt-3">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-bold text-foreground">{inr(total)}</span>
          </div>
        </div>
      )}
    </Modal>
  );
}