import { useState } from "react";
import { toast } from "sonner";
import { Modal } from "./Modal";
import { temples } from "@/data/mockData";
import { inr } from "@/utils/format";

const presets = [501, 1100, 2100, 5100];

export function DonationModal({ open, onClose, defaultTempleId }: { open: boolean; onClose: () => void; defaultTempleId?: string; }) {
  const [templeId, setTempleId] = useState(defaultTempleId ?? temples[0].id);
  const [amount, setAmount] = useState<number>(1100);
  const [method, setMethod] = useState<"UPI" | "Card" | "Netbanking">("UPI");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (amount < 1) return toast.error("Enter a valid amount");
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success(`Donation of ${inr(amount)} received. Blessings!`);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Make a Donation" footer={
      <>
        <button onClick={onClose} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">Cancel</button>
        <button disabled={submitting} onClick={submit} className="rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground shadow-[var(--shadow-soft)] disabled:opacity-60">{submitting ? "Processing…" : `Donate ${inr(amount)}`}</button>
      </>
    }>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Temple</label>
          <select value={templeId} onChange={(e) => setTempleId(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm">
            {temples.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</label>
          <div className="mb-2 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button key={p} type="button" onClick={() => setAmount(p)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${amount === p ? "bg-secondary text-secondary-foreground" : "border border-border bg-background text-foreground"}`}>{inr(p)}</button>
            ))}
          </div>
          <input type="number" value={amount} min={1} onChange={(e) => setAmount(Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Payment</label>
          <div className="flex flex-wrap gap-2">
            {(["UPI", "Card", "Netbanking"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMethod(m)} className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${method === m ? "border-primary bg-primary/5 text-primary" : "border-border bg-background text-foreground"}`}>{m}</button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}