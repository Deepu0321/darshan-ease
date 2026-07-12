import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "USER" | "ORGANIZER" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatar?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, _password: string, role?: Role) => Promise<AuthUser>;
  register: (data: { name: string; email: string; phone: string; password: string }) => Promise<AuthUser>;
  logout: () => void;
  updateProfile: (patch: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "darshanease.auth";

function loadStored(): { user: AuthUser; token: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function inferRole(email: string, fallback: Role = "USER"): Role {
  const e = email.toLowerCase();
  if (e.startsWith("admin")) return "ADMIN";
  if (e.startsWith("organizer") || e.startsWith("temple")) return "ORGANIZER";
  return fallback;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadStored();
    if (stored) {
      setUser(stored.user);
      setToken(stored.token);
    }
  }, []);

  const persist = (nextUser: AuthUser | null, nextToken: string | null) => {
    setUser(nextUser);
    setToken(nextToken);
    if (typeof window === "undefined") return;
    if (nextUser && nextToken) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token: nextToken }));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login: AuthContextValue["login"] = async (email, _password, role) => {
    await new Promise((r) => setTimeout(r, 400));
    const resolvedRole = role ?? inferRole(email);
    const nextUser: AuthUser = {
      id: crypto.randomUUID(),
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: resolvedRole,
    };
    persist(nextUser, `mock-token-${nextUser.id}`);
    return nextUser;
  };

  const register: AuthContextValue["register"] = async ({ name, email, phone }) => {
    await new Promise((r) => setTimeout(r, 400));
    const nextUser: AuthUser = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      role: inferRole(email),
    };
    persist(nextUser, `mock-token-${nextUser.id}`);
    return nextUser;
  };

  const logout = () => persist(null, null);

  const updateProfile: AuthContextValue["updateProfile"] = (patch) => {
    if (!user || !token) return;
    const next = { ...user, ...patch };
    persist(next, token);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}