import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, type Role } from "@/context/AuthContext";

export function useRequireRole(allowed: Role[]) {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
    } else if (!allowed.includes(user.role)) {
      navigate({ to: "/dashboard" });
    }
  }, [user, allowed, navigate]);
  return user;
}