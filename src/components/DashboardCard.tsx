import type { LucideIcon } from "lucide-react";

export function DashboardCard({ label, value, icon: Icon, delta, tone = "primary" }: {
  label: string; value: string | number; icon: LucideIcon; delta?: string; tone?: "primary" | "secondary" | "muted";
}) {
  const toneMap = {
    primary: "from-primary/15 to-primary/0 text-primary",
    secondary: "from-secondary/25 to-secondary/0 text-accent-foreground",
    muted: "from-muted to-muted/0 text-muted-foreground",
  } as const;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-card)]">
      <div className={`absolute -right-6 -top-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br ${toneMap[tone]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
      {delta && <p className="mt-1 text-xs font-medium text-emerald-600">{delta}</p>}
    </div>
  );
}