import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, LogIn, LogOut, Menu, Moon, Sun, User, X } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/temples", label: "Temples" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const userLinks = [
  { to: "/bookings", label: "Bookings" },
  { to: "/donations", label: "Donations" },
] as const;

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" : user?.role === "ORGANIZER" ? "/organizer/dashboard" : "/dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {publicLinks.map((l) => (
            <Link key={l.to} to={l.to} className={`rounded-full px-4 py-2 text-sm font-medium transition ${pathname === l.to ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-foreground"}`}>
              {l.label}
            </Link>
          ))}
          {user && userLinks.map((l) => (
            <Link key={l.to} to={l.to} className={`rounded-full px-4 py-2 text-sm font-medium transition ${pathname === l.to ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-foreground"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={toggle} className="hidden h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-accent md:grid">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          {user ? (
            <>
              <button className="hidden h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-accent md:grid" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </button>
              <div className="relative">
                <button onClick={() => setMenu((m) => !m)} className="flex items-center gap-2 rounded-full border border-border/60 bg-card py-1 pl-1 pr-3 shadow-[var(--shadow-card)] transition hover:bg-accent">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground">
                    {user.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="hidden text-sm font-medium text-foreground sm:inline">{user.name.split(" ")[0]}</span>
                </button>
                {menu && (
                  <div onMouseLeave={() => setMenu(false)} className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-popover shadow-lg">
                    <div className="border-b border-border/60 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      <p className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">{user.role}</p>
                    </div>
                    <Link to={dashboardHref as never} onClick={() => setMenu(false)} className="block px-4 py-2 text-sm text-foreground hover:bg-accent">Dashboard</Link>
                    <Link to="/profile" onClick={() => setMenu(false)} className="block px-4 py-2 text-sm text-foreground hover:bg-accent">Profile</Link>
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 border-t border-border/60 px-4 py-2 text-sm text-destructive hover:bg-destructive/5">
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
                <span className="flex items-center gap-1.5"><LogIn className="h-4 w-4" /> Login</span>
              </Link>
              <Link to="/register" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:bg-primary/90">Register</Link>
            </div>
          )}
          <button onClick={() => setOpen((o) => !o)} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-accent md:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {[...publicLinks, ...(user ? userLinks : [])].map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent">{l.label}</Link>
            ))}
            {!user && (
              <div className="mt-2 flex gap-2">
                <Link to="/login" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-center text-sm font-medium">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground">Register</Link>
              </div>
            )}
            {user && (
              <>
                <Link to="/profile" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent"><User className="mr-2 inline h-4 w-4" />Profile</Link>
                <button onClick={() => { setOpen(false); handleLogout(); }} className="rounded-lg px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/5"><LogOut className="mr-2 inline h-4 w-4" />Sign out</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}