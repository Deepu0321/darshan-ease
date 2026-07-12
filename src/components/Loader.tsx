import { Flame } from "lucide-react";

export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <span className="grid h-12 w-12 animate-pulse place-items-center rounded-full bg-primary/10">
        <Flame className="h-6 w-6 animate-bounce text-primary" />
      </span>
      <span className="text-sm">{label}…</span>
    </div>
  );
}

export function SkeletonCard() {
  return <div className="h-56 animate-pulse rounded-2xl bg-muted" />;
}