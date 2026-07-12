import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — DarshanEase" }] }),
  component: RegisterPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(100),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().regex(/^\+?\d{10,15}$/, "Invalid phone"),
  password: z.string().min(6, "Min 6 characters"),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { message: "Passwords do not match", path: ["confirm"] });

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
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
      const u = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      toast.success(`Welcome, ${u.name}!`);
      navigate({ to: "/dashboard" });
    } catch { toast.error("Registration failed"); }
    finally { setLoading(false); }
  };

  return (
    <MainLayout>
      <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Start your darshan journey with DarshanEase.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {[
              { k: "name", label: "Full Name", type: "text" },
              { k: "email", label: "Email", type: "email" },
              { k: "phone", label: "Phone", type: "tel" },
              { k: "password", label: "Password", type: "password" },
              { k: "confirm", label: "Confirm Password", type: "password" },
            ].map((f) => (
              <div key={f.k}>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{f.label}</label>
                <input type={f.type} value={(form as Record<string, string>)[f.k]} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
                {errors[f.k] && <p className="mt-1 text-xs text-destructive">{errors[f.k]}</p>}
              </div>
            ))}
            <button disabled={loading} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary/90 disabled:opacity-60">
              {loading ? "Creating…" : "Create Account"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already a devotee? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </section>
    </MainLayout>
  );
}