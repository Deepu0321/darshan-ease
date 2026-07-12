import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminTable } from "@/components/AdminTable";
import { useRequireRole } from "@/hooks/useRequireRole";
import { bookings } from "@/data/mockData";
import { items } from "./admin.dashboard";
import { inr, prettyDate } from "@/utils/format";

export const Route = createFileRoute("/admin/bookings")({
  head: () => ({ meta: [{ title: "Bookings — Admin — DarshanEase" }] }),
  component: AdminBookings,
});

function AdminBookings() {
  const user = useRequireRole(["ADMIN"]);
  if (!user) return null;
  return (
    <DashboardLayout title="Admin Console" items={items}>
      <h1 className="mb-6 text-2xl font-bold">All bookings</h1>
      <AdminTable rows={bookings} columns={[
        { key: "ticketNo", label: "Ticket" },
        { key: "templeName", label: "Temple" },
        { key: "date", label: "Date", render: (r) => prettyDate(r.date) },
        { key: "time", label: "Time" },
        { key: "persons", label: "Persons", align: "center" },
        { key: "amount", label: "Amount", align: "right", render: (r) => inr(r.amount) },
        { key: "status", label: "Status" },
      ]} />
    </DashboardLayout>
  );
}