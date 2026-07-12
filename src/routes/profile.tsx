import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useRequireRole } from "@/hooks/useRequireRole";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — DarshanEase" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = useRequireRole(["USER", "ORGANIZER", "ADMIN"]);
  const { updateProfile } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: user.name, email: user.email, phone: user.phone ?? "" }));
  }, [user]);

  if (!user) return null;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    updateProfile({ name: form.name, email: form.email, phone: form.phone });
    setSaving(false);
    toast.success("Profile updated");
  };

  return (
    <MainLayout>
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account information.</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="rounded-3xl border border-border/60 bg-card p-6 text-center shadow-[var(--shadow-card)]">
            <div className="relative mx-auto h-28 w-28">
              <div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-4xl font-bold text-primary-foreground shadow-[var(--shadow-soft)]">
                {user.name.slice(0, 1).toUpperCase()}
              </div>
              <button className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-card bg-secondary text-secondary-foreground shadow"><Camera className="h-3.5 w-3.5" /></button>
            </div>
            <p className="mt-4 text-lg font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">{user.role}</span>
          </div>
          <form onSubmit={save} className="space-y-4 rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
            {[
              { k: "name", label: "Full Name", type: "text" },
              { k: "email", label: "Email", type: "email" },
              { k: "phone", label: "Phone", type: "tel" },
              { k: "password", label: "New Password", type: "password", placeholder: "Leave empty to keep current" },
            ].map((f) => (
              <div key={f.k}>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={(form as Record<string, string>)[f.k]} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
            ))}
            <button disabled={saving} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary/90 disabled:opacity-60">{saving ? "Saving…" : "Save Changes"}</button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}