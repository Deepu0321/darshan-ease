import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-1">
      <button disabled={page === 1} onClick={() => onChange(page - 1)} className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:bg-accent disabled:opacity-40">
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: total }).map((_, i) => {
        const p = i + 1;
        const active = p === page;
        return (
          <button key={p} onClick={() => onChange(p)} className={`h-9 min-w-9 rounded-full px-3 text-sm font-medium transition ${active ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]" : "text-muted-foreground hover:bg-accent"}`}>
            {p}
          </button>
        );
      })}
      <button disabled={page === total} onClick={() => onChange(page + 1)} className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:bg-accent disabled:opacity-40">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}