import type { ReactNode } from "react";

export interface Column<T> { key: keyof T | string; label: string; render?: (row: T) => ReactNode; align?: "left" | "right" | "center"; }

export function AdminTable<T extends { id: string }>({ columns, rows, actions, empty = "No records" }: { columns: Column<T>[]; rows: T[]; actions?: (row: T) => ReactNode; empty?: string; }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              {columns.map((c) => (
                <th key={String(c.key)} className={`px-4 py-3 text-${c.align ?? "left"} whitespace-nowrap`}>{c.label}</th>
              ))}
              {actions && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-16 text-center text-muted-foreground">{empty}</td></tr>
            ) : rows.map((row) => (
              <tr key={row.id} className="hover:bg-accent/40">
                {columns.map((c) => (
                  <td key={String(c.key)} className={`px-4 py-3 text-${c.align ?? "left"} whitespace-nowrap`}>
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key as string] ?? "—")}
                  </td>
                ))}
                {actions && <td className="px-4 py-3 text-right">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RowActions({ children }: { children: ReactNode }) {
  return <div className="flex justify-end gap-1.5">{children}</div>;
}

export function ActionBtn({ tone = "muted", children, onClick }: { tone?: "muted" | "primary" | "destructive"; children: ReactNode; onClick?: () => void; }) {
  const styles = {
    muted: "border border-border bg-background text-foreground hover:bg-accent",
    primary: "bg-primary/10 text-primary hover:bg-primary/15",
    destructive: "bg-destructive/10 text-destructive hover:bg-destructive/15",
  } as const;
  return <button onClick={onClick} className={`rounded-full px-3 py-1 text-xs font-semibold transition ${styles[tone]}`}>{children}</button>;
}