import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminTable, RowActions, ActionBtn } from "@/components/AdminTable";
import { useRequireRole } from "@/hooks/useRequireRole";
import { temples } from "@/data/mockData";
import { items } from "./admin.dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/temples")({
  head: () => ({ meta: [{ title: "Temples — Admin — DarshanEase" }] }),
  component: AdminTemples,
});

function AdminTemples() {
  const user = useRequireRole(["ADMIN"]);
  if (!user) return null;
  return (
    <DashboardLayout title="Admin Console" items={items}>
      <h1 className="mb-6 text-2xl font-bold">Temples</h1>
      <AdminTable rows={temples} columns={[
        { key: "name", label: "Name" },
        { key: "location", label: "Location" },
        { key: "state", label: "State" },
        { key: "category", label: "Category" },
        { key: "rating", label: "Rating", align: "right" },
      ]} actions={(r) => (
        <RowActions>
          <ActionBtn tone="primary" onClick={() => toast.info(`Edit ${r.name}`)}>Edit</ActionBtn>
          <ActionBtn tone="destructive" onClick={() => toast.success("Removed")}>Remove</ActionBtn>
        </RowActions>
      )} />
    </DashboardLayout>
  );
}