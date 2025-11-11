"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    if (token && !user) {
      loadUser(); 
    }

    if (!token) {
      router.replace("/login");
    }
  }, [token, user, router, loadUser]);

  if (!user) return <p>Loading...</p>;

  return <>{children}</>;
}
