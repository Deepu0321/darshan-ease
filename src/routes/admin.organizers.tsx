import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminTable, RowActions, ActionBtn } from "@/components/AdminTable";
import { useRequireRole } from "@/hooks/useRequireRole";
import { adminUsers } from "@/data/mockData";
import { items } from "./admin.dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/organizers")({
  head: () => ({ meta: [{ title: "Organizers — Admin — DarshanEase" }] }),
  component: AdminOrganizers,
});

function AdminOrganizers() {
  const user = useRequireRole(["ADMIN"]);
  if (!user) return null;
  const rows = adminUsers.filter((u) => u.role === "ORGANIZER");
  return (
    <DashboardLayout title="Admin Console" items={items}>
      <h1 className="mb-6 text-2xl font-bold">Organizers</h1>
      <AdminTable rows={rows} columns={[
        { key: "name", label: "Organization" },
        { key: "email", label: "Email" },
        { key: "joined", label: "Joined" },
      ]} actions={() => (
        <RowActions>
          <ActionBtn tone="primary" onClick={() => toast.success("Verified")}>Verify</ActionBtn>
          <ActionBtn tone="destructive" onClick={() => toast.success("Revoked")}>Revoke</ActionBtn>
        </RowActions>
      )} />
    </DashboardLayout>
  );
}