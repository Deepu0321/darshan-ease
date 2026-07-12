import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";

export interface SidebarItem { to: string; label: string; icon: LucideIcon; }

export function Sidebar({ title, items }: { title: string; items: SidebarItem[] }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();
  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-6 bg-sidebar p-6 text-sidebar-foreground lg:flex">
      <Logo />
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/60">{title}</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          return (
            <Link key={item.to} to={item.to as never} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow" : "text-sidebar-foreground/85 hover:bg-sidebar-accent"}`}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="rounded-2xl bg-sidebar-accent p-4">
        <p className="truncate text-sm font-semibold">{user?.name ?? "Guest"}</p>
        <p className="truncate text-xs text-sidebar-foreground/70">{user?.email ?? "—"}</p>
        <button onClick={logout} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-sidebar-primary py-1.5 text-xs font-semibold text-sidebar-primary-foreground transition hover:opacity-90">
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </div>
    </aside>
  );
}

export function MobileTabs({ items }: { items: SidebarItem[] }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {items.map((i) => {
        const active = pathname === i.to;
        return (
          <Link key={i.to} to={i.to as never} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition ${active ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground"}`}>
            <i.icon className="h-3.5 w-3.5" /> {i.label}
          </Link>
        );
      })}
    </div>
  );
}