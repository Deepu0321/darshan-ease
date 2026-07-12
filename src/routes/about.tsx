import { createFileRoute } from "@tanstack/react-router";
import { Award, HeartHandshake, Sparkles, Target, Eye, Users } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — DarshanEase" }, { name: "description", content: "About DarshanEase: mission, vision and temple services." }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <MainLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground"><Sparkles className="h-3.5 w-3.5" /> About Us</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">A bridge between devotees and divinity</h1>
          <p className="mt-4 text-base text-muted-foreground">DarshanEase is born from a simple thought — every devotee deserves a peaceful darshan, without queues, brokers or confusion.</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, title: "Our Mission", desc: "Empower every devotee with easy, transparent and dignified access to sacred temples across India." },
            { icon: Eye, title: "Our Vision", desc: "To become India's most trusted digital gateway to spirituality — connecting 100M devotees by 2030." },
            { icon: HeartHandshake, title: "Our Values", desc: "Devotion, integrity, service and technology used with humility to serve the sanatan community." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <img src="https://images.unsplash.com/photo-1580852300513-b7d1c7ce1ce7?auto=format&fit=crop&w=1200&q=70" alt="Temple" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">What we offer</h2>
            <ul className="mt-6 space-y-4">
              {[
                ["Darshan Slot Booking", "Real-time seat availability across 500+ temples."],
                ["Special & VIP Darshan", "Skip-the-line experiences with priority entry."],
                ["Prasadam & Seva", "Home-delivered prasadam and sponsored sevas."],
                ["Trust Donations", "80G-eligible donations to registered temple trusts."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary/20 text-accent-foreground"><Award className="h-3.5 w-3.5" /></span>
                  <div>
                    <p className="font-semibold text-foreground">{t}</p>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-10 text-center text-primary-foreground">
          <Users className="mx-auto h-10 w-10" />
          <h3 className="mt-4 text-2xl font-bold">A team of devotees, engineers and temple partners</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm opacity-90">Working from Ahmedabad, Bengaluru and Varanasi to serve you.</p>
        </div>
      </section>
    </MainLayout>
  );
}