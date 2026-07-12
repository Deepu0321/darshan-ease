import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminTable } from "@/components/AdminTable";
import { useRequireRole } from "@/hooks/useRequireRole";
import { slots, temples } from "@/data/mockData";
import { items } from "./admin.dashboard";
import { inr, prettyDate } from "@/utils/format";

export const Route = createFileRoute("/admin/slots")({
  head: () => ({ meta: [{ title: "Slots — Admin — DarshanEase" }] }),
  component: AdminSlots,
});

function AdminSlots() {
  const user = useRequireRole(["ADMIN"]);
  if (!user) return null;
  const nameOf = (id: string) => temples.find((t) => t.id === id)?.name ?? "—";
  return (
    <DashboardLayout title="Admin Console" items={items}>
      <h1 className="mb-6 text-2xl font-bold">All slots</h1>
      <AdminTable rows={slots} columns={[
        { key: "temple", label: "Temple", render: (r) => nameOf(r.templeId) },
        { key: "date", label: "Date", render: (r) => prettyDate(r.date) },
        { key: "time", label: "Time" },
        { key: "type", label: "Type" },
        { key: "seats", label: "Seats", render: (r) => `${r.seats}/${r.totalSeats}` },
        { key: "price", label: "Price", align: "right", render: (r) => inr(r.price) },
      ]} />
    </DashboardLayout>
  );
}