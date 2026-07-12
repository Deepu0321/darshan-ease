import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AdminTable, RowActions, ActionBtn } from "@/components/AdminTable";
import { Modal, ConfirmModal } from "@/components/Modal";
import { useRequireRole } from "@/hooks/useRequireRole";
import { temples as seed, type Temple } from "@/data/mockData";
import { items } from "./organizer.dashboard";

export const Route = createFileRoute("/organizer/temples")({
  head: () => ({ meta: [{ title: "Manage Temples — DarshanEase" }] }),
  component: OrgTemples,
});

function OrgTemples() {
  const user = useRequireRole(["ORGANIZER", "ADMIN"]);
  const [list, setList] = useState<Temple[]>(seed);
  const [editing, setEditing] = useState<Temple | null>(null);
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState<Temple | null>(null);
  const [form, setForm] = useState({ name: "", location: "", state: "", timings: "" });

  if (!user) return null;

  const openCreate = () => { setForm({ name: "", location: "", state: "", timings: "" }); setCreating(true); };
  const openEdit = (t: Temple) => { setForm({ name: t.name, location: t.location, state: t.state, timings: t.timings }); setEditing(t); };

  const save = () => {
    if (!form.name) return toast.error("Name is required");
    if (editing) {
      setList((prev) => prev.map((t) => t.id === editing.id ? { ...t, ...form } : t));
      toast.success("Temple updated");
      setEditing(null);
    } else {
      const t: Temple = { id: crypto.randomUUID(), ...form, description: "Newly added temple", image: seed[0].image, rating: 4.5, facilities: ["Prasadam"], category: "Popular" };
      setList((prev) => [t, ...prev]);
      toast.success("Temple created");
      setCreating(false);
    }
  };

  return (
    <DashboardLayout title="Organizer Panel" items={items}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Temples</h1>
        <button onClick={openCreate} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow"><Plus className="h-4 w-4" /> Add Temple</button>
      </div>
      <AdminTable
        rows={list}
        columns={[
          { key: "name", label: "Name" },
          { key: "location", label: "Location" },
          { key: "state", label: "State" },
          { key: "category", label: "Category", render: (r) => <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{r.category}</span> },
          { key: "rating", label: "Rating", align: "right" },
        ]}
        actions={(r) => (
          <RowActions>
            <ActionBtn tone="primary" onClick={() => openEdit(r)}>Edit</ActionBtn>
            <ActionBtn tone="destructive" onClick={() => setToDelete(r)}>Delete</ActionBtn>
          </RowActions>
        )}
      />
      <Modal open={creating || !!editing} onClose={() => { setCreating(false); setEditing(null); }} title={editing ? "Edit Temple" : "New Temple"} footer={
        <>
          <button onClick={() => { setCreating(false); setEditing(null); }} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">Cancel</button>
          <button onClick={save} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save</button>
        </>
      }>
        <div className="space-y-3">
          {(["name", "location", "state", "timings"] as const).map((k) => (
            <div key={k}>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{k}</label>
              <input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </div>
          ))}
        </div>
      </Modal>
      <ConfirmModal open={!!toDelete} onClose={() => setToDelete(null)} title="Delete temple?" message={`Remove ${toDelete?.name}? This cannot be undone.`} confirmLabel="Delete" tone="destructive" onConfirm={() => { setList((p) => p.filter((x) => x.id !== toDelete?.id)); toast.success("Temple removed"); }} />
    </DashboardLayout>
  );
}