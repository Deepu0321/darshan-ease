import { Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-soft)] ring-1 ring-primary/20 transition-transform group-hover:scale-105">
        <Flame className="h-5 w-5 text-primary-foreground" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight text-foreground">DarshanEase</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">Temple Booking</span>
        </span>
      )}
    </Link>
  );
}