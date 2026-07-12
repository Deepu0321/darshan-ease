import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";
import { SearchBar } from "@/components/SearchBar";
import { TempleCard } from "@/components/TempleCard";
import { Pagination } from "@/components/Pagination";
import { temples, type Temple } from "@/data/mockData";

export const Route = createFileRoute("/temples/")({
  head: () => ({ meta: [{ title: "Temples — DarshanEase" }, { name: "description", content: "Browse 500+ temples across India and book darshan slots." }] }),
  component: TemplesPage,
});

const cats: Array<Temple["category"] | "All"> = ["All", "Ancient", "Popular", "Heritage", "Pilgrimage"];
const PAGE = 8;

function TemplesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => temples.filter((t) => {
    const matchQ = (t.name + t.location + t.state).toLowerCase().includes(q.toLowerCase().trim());
    const matchC = cat === "All" || t.category === cat;
    return matchQ && matchC;
  }), [q, cat]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const paged = filtered.slice((page - 1) * PAGE, page * PAGE);

  return (
    <MainLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Explore temples</h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} sacred shrines to visit</p>
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <SearchBar value={q} onChange={(v) => { setQ(v); setPage(1); }} />
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
            {cats.map((c) => (
              <button key={c} onClick={() => { setCat(c); setPage(1); }} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${cat === c ? "bg-primary text-primary-foreground shadow" : "border border-border bg-card text-foreground"}`}>{c}</button>
            ))}
          </div>
        </div>
        {paged.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <p className="text-lg font-semibold">No temples found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different city or category.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {paged.map((t) => <TempleCard key={t.id} temple={t} />)}
          </div>
        )}
        <Pagination page={page} total={totalPages} onChange={setPage} />
      </section>
    </MainLayout>
  );
}