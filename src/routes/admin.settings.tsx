import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useRequireRole } from "@/hooks/useRequireRole";
import { items } from "./admin.dashboard";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Admin — DarshanEase" }] }),
  component: AdminSettings,
});

function AdminSettings() {
  const user = useRequireRole(["ADMIN"]);
  if (!user) return null;
  return (
    <DashboardLayout title="Admin Console" items={items}>
      <h1 className="mb-6 text-2xl font-bold">Platform settings</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "General", desc: "Site name, tagline, timezone." },
          { title: "Payments", desc: "Payment gateways and payout schedule." },
          { title: "Notifications", desc: "Email & SMS templates for devotees." },
          { title: "Security", desc: "Roles, permissions, audit logs." },
        ].map((s) => (
          <div key={s.title} className="rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
            <h3 className="text-base font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            <button onClick={() => toast.info("Settings saved")} className="mt-4 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">Configure</button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}