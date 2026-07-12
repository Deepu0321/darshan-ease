import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminTable } from "@/components/AdminTable";
import { useRequireRole } from "@/hooks/useRequireRole";
import { donations } from "@/data/mockData";
import { items } from "./organizer.dashboard";
import { inr, prettyDate } from "@/utils/format";

export const Route = createFileRoute("/organizer/donations")({
  head: () => ({ meta: [{ title: "Donations — DarshanEase" }] }),
  component: OrgDonations,
});

function OrgDonations() {
  const user = useRequireRole(["ORGANIZER", "ADMIN"]);
  if (!user) return null;
  return (
    <DashboardLayout title="Organizer Panel" items={items}>
      <h1 className="mb-6 text-2xl font-bold">Donations Received</h1>
      <AdminTable rows={donations} columns={[
        { key: "templeName", label: "Temple" },
        { key: "method", label: "Method" },
        { key: "date", label: "Date", render: (r) => prettyDate(r.date) },
        { key: "amount", label: "Amount", align: "right", render: (r) => inr(r.amount) },
      ]} />
    </DashboardLayout>
  );
}