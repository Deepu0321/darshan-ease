import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { SlotCard } from "@/components/SlotCard";
import { BookingModal } from "@/components/BookingModal";
import { slots, temples, type Slot } from "@/data/mockData";

export const Route = createFileRoute("/slots/$id")({
  head: () => ({ meta: [{ title: "Slots — DarshanEase" }] }),
  component: SlotsForTemple,
});

function SlotsForTemple() {
  const { id } = Route.useParams();
  const temple = temples.find((t) => t.id === id);
  const list = slots.filter((s) => s.templeId === id);
  const [picked, setPicked] = useState<Slot | null>(null);

  if (!temple) return (
    <MainLayout>
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Temple not found</h1>
        <Link to="/temples" className="mt-4 inline-block text-primary">← Back to temples</Link>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Link to="/temples/$id" params={{ id }} className="text-sm text-primary hover:underline">← Back to {temple.name}</Link>
        <h1 className="mt-3 text-3xl font-bold">Darshan slots · {temple.name}</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => <SlotCard key={s.id} slot={s} onBook={setPicked} />)}
        </div>
      </section>
      <BookingModal open={!!picked} onClose={() => setPicked(null)} slot={picked} temple={temple} />
    </MainLayout>
  );
}