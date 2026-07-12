import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Star, HeartHandshake, CheckCircle2 } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { SlotCard } from "@/components/SlotCard";
import { BookingModal } from "@/components/BookingModal";
import { DonationModal } from "@/components/DonationModal";
import { temples, slots, type Slot } from "@/data/mockData";

export const Route = createFileRoute("/temples/$id")({
  head: ({ params }) => {
    const t = temples.find((x) => x.id === params.id);
    return { meta: [{ title: t ? `${t.name} — DarshanEase` : "Temple — DarshanEase" }, { name: "description", content: t?.description ?? "Book darshan at India's most sacred temples." }] };
  },
  component: TempleDetail,
  notFoundComponent: TempleNotFound,
});

function TempleNotFound() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Temple not found</h1>
        <p className="mt-2 text-muted-foreground">The temple you're looking for doesn't exist.</p>
        <Link to="/temples" className="mt-6 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Browse temples</Link>
      </div>
    </MainLayout>
  );
}

function TempleDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const temple = temples.find((t) => t.id === id);
  const templeSlots = slots.filter((s) => s.templeId === id);
  const [pickedSlot, setPickedSlot] = useState<Slot | null>(null);
  const [donateOpen, setDonateOpen] = useState(false);

  if (!temple) return <TempleNotFound />;

  return (
    <MainLayout>
      <section className="relative">
        <img src={temple.image} alt={temple.name} className="h-[45vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <button onClick={() => navigate({ to: "/temples" })} className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-card/90 px-3 py-1.5 text-sm font-medium shadow backdrop-blur">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </section>

      <section className="mx-auto -mt-20 max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">{temple.category}</span>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{temple.name}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary" />{temple.location}, {temple.state}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1.5 text-sm font-semibold text-accent-foreground"><Star className="h-4 w-4 fill-secondary text-secondary" />{temple.rating}</span>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary"><Clock className="h-4 w-4" />{temple.timings}</span>
              <button onClick={() => setDonateOpen(true)} className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-secondary-foreground shadow"><HeartHandshake className="h-4 w-4" /> Donate</button>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/85">{temple.description}</p>
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {temple.facilities.map((f) => (
                <span key={f} className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-primary" />{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold">Available darshan slots</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templeSlots.map((s) => <SlotCard key={s.id} slot={s} onBook={setPickedSlot} />)}
        </div>
      </section>

      <BookingModal open={!!pickedSlot} onClose={() => setPickedSlot(null)} slot={pickedSlot} temple={temple} />
      <DonationModal open={donateOpen} onClose={() => setDonateOpen(false)} defaultTempleId={temple.id} />
    </MainLayout>
  );
}