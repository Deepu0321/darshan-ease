import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarCheck, HeartHandshake, MapPin, ShieldCheck, Sparkles, Star, Ticket } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { SearchBar } from "@/components/SearchBar";
import { TempleCard } from "@/components/TempleCard";
import { temples, testimonials, faqs } from "@/data/mockData";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return temples.filter((t) => t.featured);
    return temples.filter((t) => (t.name + t.location + t.state).toLowerCase().includes(term));
  }, [q]);
  const popular = temples.slice(0, 8);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_top,theme(colors.primary/15),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                <Sparkles className="h-3.5 w-3.5" /> 500+ Temples · 1M+ Devotees
              </span>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Book Temple Darshan <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Easily & Securely</span>
              </h1>
              <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
                Skip the queues. Reserve your slot at India's most sacred temples, download your e-ticket instantly and donate with a tap.
              </p>
              <div className="max-w-xl">
                <SearchBar value={q} onChange={setQ} placeholder="Search Somnath, Tirupati, Kashi…" />
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/temples" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary/90">
                  Explore Temples <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/donations" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent">
                  Donate Now <HeartHandshake className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-secondary/40 via-primary/20 to-transparent blur-2xl" />
              <img src={temples[0].image} alt="Temple" className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)] ring-1 ring-border sm:block">
                <p className="text-xs text-muted-foreground">Next available</p>
                <p className="mt-1 text-sm font-semibold">Somnath · Today 6:00 AM</p>
                <p className="mt-1 text-xs text-primary">32 seats left</p>
              </div>
              <div className="absolute -right-4 top-8 hidden rounded-2xl bg-secondary p-3 text-secondary-foreground shadow-lg sm:block">
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Search results */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{q ? "Search Results" : "Featured Temples"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{q ? `${filtered.length} temples match "${q}"` : "Handpicked shrines for the season."}</p>
          </div>
          <Link to="/temples" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">View all →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.slice(0, 4).map((t) => <TempleCard key={t.id} temple={t} />)}
        </div>
      </section>

      {/* Popular */}
      <section className="bg-card/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold text-foreground sm:text-3xl">Popular Right Now</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((t) => <TempleCard key={t.id} temple={t} />)}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Why devotees choose DarshanEase</h2>
          <p className="mt-2 text-sm text-muted-foreground">Peace of mind, from booking to blessing.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarCheck, title: "Instant Booking", desc: "Reserve darshan slots in seconds with real-time seat availability." },
            { icon: Ticket, title: "E-Ticket", desc: "Get your ticket on WhatsApp & email — no printouts, no hassle." },
            { icon: ShieldCheck, title: "Secure Payments", desc: "256-bit encrypted, UPI, cards, netbanking — all trusted." },
            { icon: MapPin, title: "500+ Temples", desc: "Ancient shrines, popular pilgrimages and heritage sites." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow"><f.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-br from-primary to-primary-glow py-14 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center sm:grid-cols-4 sm:px-6">
          {[["500+", "Temples"], ["1M+", "Devotees"], ["24×7", "Support"], ["4.9★", "Avg Rating"]].map(([v, l]) => (
            <div key={l}>
              <p className="text-4xl font-bold sm:text-5xl">{v}</p>
              <p className="mt-1 text-sm opacity-90">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">Blessings from our devotees</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] ring-1 ring-border/60">
              <div className="flex text-secondary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-4 text-sm text-foreground/90">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:text-3xl">Frequently asked</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
                <button onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                  <span className="text-sm font-semibold text-foreground">{f.q}</span>
                  <span className={`text-primary transition ${open ? "rotate-45" : ""}`}>+</span>
                </button>
                {open && <p className="border-t border-border/60 px-5 py-4 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </MainLayout>
  );
}
