import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminTable, RowActions, ActionBtn } from "@/components/AdminTable";
import { useRequireRole } from "@/hooks/useRequireRole";
import { bookings as seed, type Booking } from "@/data/mockData";
import { items } from "./organizer.dashboard";
import { inr, prettyDate } from "@/utils/format";

export const Route = createFileRoute("/organizer/bookings")({
  head: () => ({ meta: [{ title: "Manage Bookings — DarshanEase" }] }),
  component: OrgBookings,
});

function OrgBookings() {
  const user = useRequireRole(["ORGANIZER", "ADMIN"]);
  const [list, setList] = useState<Booking[]>(seed);
  if (!user) return null;
  const set = (id: string, status: Booking["status"]) => {
    setList((p) => p.map((b) => b.id === id ? { ...b, status } : b));
    toast.success(`Booking ${status.toLowerCase()}`);
  };
  return (
    <DashboardLayout title="Organizer Panel" items={items}>
      <h1 className="mb-6 text-2xl font-bold">Bookings</h1>
      <AdminTable rows={list} columns={[
        { key: "ticketNo", label: "Ticket" },
        { key: "templeName", label: "Temple" },
        { key: "date", label: "Date", render: (r) => prettyDate(r.date) },
        { key: "time", label: "Time" },
        { key: "persons", label: "Persons", align: "center" },
        { key: "amount", label: "Amount", align: "right", render: (r) => inr(r.amount) },
        { key: "status", label: "Status", render: (r) => <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.status === "Upcoming" ? "bg-primary/10 text-primary" : r.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-destructive/10 text-destructive"}`}>{r.status}</span> },
      ]} actions={(r) => (
        <RowActions>
          {r.status === "Upcoming" && <ActionBtn tone="primary" onClick={() => set(r.id, "Completed")}>Approve</ActionBtn>}
          {r.status !== "Cancelled" && <ActionBtn tone="destructive" onClick={() => set(r.id, "Cancelled")}>Cancel</ActionBtn>}
        </RowActions>
      )} />
    </DashboardLayout>
  );
}