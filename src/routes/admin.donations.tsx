import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminTable } from "@/components/AdminTable";
import { useRequireRole } from "@/hooks/useRequireRole";
import { donations } from "@/data/mockData";
import { items } from "./admin.dashboard";
import { inr, prettyDate } from "@/utils/format";

export const Route = createFileRoute("/admin/donations")({
  head: () => ({ meta: [{ title: "Donations — Admin — DarshanEase" }] }),
  component: AdminDonations,
});

function AdminDonations() {
  const user = useRequireRole(["ADMIN"]);
  if (!user) return null;
  return (
    <DashboardLayout title="Admin Console" items={items}>
      <h1 className="mb-6 text-2xl font-bold">Donations</h1>
      <AdminTable rows={donations} columns={[
        { key: "templeName", label: "Temple" },
        { key: "method", label: "Method" },
        { key: "date", label: "Date", render: (r) => prettyDate(r.date) },
        { key: "amount", label: "Amount", align: "right", render: (r) => inr(r.amount) },
      ]} />
    </DashboardLayout>
  );
}