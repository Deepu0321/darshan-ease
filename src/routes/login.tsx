import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — DarshanEase" }] }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      return setErrors(errs);
    }
    setErrors({});
    setLoading(true);
    try {
      const u = await login(form.email, form.password);
      toast.success(`Welcome back, ${u.name.split(" ")[0]}!`);
      navigate({ to: u.role === "ADMIN" ? "/admin/dashboard" : u.role === "ORGANIZER" ? "/organizer/dashboard" : "/dashboard" });
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to book darshan and manage your bookings.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary" placeholder="you@example.com" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type={show ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-9 text-sm outline-none focus:border-primary" placeholder="••••••••" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground hover:bg-accent">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded accent-primary" /> Remember me</label>
              <a href="#" className="font-medium text-primary hover:underline">Forgot?</a>
            </div>
            <button disabled={loading} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary/90 disabled:opacity-60">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Try <code className="rounded bg-muted px-1.5 py-0.5">admin@…</code>, <code className="rounded bg-muted px-1.5 py-0.5">organizer@…</code> or any email to preview roles.
          </p>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here? <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link>
          </p>
        </div>
      </section>
    </MainLayout>
  );
}