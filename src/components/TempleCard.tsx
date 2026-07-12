import { Link } from "@tanstack/react-router";
import { MapPin, Star, Clock } from "lucide-react";
import type { Temple } from "@/data/mockData";

export function TempleCard({ temple }: { temple: Temple }) {
  return (
    <Link
      to="/temples/$id"
      params={{ id: temple.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={temple.image} alt={temple.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-secondary/95 px-3 py-1 text-[11px] font-semibold text-secondary-foreground shadow">
          {temple.category}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          <Star className="h-3 w-3 fill-secondary text-secondary" /> {temple.rating}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="truncate text-lg font-semibold text-foreground group-hover:text-primary">{temple.name}</h3>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{temple.location}, {temple.state}</p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{temple.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" />{temple.timings}</span>
          <span className="text-sm font-semibold text-primary group-hover:underline">Book →</span>
        </div>
      </div>
    </Link>
  );
}