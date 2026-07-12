import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminTable, RowActions, ActionBtn } from "@/components/AdminTable";
import { SearchBar } from "@/components/SearchBar";
import { useRequireRole } from "@/hooks/useRequireRole";
import { adminUsers } from "@/data/mockData";
import { items } from "./admin.dashboard";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users — Admin — DarshanEase" }] }),
  component: AdminUsers,
});

function AdminUsers() {
  const user = useRequireRole(["ADMIN"]);
  const [q, setQ] = useState("");
  const [list, setList] = useState(adminUsers.filter((u) => u.role === "USER"));
  const filtered = useMemo(() => list.filter((u) => (u.name + u.email).toLowerCase().includes(q.toLowerCase())), [list, q]);
  if (!user) return null;
  return (
    <DashboardLayout title="Admin Console" items={items}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="w-full sm:w-72"><SearchBar value={q} onChange={setQ} placeholder="Search users…" /></div>
      </div>
      <AdminTable rows={filtered} columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "joined", label: "Joined" },
        { key: "bookings", label: "Bookings", align: "center" },
      ]} actions={(r) => (
        <RowActions>
          <ActionBtn tone="primary" onClick={() => toast.info(`View ${r.name}`)}>View</ActionBtn>
          <ActionBtn tone="destructive" onClick={() => { setList((p) => p.filter((x) => x.id !== r.id)); toast.success("User suspended"); }}>Suspend</ActionBtn>
        </RowActions>
      )} />
    </DashboardLayout>
  );
}