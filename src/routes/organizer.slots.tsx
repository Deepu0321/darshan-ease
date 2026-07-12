import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminTable, RowActions, ActionBtn } from "@/components/AdminTable";
import { ConfirmModal } from "@/components/Modal";
import { useRequireRole } from "@/hooks/useRequireRole";
import { slots as seed, temples, type Slot } from "@/data/mockData";
import { items } from "./organizer.dashboard";
import { inr, prettyDate } from "@/utils/format";

export const Route = createFileRoute("/organizer/slots")({
  head: () => ({ meta: [{ title: "Manage Slots — DarshanEase" }] }),
  component: OrgSlots,
});

function OrgSlots() {
  const user = useRequireRole(["ORGANIZER", "ADMIN"]);
  const [list, setList] = useState<Slot[]>(seed);
  const [toDelete, setToDelete] = useState<Slot | null>(null);
  if (!user) return null;
  const nameOf = (id: string) => temples.find((t) => t.id === id)?.name ?? "—";
  return (
    <DashboardLayout title="Organizer Panel" items={items}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Darshan Slots</h1>
        <button onClick={() => toast.info("Slot creation form (dummy)")} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow"><Plus className="h-4 w-4" /> Add Slot</button>
      </div>
      <AdminTable rows={list} columns={[
        { key: "temple", label: "Temple", render: (r) => nameOf(r.templeId) },
        { key: "date", label: "Date", render: (r) => prettyDate(r.date) },
        { key: "time", label: "Time" },
        { key: "type", label: "Type" },
        { key: "seats", label: "Seats", render: (r) => `${r.seats}/${r.totalSeats}` },
        { key: "price", label: "Price", align: "right", render: (r) => inr(r.price) },
      ]} actions={(r) => (
        <RowActions>
          <ActionBtn tone="primary" onClick={() => toast.info("Edit slot (dummy)")}>Edit</ActionBtn>
          <ActionBtn tone="destructive" onClick={() => setToDelete(r)}>Delete</ActionBtn>
        </RowActions>
      )} />
      <ConfirmModal open={!!toDelete} onClose={() => setToDelete(null)} title="Delete slot?" message="Devotees with active bookings will be refunded." confirmLabel="Delete" tone="destructive" onConfirm={() => { setList((p) => p.filter((x) => x.id !== toDelete?.id)); toast.success("Slot removed"); }} />
    </DashboardLayout>
  );
}