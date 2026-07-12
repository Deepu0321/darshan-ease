import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — DarshanEase" }, { name: "description", content: "Get in touch with the DarshanEase team." }] }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Enter a valid email"),
  subject: z.string().trim().min(3, "Subject required").max(120),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Message sent! We'll reply within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <MainLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in touch</h1>
          <p className="mt-3 text-muted-foreground">We'd love to hear from you. Our team responds within 24 hours.</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {[
              { icon: MapPin, title: "Head Office", val: "Somnath Rd, Prabhas Patan, Gujarat 362268" },
              { icon: Phone, title: "Phone", val: "+91 98765 43210" },
              { icon: Mail, title: "Email", val: "hello@darshanease.in" },
            ].map((c) => (
              <div key={c.title} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold text-foreground">{c.title}</p>
                  <p className="text-sm text-muted-foreground">{c.val}</p>
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
              <div className="grid aspect-[16/10] w-full place-items-center bg-gradient-to-br from-primary/10 to-secondary/10 text-muted-foreground">
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-primary" />
                  <p className="mt-2 text-sm font-medium">Google Map placeholder</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
            {(["name", "email", "subject"] as const).map((k) => (
              <div key={k}>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{k}</label>
                <input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
                {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
              </div>
            ))}
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <button disabled={submitting} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary/90 disabled:opacity-60">
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}